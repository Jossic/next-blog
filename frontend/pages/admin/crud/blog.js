import Layout from '../../../components/Layout';
import Link from 'next/link';
import Admin from '../../../components/auth/Admin';
import BlogCreate from '../../../components/crud/BlogCreate';

const Blog = () => {
	return (
		<Layout>
			<Admin>
				<div className='row'>
					<div className='col-md-12 pt-5 pb-5'>
						<h2>Créer un nouvel article</h2>
					</div>
					<div className='col-md-12'>
						<BlogCreate />
					</div>
				</div>
			</Admin>
		</Layout>
	);
};

export default Blog;
