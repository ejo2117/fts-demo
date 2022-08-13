import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '@components/ui/container'
import MoreStories from '@components/posts/more-stories'
import HeroPost from '@components/posts/hero-post'
import Layout from '@components/ui/layout'
import { getAllPostsForHome } from '@lib/api'
import PostGrid from '@components/homepage/PostGrid'

export default function Index({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node
  const morePosts = edges.slice(1)

  return (
    <Layout preview={preview}>
      <Head>
        <title>UnitedMasters University</title>
      </Head>
      <PostGrid />
      {/* <Container>
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.featuredImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container> */}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview)

  return {
    props: { allPosts, preview },
    revalidate: 10,
  }
}
