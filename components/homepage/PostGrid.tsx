import styles from './PostGrid.module.scss';
import { Post } from '@lib/types';
import Link from 'next/link';
import { v4 as uuid4 } from 'uuid';

type PropTypes = {
	posts: Post[];
};

const PostGrid = ({ posts }: PropTypes) => {
	return (
		<div className={styles.container}>
			{posts.map((p, i) => (
				<div key={p.title} className={styles.post}>
					<Link href={`/posts/${p.slug}`}>
						<a dangerouslySetInnerHTML={{ __html: p.title }} />
					</Link>
					<div dangerouslySetInnerHTML={{ __html: p.excerpt }} />
				</div>
			))}
		</div>
	);
};

export default PostGrid;
