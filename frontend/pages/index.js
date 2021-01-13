import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => {
	return (
		<Layout>
			<article className='overflow-hidden'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12 text-center'>
							<h1 className='display-4 font-weight-bold'>
								DEVELOPPEMENT WEB & MERN STACK
							</h1>
						</div>
					</div>
				</div>

				<div className='container'>
					<div className='row'>
						<div className='col-md-12 text-center pt-4 pb-5'>
							<p className='lead'>
								Contenu sur MongoDB, Express, React et Node
								(MERN) ainsi que Next JS et SEO
							</p>
						</div>
					</div>
				</div>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-4'>
							<div className='flip flip-horizontal'>
								<div
									className='front'
									style={{
										backgroundImage:
											'url(' +
											'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
											')',
									}}>
									<h2 className='text-shadow text-center h1'>
										React
									</h2>
								</div>
								<div className='back text-center'>
									<Link href='/categories/react'>
										<a>
											<h3 className='h1'>React Js</h3>
										</a>
									</Link>
									<p className='lead'>
										La meilleur librairie frontend JS
									</p>
								</div>
							</div>
						</div>

						<div className='col-md-4'>
							<div className='flip flip-horizontal'>
								<div
									className='front'
									style={{
										backgroundImage:
											'url(' +
											'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
											')',
									}}>
									<h2 className='text-shadow text-center h1'>
										Node
									</h2>
								</div>
								<div className='back text-center'>
									<Link href='/categories/node'>
										<a>
											<h3 className='h1'>Node Js</h3>
										</a>
									</Link>
									<p className='lead'>
										Contenu sur Node JS & Express
									</p>
								</div>
							</div>
						</div>

						<div className='col-md-4'>
							<div className='flip flip-horizontal'>
								<div
									className='front'
									style={{
										backgroundImage:
											'url(' +
											'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
											')',
									}}>
									<h2 className='text-shadow text-center h1'>
										Next
									</h2>
								</div>
								<div className='back text-center'>
									<Link href='/categories/nextjs'>
										<a>
											<h3 className='h1'>Next Js</h3>
										</a>
									</Link>
									<p className='lead'>
										Contenu sur Next JS et le SEO
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>
		</Layout>
	);
};

export default Index;
