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
	const [body, setBody] = useState({});
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

	const publishBlog = (e) => {
		e.preventDefault();
		console.log('ok pour publication');
	};

	const handleChange = (name) => (e) => {
		console.log(e.target.value);
	};

	const handleBody = (e) => {
		console.log(e);
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
	return <div>{createBlogForm()}</div>;
};

export default withRouter(BlogCreate);
