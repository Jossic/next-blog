import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/authAction';
import { create, getTags, removeTag } from '../../actions/tagAction';

const Tag = () => {
	const [values, setValues] = useState({
		name: '',
		error: false,
		success: false,
		tags: [],
		removed: false,
		reload: false,
	});

	const { name, error, success, tags, removed, reload } = values;
	const token = getCookie('token');

	useEffect(() => {
		loadTags();
	}, [reload]);

	const loadTags = () => {
		getTags().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setValues({ ...values, tags: data });
			}
		});
	};

	const showTags = () => {
		return tags.map((t, i) => {
			return (
				<button
					onDoubleClick={() => deleteConfirm(t.slug)}
					title='Double click pour supprimer'
					key={i}
					className='btn btn-outline-primary mr-1 ml-1 mt-3'>
					{t.name}
				</button>
			);
		});
	};

	const deleteConfirm = (slug) => {
		let answer = window.confirm(
			'Etes vous sûr de vouloir supprimer ce tag ?'
		);
		if (answer) {
			deleteTag(slug);
		}
	};

	const deleteTag = (slug) => {
		removeTag(slug, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setValues({
					...values,
					error: false,
					success: false,
					name: '',
					removed: !removed,
					reload: !reload,
				});
			}
		});
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		// console.log('create Tag', name);
		create({ name }, token).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, success: false });
			} else {
				setValues({
					...values,
					error: false,
					success: true,
					name: '',
					removed: false,
					reload: !reload,
				});
			}
		});
	};

	const handleChange = (e) => {
		setValues({
			...values,
			name: e.target.value,
			error: false,
			success: false,
			removed: '',
		});
	};

	const showSuccess = () => {
		if (success) {
			return (
				<div class='alert alert-success' role='alert'>
					Tag créé !
				</div>
			);
		}
	};

	const showError = () => {
		if (error) {
			return (
				<div class='alert alert-warning' role='alert'>
					Ce tag existe déjà !
				</div>
			);
		}
	};

	const showRemoved = () => {
		if (removed) {
			return (
				<div class='alert alert-danger' role='alert'>
					Tag supprimé !
				</div>
			);
		}
	};

	const mouseMoveHandler = (e) => {
		setValues({ ...values, error: false, success: false, removed: '' });
	};

	const newTagFom = () => (
		<form onSubmit={clickSubmit}>
			<div className='form-group'>
				<label className='text-muted'>Nom</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange}
					value={name}
					required
				/>
			</div>
			<div>
				<button type='submit' className='btn btn-primary'>
					Créer
				</button>
			</div>
		</form>
	);

	return (
		<>
			{showSuccess()}
			{showError()}
			{showRemoved()}
			<div onMouseMove={mouseMoveHandler}>
				{newTagFom()}
				{showTags()}
			</div>
		</>
	);
};

export default Tag;
