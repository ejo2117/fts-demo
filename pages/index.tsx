import Head from 'next/head';
import { GetStaticProps } from 'next';
import Container from '@components/ui/container';
import MoreStories from '@components/posts/more-stories';
import HeroPost from '@components/posts/hero-post';
import Layout from '@components/ui/layout';
import { getAllPostsForHome } from '@lib/api';
import PostGrid from '@components/homepage/PostGrid';
import { flattenGraphQLResponse } from '@utils/helpers';

export default function Index({ allPosts: { edges }, preview }) {
	const posts = flattenGraphQLResponse(edges);

	return (
		<Layout preview={preview}>
			<Head>
				<title>UnitedMasters University</title>
			</Head>
			<PostGrid posts={posts} />
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	const allPosts = await getAllPostsForHome(preview);

	return {
		props: { allPosts, preview },
		revalidate: 10,
	};
};
