/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
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

import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';

import styles from './styles.module.scss';

export default function Post({ post, posts, allCategories, preview }) {
	const router = useRouter();
	const isClass: boolean = post?.postSettings?.isclass ?? false;
	const associatedModules = isClass ? post.postSettings.modules : false;

	const [currentModule, setCurrentModule] = useState(0);
	const [direction, setDirection] = useState(0);

	const bodyTitle = isClass ? associatedModules[currentModule].title : post.title;

	const generateBody = () => {
		return isClass ? associatedModules[currentModule].content : post.content;
	};

	const [bodyContent, setBodyContent] = useState(generateBody());
	// const morePosts = posts?.edges;

	// const bodyContent = isClass ? associatedModules[currentModule].content : post.content;

	useEffect(() => {
		setBodyContent(generateBody());
	}, [currentModule]);

	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	const variants = {
		enter: direction => {
			return {
				x: direction ? 300 : -300,
				opacity: 1,
			};
		},
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
		},
		exit: direction => {
			return {
				zIndex: 0,
				x: direction ? -300 : 300,
				opacity: 1,
			};
		},
	};

	const navigateModule = newDirection => {
		let newIndex = newDirection ? currentModule + 1 : currentModule - 1;
		newIndex = newIndex < 0 ? 0 : newIndex;
		newIndex = newIndex >= associatedModules.length ? associatedModules.length - 1 : newIndex;

		setCurrentModule(newIndex);
		setDirection(newDirection);
	};

	return (
		<Layout preview={true} categories={allCategories?.edges ?? []}>
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
							<h2>{bodyTitle}</h2>
						</div>
						{post.featuredImage && (
							<div className={styles.imageContainer}>
								<img src={post.featuredImage?.node.sourceUrl} alt={`Featured Image for ${post.title}`} />
								{/* <Image
									width='100%'
									height='100%'
									// layout='responsive'
									objectFit='contain'
									src={post.featuredImage?.node.sourceUrl}
									alt={`Featured Image for ${post.title}`}
								/> */}
							</div>
						)}
						<div className={styles.slides}>
							<AnimatePresence custom={direction}>
								<motion.div
									className={styles.motion}
									key={`page-${currentModule + 1}`}
									custom={direction}
									variants={variants}
									initial='enter'
									animate='center'
									exit='exit'
								>
									<PostBody content={bodyContent} />
								</motion.div>
							</AnimatePresence>
						</div>
						{isClass && (
							<div className={styles.control}>
								<div onClick={() => navigateModule(false)}>Prev</div>
								<div onClick={() => navigateModule(true)}>Next</div>
							</div>
						)}
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
