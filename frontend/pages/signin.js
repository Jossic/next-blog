import Layout from '../components/Layout';
import Link from 'next/link';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = () => {
	return (
		<Layout>
			<h2 className='text-center pt-4 pb-4'>Se connecter</h2>
			<p className='text-center mark'>
				Identifiants test admin: admin@mail.com 123456
			</p>
			<p className='text-center mark'>
				Identifiants test utilisateur: user@mail.com 123456
			</p>
			<div className='col-md-6 offset-md-3'>
				<SigninComponent />
			</div>
			<Link href='/'>
				<a>Accueil</a>
			</Link>
		</Layout>
	);
};

export default Signin;
