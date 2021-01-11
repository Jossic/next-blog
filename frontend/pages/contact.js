import Layout from '../components/Layout';
import Link from 'next/link';
import ContactForm from '../components/form/ContactForm';

const contact = () => {
	return (
		<Layout>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-8 offset-md-2'>
						<h2>Formulaire de contact</h2>
						<hr />
						<ContactForm />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default contact;
