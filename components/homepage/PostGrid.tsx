import styles from './PostGrid.module.scss';
const PostGrid = ({ posts }) => {
	return (
		<div className={styles.container}>
			{/* {posts.map(p => (
				<h2>{p.title}</h2>
			))} */}
		</div>
	);
};

export default PostGrid;
