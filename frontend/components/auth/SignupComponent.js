import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import { isAuth, signup, preSignup } from '../../actions/authAction';

const SignupComponent = () => {
	const [values, setvalues] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		loading: false,
		message: '',
		showForm: true,
	});

	const { name, email, password, error, loading, message, showForm } = values;

	useEffect(() => {
		isAuth() && Router.push('/');
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		setvalues({ ...values, loading: true, error: false });
		const user = { name, email, password };

		preSignup(user).then((data) => {
			if (data.error) {
				setvalues({ ...values, error: data.error, loading: false });
			} else {
				setvalues({
					...values,
					name: '',
					email: '',
					password: '',
					error: '',
					loading: false,
					message: data.message,
					showForm: false,
				});
			}
		});
	};

	const handleChange = (val) => (e) => {
		setvalues({ ...values, error: false, [val]: e.target.value });
	};

	const showLoading = () =>
		loading ? <div className='alert alert-info'>Loading...</div> : '';
	const showError = () =>
		error ? <div className='alert alert-danger'>{error}</div> : '';
	const showMessage = () =>
		message ? <div className='alert alert-info'>{message}</div> : '';

	const signupForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						value={name}
						onChange={handleChange('name')}
						type='text'
						className='form-control'
						placeholder='Entrez votre nom'
					/>
				</div>

				<div className='form-group'>
					<input
						value={email}
						onChange={handleChange('email')}
						type='email'
						className='form-control'
						placeholder='Entrez votre email'
					/>
				</div>

				<div className='form-group'>
					<input
						value={password}
						onChange={handleChange('password')}
						type='password'
						className='form-control'
						placeholder='Entrez votre mot de passe'
					/>
				</div>

				<div>
					<button className='btn btn-primary'>Créer un compte</button>
				</div>
			</form>
		);
	};

	return (
		<>
			{showError()}
			{showLoading()}
			{showMessage()}
			{showForm && signupForm()}
		</>
	);
};

export default SignupComponent;
