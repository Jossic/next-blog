import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/authAction';
import { list, removeBlog } from '../../actions/blogAction';

const BlogRead = () => {
	return (
		<>
			<p>U/D articles</p>
		</>
	);
};

export default BlogRead;
