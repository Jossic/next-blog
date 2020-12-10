import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/authAction';
import {
	create,
	getCategories,
	removeCategory,
} from '../../actions/categoryAction';

const Category = () => {
	const [values, setValues] = useState({
		name: '',
		error: false,
		success: false,
		categories: [],
		removed: false,
		reload: false,
	});

	const { name, error, success, categories, removed, reload } = values;
	const token = getCookie('token');

	useEffect(() => {
		loadCategories();
	}, [reload]);

	const loadCategories = () => {
		getCategories().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setValues({ ...values, categories: data });
			}
		});
	};

	const showCategories = () => {
		return categories.map((c, i) => {
			return (
				<button
					onDoubleClick={() => deleteConfirm(c.slug)}
					title='Double click pour supprimer'
					key={i}
					className='btn btn-outline-primary mr-1 ml-1 mt-3'>
					{c.name}
				</button>
			);
		});
	};

	const deleteConfirm = (slug) => {
		let answer = window.confirm(
			'Etes vous sûr de vouloir supprimer cette catégorie ?'
		);
		if (answer) {
			deleteCategory(slug);
		}
	};

	const deleteCategory = (slug) => {
		// console.log('delete', slug);
		removeCategory(slug, token).then((data) => {
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
					Catégorie créée !
				</div>
			);
		}
	};

	const showError = () => {
		if (error) {
			return (
				<div class='alert alert-warning' role='alert'>
					Cette catégorie existe déjà !
				</div>
			);
		}
	};

	const showRemoved = () => {
		if (removed) {
			return (
				<div class='alert alert-danger' role='alert'>
					Catégorie supprimée !
				</div>
			);
		}
	};

	const mouseMoveHandler = (e) => {
		setValues({ ...values, error: false, success: false, removed: '' });
	};

	const newCategoryFom = () => (
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
				{newCategoryFom()}
				{showCategories()}
			</div>
		</>
	);
};

export default Category;
