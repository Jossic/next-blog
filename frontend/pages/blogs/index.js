import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { listBlogsWithCategoriesAndTags } from '../../actions/blogAction';
import Card from '../../components/blog/Card';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import { withRouter } from 'next/router';

const Blogs = ({
	blogs,
	categories,
	tags,
	totalBlogs,
	blogsLimit,
	blogsSkip,
	router,
}) => {
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

	const [limit, setLimit] = useState(blogsLimit);
	const [skip, setSkip] = useState(0);
	const [size, setSize] = useState(totalBlogs);
	const [loadedBlogs, setLoadedBlogs] = useState([]);

	const loadMore = () => {
		let toSkip = skip + limit;
		listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setLoadedBlogs([...loadedBlogs, ...data.blogs]);
				setSize(data.size);
				setSkip(toSkip);
			}
		});
	};

	const loadMoreButton = () => {
		return (
			size > 0 &&
			size >= limit && (
				<button
					onClick={loadMore}
					className='btn btn-outline-primary btn-lg'>
					Voir les suivants
				</button>
			)
		);
	};

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

	const showLoaderBlogs = () => {
		return loadedBlogs.map((blog, i) => (
			<article key={i}>
				<Card blog={blog} />
			</article>
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
									Pense bête du développeur
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
					<div className='container-fluid'>{showAllBlogs()}</div>
					<div className='container-fluid'>{showLoaderBlogs()}</div>
					<div className='text-center pt-5 pb-5'>
						{loadMoreButton()}
					</div>
				</main>
			</Layout>
		</>
	);
};

Blogs.getInitialProps = () => {
	let skip = 0;
	let limit = 2;
	return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			return {
				blogs: data.blogs,
				categories: data.categories,
				tags: data.tags,
				totalBlogs: data.size,
				blogsLimit: limit,
				blogsSkip: skip,
			};
		}
	});
};

export default withRouter(Blogs);
