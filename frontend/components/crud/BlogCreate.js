import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/authAction';
import { getCategories } from '../../actions/categoryAction';
import { getTags } from '../../actions/tagAction';
import { createBlog } from '../../actions/blogAction';
const ReactQuilll = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';

const BlogCreate = ({ router }) => {
	const blogFromLS = () => {
		if (typeof window === 'undefined') {
			return false;
		}

		if (localStorage.getItem('blog')) {
			return JSON.parse(localStorage.getItem('blog'));
		} else {
			return false;
		}
	};

	const [categories, setCategories] = useState([]);
	const [tags, setTags] = useState([]);

	const [checkedCat, setCheckedCat] = useState([]);
	const [checkedTag, setCheckedTag] = useState([]);

	const [body, setBody] = useState(blogFromLS());
	const [values, setValues] = useState({
		error: '',
		sizeError: '',
		success: '',
		formData: '',
		title: '',
		hidePublishButton: false,
	});

	const {
		error,
		sizeError,
		success,
		formData,
		title,
		hidePublishButton,
	} = values;

	const token = getCookie('token');

	useEffect(() => {
		setValues({ ...values, formData: new FormData() });
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

	const publishBlog = (e) => {
		e.preventDefault();
		// console.log('ok pour publication');
		createBlog(formData, token).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					title: '',
					error: '',
					success: `Votre nouvel article "${data.title}" a bien été publié`,
				});
				setBody('');
				setCategories([]);
				setTags([]);
			}
		});
	};

	const handleChange = (name) => (e) => {
		// console.log(e.target.value);
		const value = name === 'photo' ? e.target.files[0] : e.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value, formData, error: '' });
	};

	const handleBody = (e) => {
		// console.log(e);
		setBody(e);
		formData.set('body', e);
		if (typeof window !== 'undefined') {
			localStorage.setItem('blog', JSON.stringify(e));
		}
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

	const showCategories = () => {
		return (
			categories &&
			categories.map((cat, i) => (
				<li className='list-unstyled' key={i}>
					<input
						onChange={handleToggleCat(cat._id)}
						type='checkbox'
						className='mr-2'
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
					/>
					<label htmlFor='' className='form-check-label'>
						{tag.name}
					</label>
				</li>
			))
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

	const createBlogForm = () => {
		return (
			<form onSubmit={publishBlog}>
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
						Publier
					</button>
				</div>
			</form>
		);
	};
	return (
		<div className='container-fluid pb-5'>
			<div className='row'>
				<div className='col-md-8'>
					{createBlogForm()}
					<div className='pt-3'>
						{showError()}
						{showSuccess()}
					</div>
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

export default withRouter(BlogCreate);
