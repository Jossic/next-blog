import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { userPublicProfile } from '../../actions/userAction';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import moment from 'moment';
import ContactForm from '../../components/form/ContactForm';

const UserProfile = ({ user, blogs, query }) => {
	const head = () => (
		<Head>
			<title>
				{user.username} | {APP_NAME}
			</title>
			<meta name='description' content={`Articles de ${user.username}`} />
			<link
				rel='canonical'
				href={`${DOMAIN}/profile/${query.username}`}
			/>
			<meta
				property='og:title'
				content={`${user.username}| ${APP_NAME}`}
			/>
			<meta
				property='og:description'
				content={`Articles de ${user.username}`}
			/>
			<meta property='og:type' content='webiste' />
			<meta
				property='og:url'
				content={`${DOMAIN}/profile/${query.username}`}
			/>
			<meta property='og:site_name' content={`${APP_NAME}`} />

			<meta
				property='og:image'
				content={`${DOMAIN}/static/images/next-blog.jpg`}
			/>
			<meta
				property='og:image:secure_url'
				content={`${DOMAIN}/static/images/next-blog.jpg`}
			/>
			<meta property='og:image:type' content='image/jpg' />
			<meta property='fb:app_id' content={`${FB_APP_ID}`} />
		</Head>
	);

	const showUserBlogs = () => {
		return blogs.map((blog, i) => {
			return (
				<div className='mt-4 mb-4' key={i}>
					<Link href={`/blogs/${blog.slug}`}>
						<a className='lead'>{blog.title}</a>
					</Link>
				</div>
			);
		});
	};

	return (
		<>
			{head()}
			<Layout>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='card'>
								<div className='card-body'>
									<div className='row'>
										<div className='col-md-8'>
											<h5>{user.name}</h5>

											<p className='text-muted'>
												Depuis{' '}
												{moment(
													user.createdAt
												).fromNow()}
											</p>
										</div>
										<div className='col-md-4'>
											<img
												src={`${API}/user/photo/${user.username}`}
												className='img img-fluid mb-3 img-thumbnail'
												style={{
													maxHeight: 'auto',
													maxWidth: '100%',
												}}
												alt={`profil ${user.username}`}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<br />
				<div className='container pb-5'>
					<div className='row'>
						<div className='col-md-6'>
							<div className='card'>
								<div className='card-body'>
									<h5 className='card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light'>
										Les articles de {user.name}
									</h5>
									{showUserBlogs()}
								</div>
							</div>
						</div>
						<div className='col-md-6'>
							<div className='card'>
								<div className='card-body'>
									<h5 className='card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light'>
										Contacter {user.name}
									</h5>
									<br />
									<ContactForm authorEmail={user.email} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

UserProfile.getInitialProps = ({ query }) => {
	// console.log(query);
	return userPublicProfile(query.username).then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			return { user: data.user, blogs: data.blogs, query };
		}
	});
};

export default UserProfile;
