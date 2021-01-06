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

const BlogUpdate = ({ router }) => {
	const [body, setBody] = useState('');
	const [values, setValues] = useState({
		error: '',
		success: '',
		formData: '',
		title: '',
	});

	const { error, success, formData, title } = values;

	useEffect(() => {
		setValues({ ...values, formData: new FormData() });
		initBlog();
	}, [router]);

	const initBlog = () => {
		if (router.query.slug) {
			singleBlog(router.query.slug).then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setValues({ ...values, title: data.title });
					setBody(data.body);
				}
			});
		}
	};

	const handleBody = (e) => {
		setBody(e);
		formData.set('body', e);
	};

	const editBlog = () => {
		console.log('Article modifié');
	};

	const handleChange = (name) => (e) => {
		const value = name === 'photo' ? e.target.files[0] : e.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value, formData, error: '' });
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

	return (
		<div className='container-fluid pb-5'>
			<div className='row'>
				<div className='col-md-8'>
					{updateBlogForm()}
					<div className='pt-3'>Message</div>
				</div>
				<div className='col-md-4'>
					<div>
						<div className='form-group pb-2'>
							<h5>Images selectionnées</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(BlogUpdate);
