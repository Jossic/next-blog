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
		console.log('ok pour publication');
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

	const showCategories = () => {
		return (
			categories &&
			categories.map((cat, i) => (
				<li className='list-unstyled' key={i}>
					<input type='checkbox' className='mr-2' />
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
					<input type='checkbox' className='mr-2' />
					<label htmlFor='' className='form-check-label'>
						{tag.name}
					</label>
				</li>
			))
		);
	};

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
						modules={createBlog.modules}
						formats={createBlog.formats}
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
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-8'>
					{createBlogForm()}
					<hr />
					{JSON.stringify(title)}
					<hr />
					{JSON.stringify(body)}
					<hr />
					{JSON.stringify(categories)}
					<hr />
					{JSON.stringify(tags)}
				</div>
				<div className='col-md-4'>
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

createBlog.modules = {
	toolbar: [
		[
			{ header: '1' },
			{ header: '2' },
			{ header: [3, 4, 5, 6] },
			{ font: [] },
		],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['link', 'image', 'video'],
		['clean'],
		['code-block'],
	],
};

createBlog.formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'link',
	'image',
	'video',
	'code-block',
];

export default withRouter(BlogCreate);
