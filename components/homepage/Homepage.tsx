import { Post, Category } from '@lib/types';
import { FC } from 'react';
import PostGrid from './PostGrid';
import Title from './Title';

interface PropTypes {
	posts: Post[];
	categories: Category[];
}

const Homepage: FC<PropTypes> = ({ posts }) => {
	return (
		<>
			<Title />
			<PostGrid posts={posts} />;
		</>
	);
};

export default Homepage;
