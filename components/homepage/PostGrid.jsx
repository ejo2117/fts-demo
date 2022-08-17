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
	const bigPostList = [...posts, ...posts, ...posts, ...posts, ...posts, ...posts, ...posts];

	const gridRef = useRef(null);
	const postRefs = bigPostList.map(p => ({ ref: useRef() }));

	useEffect(() => {
		const observer = new IntersectionObserver(handleIntersection);
		console.log(observer, postRefs);

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
		console.log(entries);
		for (const entry of entries) {
			entry.target.style.setProperty('--shown', entry.isIntersecting ? 1 : 0);
			console.log(entry.target.style);
		}
	};

	return (
		<div ref={gridRef} className={styles.container}>
			{bigPostList.map((p, i) => (
				<div key={uuid4()} ref={postRefs[i]}>
					<PostPreview post={p} />
				</div>
			))}
		</div>
	);
};

export default PostGrid;
