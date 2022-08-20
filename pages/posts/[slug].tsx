import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Container from '@components/ui/container';
import PostBody from '@components/posts/post-body';
import MoreStories from '@components/posts/more-stories';
import Header from '@components/ui/header';
import PostHeader from '@components/posts/post-header';
import SectionSeparator from '@components/ui/section-separator';
import Layout from '@components/ui/layout';
import PostTitle from '@components/posts/post-title';
import Tags from '@components/posts/tags';
import { getAllPostsWithSlug, getCategories, getPostAndMorePosts } from '@lib/api';
import { CMS_NAME } from '@lib/constants';

import Image from 'next/image';

import styles from './styles.module.scss';

export default function Post({ post, posts, allCategories, preview }) {
	const router = useRouter();
	const morePosts = posts?.edges;

	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	return (
		<Layout preview={true} categories={allCategories.edges}>
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
							<h2>{post.title}</h2>
						</div>
						<div className={styles.imageContainer}>
							<Image
								width='100%'
								height={400}
								layout='fill'
								objectFit='cover'
								src={post.featuredImage?.node.sourceUrl}
								alt={`Featured Image for ${post.title}`}
							/>
						</div>
						<PostBody content={post.content} />
					</article>
				</>
			)}
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData }) => {
	const data = await getPostAndMorePosts(params?.slug, preview, previewData);
	const allCategories = await getCategories();

	return {
		props: {
			preview,
			allCategories,
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
