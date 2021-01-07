import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/authAction';
import { getProfile, update } from '../../actions/userAction';

const ProfileUpdate = () => {
	const [values, setValues] = useState({
		username: '',
		name: '',
		email: '',
		password: '',
		error: false,
		success: false,
		loading: false,
		photo: '',
		userData: '',
	});

	const token = getCookie('token');
	const {
		username,
		name,
		email,
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
					name: data.name,
					email: data.email,
					about: data.about,
				});
			}
		});
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col-md-4'>Image</div>
					<div className='col-md-8'>
						Formulaire
						{JSON.stringify({ username, email, name })}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileUpdate;
