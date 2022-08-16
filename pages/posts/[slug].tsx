import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Container from '@components/ui/container';
import PostBody from '@components/posts/post-body';
import MoreStories from '@components/posts/more-stories';
import Header from '@components/ui/Header';
import PostHeader from '@components/posts/post-header';
import SectionSeparator from '@components/ui/section-separator';
import Layout from '@components/ui/Layout';
import PostTitle from '@components/posts/post-title';
import Tags from '@components/posts/tags';
import { getAllPostsWithSlug, getPostAndMorePosts } from '@lib/api';
import { CMS_NAME } from '@lib/constants';

import styles from './styles.module.scss';

export default function Post({ post, posts, preview }) {
	const router = useRouter();
	const morePosts = posts?.edges;

	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	return (
		<Layout preview={true}>
			{router.isFallback ? (
				<PostTitle>Loading…</PostTitle>
			) : (
				<>
					<article>
						<Head>
							<title>{post.title} | UnitedMasters University</title>
							<meta property='og:image' content={post.featuredImage?.sourceUrl} />
						</Head>
						<div className={styles.postTitle}>
							<div>{post.title}</div>
						</div>
						<PostBody content={post.content} />
						<footer>{post.tags.edges.length > 0 && <Tags tags={post.tags} />}</footer>
					</article>

					<SectionSeparator />
				</>
			)}
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData }) => {
	const data = await getPostAndMorePosts(params?.slug, preview, previewData);

	return {
		props: {
			preview,
			post: data.post,
			posts: data.posts,
		},
		revalidate: 10,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const allPosts = await getAllPostsWithSlug();

	return {
		paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
		fallback: true,
	};
};
