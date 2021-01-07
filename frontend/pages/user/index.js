import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link';

const UserIndex = () => {
	return (
		<Layout>
			<Private>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12 pt-5 pb-5'>
							<h2>Tableau de bord</h2>
						</div>
						<div className='col-md-4'>
							<ul className='list-group'>
								<li className='list-group-item'>
									<Link href='/user/crud/blog'>
										<a>Créer un article</a>
									</Link>
								</li>
								<li className='list-group-item'>
									<Link href='/user/crud/blogs'>
										<a>Modif/Suppr les articles</a>
									</Link>
								</li>
								<li className='list-group-item'>
									<Link href='/user/update'>
										<a>Modifier mon profil</a>
									</Link>
								</li>
							</ul>
						</div>
						<div className='col-md-8'>Right</div>
					</div>
				</div>
			</Private>
		</Layout>
	);
};

export default UserIndex;
