import styles from './PostBody.module.scss';

export default function PostBody({ content, modules }) {
	return (
		<div className=''>
			{modules ? (
				modules.map(m => (
					<div key={`module-${m.title}`} className={styles.container} dangerouslySetInnerHTML={{ __html: m.content }} />
				))
			) : (
				<div className={styles.container} dangerouslySetInnerHTML={{ __html: content }} />
			)}
		</div>
	);
}
