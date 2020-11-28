import Layout from '../components/Layout';
import Link from 'next/link';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = () => {
	return (
		<Layout>
			<h2 className='text-center pt-4 pb-4'>Se connecter</h2>
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
