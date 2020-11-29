import { useEffect, useState } from 'react';
import { authenticate, isAuth, signin } from '../../actions/authAction';
import Router from 'next/router';

const SigninComponent = () => {
	const [values, setvalues] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
		message: '',
		showForm: true,
	});

	const { email, password, error, loading, message, showForm } = values;

	useEffect(() => {
		isAuth() && Router.push('/');
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		setvalues({ ...values, loading: true, error: false });
		const user = { email, password };

		signin(user).then((data) => {
			if (data.error) {
				setvalues({ ...values, error: data.error, loading: false });
			} else {
				authenticate(data, () => {
					Router.push('/');
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

	const signinForm = () => {
		return (
			<form onSubmit={handleSubmit}>
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
					<button className='btn btn-primary'>Se connecter</button>
				</div>
			</form>
		);
	};

	return (
		<>
			{showError()}
			{showLoading()}
			{showMessage()}
			{showForm && signinForm()}
		</>
	);
};

export default SigninComponent;
