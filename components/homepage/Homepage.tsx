import { Post, Category } from '@lib/types';
import { flattenGraphQLResponse } from '@utils/helpers';
import { FC } from 'react';
import CategoryGrid from './CategoryGrid';
import Title from './Title';

interface PropTypes {
	posts: Post[];
	categories: Category[];
}

const Homepage: FC<PropTypes> = ({ posts, categories }) => {
	const flattenedCategories = categories.reduce((prev, current, index) => {
		if (prev) {
			prev.push({
				name: current.node.name,
				posts: posts.filter(p => current.node.posts.edges.some(({ node }) => node.title === p.title)),
			});
			return prev;
		}
		prev = [];
		return prev;
	}, []);

	return (
		<>
			<Title />
			<CategoryGrid categories={flattenedCategories} />
		</>
	);
};

export default Homepage;
