import PostGrid from './PostGrid';
import styles from './CategoryGrid.module.scss';

const CategoryGrid = ({ categories }) => {
	return categories.map(c => {
		return c.posts.length ? (
			<>
				<h1 key={c.name} className={styles.title}>
					{c.name}
				</h1>
				<PostGrid posts={c.posts} />
			</>
		) : null;
	});
};

export default CategoryGrid;
