import Layout from '../components/Layout';
import { withRouter } from 'next/router';
import Link from 'next/link';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = ({ router }) => {
	const showRedirectMessage = () => {
		if (router.query.message) {
			return (
				<div className='alert alert-danger'>{router.query.message}</div>
			);
		} else {
			return;
		}
	};
	return (
		<Layout>
			<div className='container-fluid'>
				<h2 className='text-center pt-4 pb-4'>Se connecter</h2>
				<p className='text-center mark'>
					Identifiants test admin: admin@mail.com 123456
				</p>
				<p className='text-center mark'>
					Identifiants test utilisateur: user@mail.com 123456
				</p>
				<div className='row'>
					<div className='col-md-6 offset-md-3'>
						{showRedirectMessage()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 offset-md-3'>
						<SigninComponent />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default withRouter(Signin);
