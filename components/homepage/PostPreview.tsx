import { Post } from '@lib/types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PostGrid.module.scss';
import Date from '@components/posts/date';

type PropTypes = {
	post: Post;
	isClass: Boolean;
};

const PostPreview = ({ post, isClass }: PropTypes) => {
	const { title, slug, date, featuredImage, postSettings, excerpt } = post;

	return (
		<Link href={`/posts/${slug}`}>
			<a>
				<div key={title} className={styles.post}>
					<div className={styles.imageContainer}>
						<Image
							layout='fill'
							objectFit='cover'
							src={postSettings?.previewImage?.sourceUrl}
							alt={`Featured Image for ${title}`}
						/>
						{excerpt && <div className={styles.quote} dangerouslySetInnerHTML={{ __html: excerpt }} />}
						{/* {isClass && <div className={styles.badge}>CLASS</div>} */}
					</div>

					<h2>{title}</h2>
					<Date dateString={date} />
				</div>
			</a>
		</Link>
	);
};

export default PostPreview;
