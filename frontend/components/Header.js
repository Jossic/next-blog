import { useState } from 'react';
import { APP_NAME } from '../config';
import NProgress from 'nprogress';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';
import Link from 'next/link';
import { isAuth, signout } from '../actions/authAction';
import Router from 'next/router';

import '../node_modules/nprogress/nprogress.css';

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color='dark' dark expand='md'>
				<Link href='/'>
					<NavLink
						style={{ cursor: 'pointer' }}
						className='font-weight-bold'>
						{APP_NAME}
					</NavLink>
				</Link>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='ml-auto' navbar>
						<>
							<NavItem>
								<Link href='/blogs'>
									<NavLink style={{ cursor: 'pointer' }}>
										Articles
									</NavLink>
								</Link>
							</NavItem>
						</>

						{!isAuth() && (
							<>
								<NavItem>
									<Link href='/signup'>
										<NavLink style={{ cursor: 'pointer' }}>
											S'enregistrer
										</NavLink>
									</Link>
								</NavItem>
								<NavItem>
									<Link href='/signin'>
										<NavLink style={{ cursor: 'pointer' }}>
											Se connecter
										</NavLink>
									</Link>
								</NavItem>
							</>
						)}

						{isAuth() && isAuth().role === 0 && (
							<NavItem>
								<Link href='/user'>
									<NavLink
										style={{
											cursor: 'pointer',
										}}>{`Espace Utilisateur`}</NavLink>
								</Link>
							</NavItem>
						)}

						{isAuth() && isAuth().role === 1 && (
							<NavItem>
								<Link href='/admin'>
									<NavLink
										style={{
											cursor: 'pointer',
										}}>{`Espace Admin`}</NavLink>
								</Link>
							</NavItem>
						)}

						{isAuth() && (
							<NavItem>
								<NavLink
									style={{ cursor: 'pointer' }}
									onClick={() =>
										signout(() => Router.replace(`/signin`))
									}>
									Se déconnecter
								</NavLink>
							</NavItem>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
