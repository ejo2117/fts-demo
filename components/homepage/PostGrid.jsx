/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useEffect, useState } from 'react';
import styles from './PostGrid.module.scss';
// import type { Post as PostType } from '@lib/types';
import PostPreview from './PostPreview';
import Link from 'next/link';
import { v4 as uuid4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';

// type PropTypes = {
// 	posts: PostType[];
// };

const PostGrid = ({ posts }) => {
	const [active, setActive] = useState(false);
	const existingClassIndex = posts.findIndex(p => p.postSettings.isclass);
	const desiredClassIndex = 2;

	const classPost = posts.splice(existingClassIndex, 1)[0];
	posts.splice(desiredClassIndex, 0, classPost);

	const gridRef = useRef(null);
	const postRefs = posts.map(p => ({ ref: useRef() }));

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
		<motion.div ref={gridRef} className={styles.container}>
			{posts.map((p, i) => (
				<div key={uuid4()} ref={postRefs[i]} className={p.postSettings.isclass ? styles.classPreview : ''}>
					<PostPreview post={p} isClass={p.postSettings.isclass} />
				</div>
			))}
		</motion.div>
	);
};

export default PostGrid;
