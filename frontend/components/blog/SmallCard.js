import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const SmallCard = ({ blog }) => {
	return (
		<div className='card'>
			<section>
				<Link href={`/blog/${blog.slug}`}>
					<a>
						<img
							className='img img-fluid'
							style={{ maxHeight: 'auto', width: '100%' }}
							src={`${API}/blog/photo/${blog.slug}`}
							alt={blog.title}
						/>
					</a>
				</Link>
			</section>

			<div className='card-body'>
				<section>
					<Link href={`/blog/${blog.slug}`}>
						<a>
							<h5 className='card-title'>{blog.title}</h5>
						</a>
					</Link>
					<p className='card-text'>
						{blog && blog.excerpt
							? renderHTML(blog.excerpt)
							: 'Pas de résumé'}
					</p>
				</section>
			</div>

			<div className='card-body'>
				Ecrit il y a {moment(blog.updatedAt).fromNow()} par{' '}
				<Link href={`/profile/${blog.postedBy.username}`}>
					<a>{blog.postedBy.username}</a>
				</Link>
			</div>
		</div>
	);
};

export default SmallCard;
