import styles from './PostGrid.module.scss';
import type { Post as PostType } from '@lib/types';
import PostPreview from './PostPreview';
import Link from 'next/link';
import { v4 as uuid4 } from 'uuid';

type PropTypes = {
	posts: PostType[];
};

const PostGrid = ({ posts }: PropTypes) => {
	return (
		<div className={styles.container}>
			{posts.map((p, i) => (
				<PostPreview key={p.title} post={p} />
			))}
		</div>
	);
};

export default PostGrid;
