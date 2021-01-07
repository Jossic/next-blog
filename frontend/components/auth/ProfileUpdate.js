import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/authAction';
import { getProfile, update } from '../../actions/userAction';
import { API } from '../../config';

const ProfileUpdate = () => {
	const [values, setValues] = useState({
		username: '',
		username_for_photo: '',
		name: '',
		email: '',
		about: '',
		password: '',
		error: false,
		success: false,
		loading: false,
		photo: '',
		userData: process.browser && new FormData(),
	});

	const token = getCookie('token');
	const {
		username,
		username_for_photo,
		name,
		email,
		about,
		password,
		error,
		success,
		loading,
		photo,
		userData,
	} = values;

	const init = () => {
		getProfile(token).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					username: data.username,
					username_for_photo: data.username,
					name: data.name,
					email: data.email,
					about: data.about,
				});
			}
		});
	};

	useEffect(() => {
		init();
		setValues({ ...values, userData: new FormData() });
	}, []);

	const handleChange = (name) => (e) => {
		const value = name === 'photo' ? e.target.files[0] : e.target.value;
		let userFormData = new FormData();
		userData.set(name, value);

		setValues({
			...values,
			[name]: value,
			userData,
			error: false,
			success: false,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setValues({ ...values, loading: true });
		update(token, userData).then((data) => {
			if (data.error) {
				setValues({
					...values,
					error: data.error,
					loading: false,
				});
			} else {
				updateUser(data, (params) => {
					setValues({
						...values,
						username: data.username,
						name: data.name,
						email: data.email,
						about: data.about,
						password: '',
						success: true,
						loading: false,
					});
				});
			}
		});
	};

	const ProfileUpdateForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
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
			<div className='form-group'>
				<label className='text-muted'>Nom d'utilisateur</label>
				<input
					onChange={handleChange('username')}
					type='text'
					value={username}
					className='form-control'
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Nom</label>
				<input
					onChange={handleChange('name')}
					type='text'
					value={name}
					className='form-control'
				/>
			</div>
			{/* <div className='form-group'>
				<label className='text-muted'>Email</label>
				<input
					onChange={handleChange('email')}
					type='email'
					value={email}
					className='form-control'
				/>
			</div> */}
			<div className='form-group'>
				<label className='text-muted'>A propos de vous</label>
				<textarea
					onChange={handleChange('about')}
					type='text'
					value={about}
					className='form-control'
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Mot de passe</label>
				<input
					onChange={handleChange('password')}
					type='password'
					value={password}
					className='form-control'
				/>
			</div>
			<div>
				<button type='submit' className='btn btn-primary'>
					Valider
				</button>
			</div>
		</form>
	);

	const showError = () => (
		<div
			className='alert alert-danger'
			style={{ display: error ? '' : 'none' }}>
			{' '}
			Tous les champs sont requis
		</div>
	);

	const showSuccess = () => (
		<div
			className='alert alert-success'
			style={{ display: success ? '' : 'none' }}>
			{' '}
			Profil correctement mis à jour
		</div>
	);

	const showLoading = () => (
		<div
			className='alert alert-info'
			style={{ display: loading ? '' : 'none' }}>
			{' '}
			Chargement en cours
		</div>
	);

	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col-md-4'>
						<img
							src={`${API}/user/photo/${username_for_photo}`}
							className='img img-fluid mb-3 img-thumbnail'
							style={{ maxHeight: 'auto', maxWidth: '100%' }}
							alt={`profil ${username}`}
						/>
					</div>
					<div className='col-md-8 mb-5'>
						{showSuccess()}
						{showError()}
						{showLoading()}
						{ProfileUpdateForm()}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileUpdate;
