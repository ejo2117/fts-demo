import { flattenGraphQLResponse } from '@utils/helpers';
import Link from 'next/link';
import styles from './navigation.module.scss';
import SectionSeparator from './section-separator';

const Navigation = ({ visible, categories }) => {
	return (
		<div className={visible ? styles.containerVisible : styles.container}>
			<SectionSeparator />
			{categories.map(({ node }) => {
				if (!node.posts.edges.length) return;
				const postsInCategory = flattenGraphQLResponse(node.posts.edges);
				return (
					<div key={`nav-header-${node.name}`} className={styles.linkContainer}>
						<h4>{node.name}</h4>
						{postsInCategory.map(p => (
							<Link key={`nav-link-${p.title}`} href={`/posts/${p.slug}`}>
								<a>{p.title}</a>
							</Link>
						))}
					</div>
				);
			})}
		</div>
	);
};

export default Navigation;
