import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';
import { signup } from '../../../../actions/authAction';
import { Spinner } from 'reactstrap';

const ActivateAccount = ({ router }) => {
	const [values, setValues] = useState({
		name: '',
		token: '',
		error: '',
		loading: false,
		success: false,
		showButton: true,
	});

	const { name, token, error, loading, success, showButton } = values;

	useEffect(() => {
		let token = router.query.id;
		if (token) {
			const { name } = jwt.decode(token);
			setValues({ ...values, name, token });
		}
	}, [router]);

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true, error: false });
		signup({ token }).then((data) => {
			if (data.error) {
				setValues({
					...values,
					error: data.error,
					loading: false,
					showButton: false,
				});
			} else {
				setValues({
					...values,
					success: true,
					loading: false,
					showButton: false,
				});
			}
		});
	};

	const showLoadding = () => loading && <Spinner />;

	return (
		<Layout>
			<div className='container'>
				<h3 className='pb-5'>
					Coucou {name}, pret à activer ton compte ?
				</h3>
				{showLoadding()}
				{error && error}
				{success && (
					<div className='alert alert-success'>
						Votre compte a bien été activé
					</div>
				)}
				{showButton && (
					<button
						onClick={clickSubmit}
						className='btn btn-outline-primary'>
						Activer mon compte
					</button>
				)}
			</div>
		</Layout>
	);
};

export default withRouter(ActivateAccount);
