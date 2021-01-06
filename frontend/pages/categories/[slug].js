import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { singleCategory } from '../../actions/categoryAction';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card';

const Category = ({ category, blogs, query }) => {
	const head = () => (
		<Head>
			<title>
				{APP_NAME} | {category.name}{' '}
			</title>
			<meta
				name='description'
				content={`Articles liés à la catégorie ${category.name}`}
			/>
			<link rel='canonical' href={`${DOMAIN}/categories/${query.slug}`} />
			<meta
				property='og:title'
				content={`${category.name} | ${APP_NAME}`}
			/>
			<meta
				property='og:description'
				content={`Articles liés à la catégorie ${category.name}`}
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
			{head()}
			<Layout>
				<main>
					<div className='container-fluid text-center'>
						<header>
							<div className='col-md-12 pt-3'>
								<h1 className='display-4 font-weight-bold'>
									Articles liés à la catégorie {category.name}
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

Category.getInitialProps = ({ query }) => {
	return singleCategory(query.slug).then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			return {
				category: data.category,
				blogs: data.blogs,
				query,
			};
		}
	});
};

export default Category;
