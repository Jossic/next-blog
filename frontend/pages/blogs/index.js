import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { listBlogsWithCategoriesAndTags } from '../../actions/blogAction';
import Card from '../../components/blog/Card';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import { withRouter } from 'next/router';

const Blogs = ({ blogs, categories, tags, size, router }) => {
	const head = () => (
		<Head>
			<title> {APP_NAME} | Le blog </title>
			<meta
				name='description'
				content='Tout le contenu important à conserver et à consulter régulièrement'
			/>
			<link rel='canonical' href={`${DOMAIN}${router.pathname}`} />
			<meta
				property='og:title'
				content={`Les derniers articles parus | ${APP_NAME}`}
			/>
			<meta
				property='og:description'
				content='Tout le contenu important à conserver et à consulter régulièrement'
			/>
			<meta property='og:type' content='website' />
			<meta property='og:url' content={`${DOMAIN}${router.pathname}`} />
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

	const showAllBlogs = () => {
		return blogs.map((blog, i) => (
			<article key={i}>
				<Card blog={blog} />
				<hr />
			</article>
		));
	};

	const showAllCategories = () => {
		return categories.map((c, i) => (
			<Link href={`/categories/${c.slug}`} key={i}>
				<a className='btn btn-primary mr-1 ml-1 mt-3'>{c.name}</a>
			</Link>
		));
	};

	const showAllTags = () => {
		return tags.map((t, i) => (
			<Link href={`/tags/${t.slug}`} key={i}>
				<a className='btn btn-outline-primary mr-1 ml-1 mt-3'>
					{t.name}
				</a>
			</Link>
		));
	};

	return (
		<>
			{head()}
			<Layout>
				<main>
					<div className='container-fluid'>
						<header>
							<div className='col-md-12 pt-3'>
								<h1 className='display-4 font-weight-bold text-center'>
									Devs à concerver
								</h1>
							</div>
							<section>
								<div className='pb-5 text-center'>
									{showAllCategories()}
									<br />
									{showAllTags()}
								</div>
							</section>
						</header>
					</div>
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-md-12'>{showAllBlogs()}</div>
						</div>
					</div>
				</main>
			</Layout>
		</>
	);
};

Blogs.getInitialProps = () => {
	return listBlogsWithCategoriesAndTags().then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			return {
				blogs: data.blogs,
				categories: data.categories,
				tags: data.tags,
				size: data.size,
			};
		}
	});
};

export default withRouter(Blogs);
