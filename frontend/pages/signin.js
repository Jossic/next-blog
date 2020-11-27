import Layout from '../components/Layout';
import Link from 'next/link';
const Signin = () => {
	return (
		<Layout>
			<h2>Signin</h2>
			<Link href='/'>
				<a>Accueil</a>
			</Link>
		</Layout>
	);
};

export default Signin;
