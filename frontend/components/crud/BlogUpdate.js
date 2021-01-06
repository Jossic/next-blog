import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/authAction';
import { getCategories } from '../../actions/categoryAction';
import { getTags } from '../../actions/tagAction';
import { singleBlog, updateBlog } from '../../actions/blogAction';
const ReactQuilll = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import { API } from '../../config';

const BlogUpdate = ({ router }) => {
	const [body, setBody] = useState('');

	const [categories, setCategories] = useState([]);
	const [tags, setTags] = useState([]);

	const [checkedCat, setCheckedCat] = useState([]);
	const [checkedTag, setCheckedTag] = useState([]);

	const [values, setValues] = useState({
		error: '',
		success: '',
		formData: '',
		title: '',
	});

	const token = getCookie('token');

	const { error, success, formData, title } = values;

	useEffect(() => {
		setValues({ ...values, formData: new FormData() });
		initBlog();
		initCategories();
		initTags();
	}, [router]);

	const initCategories = () => {
		getCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setCategories(data);
			}
		});
	};
	const initTags = () => {
		getTags().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setTags(data);
			}
		});
	};

	const initBlog = () => {
		if (router.query.slug) {
			singleBlog(router.query.slug).then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setValues({ ...values, title: data.title });
					setBody(data.body);
					setCategoriesArray(data.categories);
					setTagsArray(data.tags);
				}
			});
		}
	};

	const setCategoriesArray = (blogCategories) => {
		let cat = [];
		blogCategories.map((c, i) => {
			cat.push(c._id);
		});
		setCheckedCat(cat);
	};

	const setTagsArray = (blogTags) => {
		let ta = [];
		blogTags.map((t, i) => {
			ta.push(t._id);
		});
		setCheckedTag(ta);
	};

	const handleChange = (name) => (e) => {
		// console.log(e.target.value);
		const value = name === 'photo' ? e.target.files[0] : e.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value, formData, error: '' });
	};

	const handleBody = (e) => {
		setBody(e);
		formData.set('body', e);
	};

	const editBlog = (e) => {
		e.preventDefault();
		formData.append('title', values.title);
		formData.append('body', body);
		updateBlog(formData, token, router.query.slug).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					title: '',
					success: `L'article "${data.title}" a bien été modifié`,
				});
				if (isAuth() && isAuth().role === 1) {
					// Router.replace(`/admin/crud/${router.query.slug}`);
					Router.replace(`/admin`);
				} else if (isAuth() && isAuth().role === 0) {
					// Router.replace(`/user/crud/${router.query.slug}`);
					Router.replace(`/user`);
				}
			}
		});
	};

	const handleToggleCat = (cat) => () => {
		setValues({ ...values, error: '' });
		const clickedCategory = checkedCat.indexOf(cat);
		const all = [...checkedCat];

		if (clickedCategory === -1) {
			all.push(cat);
		} else {
			all.splice(clickedCategory, 1);
		}
		console.log(all);
		setCheckedCat(all);
		formData.set('categories', all);
	};

	const handleToggleTag = (tag) => () => {
		setValues({ ...values, error: '' });
		const clickedTag = checkedTag.indexOf(tag);
		const all = [...checkedTag];

		if (clickedTag === -1) {
			all.push(tag);
		} else {
			all.splice(clickedTag, 1);
		}
		console.log(all);
		setCheckedTag(all);
		formData.set('tags', all);
	};

	const findOutCategory = (cat) => {
		const result = checkedCat.indexOf(cat);
		if (result !== -1) {
			return true;
		} else {
			return false;
		}
	};

	const findOutTags = (tag) => {
		const result = checkedTag.indexOf(tag);
		if (result !== -1) {
			return true;
		} else {
			return false;
		}
	};

	const showCategories = () => {
		return (
			categories &&
			categories.map((cat, i) => (
				<li className='list-unstyled' key={i}>
					<input
						onChange={handleToggleCat(cat._id)}
						type='checkbox'
						className='mr-2'
						checked={findOutCategory(cat._id)}
					/>
					<label htmlFor='' className='form-check-label'>
						{cat.name}
					</label>
				</li>
			))
		);
	};

	const showTags = () => {
		return (
			tags &&
			tags.map((tag, i) => (
				<li className='list-unstyled' key={i}>
					<input
						onChange={handleToggleTag(tag._id)}
						type='checkbox'
						className='mr-2'
						checked={findOutTags(tag._id)}
					/>
					<label htmlFor='' className='form-check-label'>
						{tag.name}
					</label>
				</li>
			))
		);
	};

	const updateBlogForm = () => {
		return (
			<form onSubmit={editBlog}>
				<div className='form-group'>
					<label htmlFor='' className='text-muted'>
						Titre
					</label>
					<input
						type='text'
						className='form-control'
						value={title}
						onChange={handleChange('title')}
					/>
				</div>
				<div className='form-group'>
					<ReactQuilll
						modules={QuillModules}
						formats={QuillFormats}
						value={body}
						placeholder='Votre article'
						onChange={handleBody}
					/>
				</div>

				<div>
					<button type='submit' className='btn btn-primary'>
						Valider
					</button>
				</div>
			</form>
		);
	};

	const showError = () => (
		<div
			className='alert alert-danger'
			style={{ display: error ? '' : 'none' }}>
			{' '}
			{error}
		</div>
	);

	const showSuccess = () => (
		<div
			className='alert alert-success'
			style={{ display: success ? '' : 'none' }}>
			{' '}
			{success}
		</div>
	);

	return (
		<div className='container-fluid pb-5'>
			<div className='row'>
				<div className='col-md-8'>
					{updateBlogForm()}
					<div className='pt-3'>
						{' '}
						{showError()}
						{showSuccess()}
					</div>
					{body && (
						<img
							src={`${API}/blog/photo/${router.query.slug}`}
							alt={title}
							style={{ width: '100%' }}
						/>
					)}
				</div>
				<div className='col-md-4'>
					<div>
						<div className='form-group pb-2'>
							<h5>Images selectionnées</h5>
							<hr />

							<small className='text-muted'>
								Taille max : 1Mo
							</small>
							<br />
							<label className='btn btn-outline-info'>
								Uploader l'image
								<input
									onChange={handleChange('photo')}
									type='file'
									accept='image/*'
									hidden
								/>
							</label>
						</div>
					</div>
					<h5>Catégories</h5>
					<ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
						{showCategories()}
					</ul>
					<hr />
					<h5>Tags</h5>
					<ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
						{showTags()}
					</ul>
					<hr />
				</div>
			</div>
		</div>
	);
};

export default withRouter(BlogUpdate);
