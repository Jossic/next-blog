import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import {
	loginWithGoogle,
	authenticate,
	isAuth,
} from '../../actions/authAction';
import { GOOGLE_CLIENT_ID } from '../../config';
import GoogleLogin from 'react-google-login';

const LoginGoogle = () => {
	const responseGoogle = (response) => {
		const tokenId = response.tokenId;
		const user = { tokenId };

		loginWithGoogle(user).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				authenticate(data, () => {
					if (isAuth() && isAuth().role === 1) {
						Router.push('/admin');
					} else {
						Router.push('/user');
					}
				});
			}
		});
	};

	return (
		<div className='login-with-google-div pb-4 text-center'>
			<GoogleLogin
				clientId={GOOGLE_CLIENT_ID}
				buttonText='Se connecter avec Google'
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				theme='dark'
			/>
		</div>
	);
};

export default LoginGoogle;
