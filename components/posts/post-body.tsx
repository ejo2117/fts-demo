import styles from './PostBody.module.scss';

export default function PostBody({ content }) {
	return (
		<div className=''>
			<div className={styles.container} dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
}
