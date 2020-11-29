import { useState } from 'react';
import { APP_NAME } from '../config';
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

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color='light' light expand='md'>
				<Link href='/'>
					<NavLink
						style={{ cursor: 'pointer' }}
						className='font-weight-bold'>
						{APP_NAME}
					</NavLink>
				</Link>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='mr-auto' navbar>
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
