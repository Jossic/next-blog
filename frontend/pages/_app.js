// pages/_app.js
import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				<link rel='stylesheet' href='/static/css/styles.css' />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
