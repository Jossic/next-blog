import Layout from '../../../components/Layout';
import Link from 'next/link';
import Private from '../../../components/auth/Private';
import BlogRead from '../../../components/crud/BlogRead';
import { isAuth } from '../../../actions/authAction';

const Blogs = () => {
	const username = isAuth() && isAuth().username;
	return (
		<Layout>
			<Private>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12 pt-5 pb-5'>
							<h2>Gestion des articles</h2>
						</div>
						<div className='col-md-12'>
							<BlogRead username={username} />
						</div>
					</div>
				</div>
			</Private>
		</Layout>
	);
};

export default Blogs;
