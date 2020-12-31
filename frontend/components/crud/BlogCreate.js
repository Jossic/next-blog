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

const BlogCreate = ({ router }) => {
	return (
		<div>
			<h2>Formulaire</h2>
			{JSON.stringify(router)}
		</div>
	);
};

export default withRouter(BlogCreate);
