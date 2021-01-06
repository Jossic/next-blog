import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/authAction';
import { getCategories } from '../../actions/categoryAction';
import { getTags } from '../../actions/tagAction';
import { createBlog } from '../../actions/blogAction';
const ReactQuilll = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';

const BlogUpdate = () => {
	return (
		<div className='container-fluid pb-5'>
			<div className='row'>
				<div className='col-md-8'>
					<p>Modifier cet article</p>
					<div className='pt-3'>Message</div>
				</div>
				<div className='col-md-4'>
					<div>
						<div className='form-group pb-2'>
							<h5>Images selectionnées</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogUpdate;
