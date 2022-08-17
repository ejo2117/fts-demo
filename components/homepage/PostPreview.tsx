import { Post } from '@lib/types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PostGrid.module.scss';
import Date from '@components/posts/Date';

type PropTypes = {
	post: Post;
};

const PostPreview = ({ post }: PropTypes) => {
	const { title, slug, date, featuredImage, excerpt } = post;

	return (
		<Link href={`/posts/${slug}`}>
			<a>
				<div key={title} className={styles.post}>
					<div className={styles.imageContainer}>
						<Image
							layout='fill'
							objectFit='cover'
							src={featuredImage.sourceUrl}
							alt={`Featured Image for ${title}`}
						/>
						<div className={styles.quote} dangerouslySetInnerHTML={{ __html: excerpt }} />
						<div className={styles.badge}>CLASS</div>
					</div>

					<h2>{title}</h2>
					<Date dateString={date} />
				</div>
			</a>
		</Link>
	);
};

export default PostPreview;
