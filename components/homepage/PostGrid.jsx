/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useEffect } from 'react';
import styles from './PostGrid.module.scss';
// import type { Post as PostType } from '@lib/types';
import PostPreview from './PostPreview';
import Link from 'next/link';
import { v4 as uuid4 } from 'uuid';

// type PropTypes = {
// 	posts: PostType[];
// };

const PostGrid = ({ posts }) => {
	// TODO - remove this step for launch and just pull straight from WP instead
	// const bigPostList = [...posts, ...posts, ...posts, ...posts, ...posts, ...posts, ...posts];

	const assignedClasses = posts.map((p, i) => ({ post: p, isClass: i && !((i + 1) % 3) }));

	const gridRef = useRef(null);
	const postRefs = assignedClasses.map(p => ({ ref: useRef() }));

	useEffect(() => {
		const observer = new IntersectionObserver(handleIntersection);

		postRefs.forEach(({ ref, current }) => {
			current && observer.observe(current);
		});

		return () => {
			postRefs.forEach(({ current }) => {
				if (current) observer.unobserve(current);
			});
			observer.disconnect();
		};
	}, []);

	const handleIntersection = (entries, observer) => {
		for (const entry of entries) {
			entry.target.style.setProperty('--shown', entry.isIntersecting ? 1 : 0);
			entry.isIntersecting && observer.unobserve(entry.target);
		}
	};

	return (
		<div ref={gridRef} className={styles.container}>
			{assignedClasses.map((p, i) => (
				<div key={uuid4()} ref={postRefs[i]} className={p.isClass ? styles.classPreview : ''}>
					<PostPreview post={p.post} isClass={p.isClass} />
				</div>
			))}
		</div>
	);
};

export default PostGrid;
