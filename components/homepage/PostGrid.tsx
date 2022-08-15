import styles from './PostGrid.module.scss';
import type { Post as PostType } from '@lib/types';
import Post from './Post';
import Link from 'next/link';
import { v4 as uuid4 } from 'uuid';

type PropTypes = {
	posts: PostType[];
};

const PostGrid = ({ posts }: PropTypes) => {
	return (
		<div className={styles.container}>
			{posts.map((p, i) => (
				<Post key={p.title} post={p} />
			))}
		</div>
	);
};

export default PostGrid;
