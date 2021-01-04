import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { listBlogsWithCategoriesAndTags } from '../../actions/blogAction';
import { API } from '../../config';

const Blogs = () => {
	return (
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
							<p>Liste des catégories et tags</p>
						</section>
					</header>
				</div>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12'>Liste des articles</div>
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default Blogs;
