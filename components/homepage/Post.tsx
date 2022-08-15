import { Post } from '@lib/types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PostGrid.module.scss';

type PropTypes = {
	post: Post;
};

const Post = ({ post }: PropTypes) => {
	const { title, slug, date, featuredImage } = post;

	return (
		<Link href={`/posts/${slug}`}>
			<a>
				<div key={title} className={styles.post}>
					<Image width={'100%'} height={200} src={featuredImage.sourceUrl} alt={`Featured Image for ${title}`} />
					<h2>{title}</h2>
					<div dangerouslySetInnerHTML={{ __html: date.toString() }} />
				</div>
			</a>
		</Link>
	);
};

export default Post;
