import Layout from '../components/Layout';
import Link from 'next/link';
const Signup = () => {
	return (
		<Layout>
			<h2>Signup</h2>
			<Link href='/'>
				<a>Accueil</a>
			</Link>
		</Layout>
	);
};

export default Signup;
