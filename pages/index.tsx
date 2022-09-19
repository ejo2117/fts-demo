import Head from 'next/head';
import { GetStaticProps } from 'next';
import Container from '@components/ui/container';
import MoreStories from '@components/posts/more-stories';
import HeroPost from '@components/posts/hero-post';
import Layout from '@components/ui/layout';
import { getAllPostsForHome, getCategories } from '@lib/api';
import PostGrid from '@components/homepage/PostGrid';
import { flattenGraphQLResponse } from '@utils/helpers';
import { Post } from '@lib/types';
import Homepage from '@components/homepage/Homepage';

export default function Index({ allPosts: { edges }, allCategories, preview }) {
	const posts: Post[] = flattenGraphQLResponse(edges);

	return (
		<Layout preview={preview} categories={allCategories.edges}>
			<Head>
				<title>UnitedMasters University</title>
			</Head>
			<Homepage posts={posts} />
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	const allPosts = await getAllPostsForHome(preview);
	const allCategories = await getCategories();

	return {
		props: { allPosts, allCategories, preview },
		revalidate: 10,
	};
};
