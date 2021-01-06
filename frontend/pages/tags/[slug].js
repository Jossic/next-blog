import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { singleTag } from '../../actions/tagAction';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card';

const Tag = ({ tag, blogs }) => {
	const head = () => (
		<Head>
			<title>
				{APP_NAME} | {tag.name}{' '}
			</title>
			<meta
				name='description'
				content={`Articles liés à la catégorie ${tag.name}`}
			/>
			<link rel='canonical' href={`${DOMAIN}/categories/${query.slug}`} />
			<meta property='og:title' content={`${tag.name} | ${APP_NAME}`} />
			<meta
				property='og:description'
				content={`Articles liés à la catégorie ${tag.name}`}
			/>
			<meta property='og:type' content='website' />
			<meta
				property='og:url'
				content={`${DOMAIN}/categories/${query.slug}`}
			/>
			<meta property='og:site_name' content={`${APP_NAME}`} />

			<meta property='og:site_name' content={APP_NAME} />

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
	return (
		<>
			<Layout>
				<main>
					<div className='container-fluid text-center'>
						<header>
							<div className='col-md-12 pt-3'>
								<h1 className='display-4 font-weight-bold'>
									Tags liés à {tag.name}
								</h1>
								{blogs.map((blog, i) => (
									<div>
										<Card key={i} blog={blog} />
										<hr />
									</div>
								))}
							</div>
						</header>
					</div>
				</main>
			</Layout>
		</>
	);
};

Tag.getInitialProps = ({ query }) => {
	return singleTag(query.slug).then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			return {
				tag: data.tag,
				blogs: data.blogs,
				query,
			};
		}
	});
};

export default Tag;
