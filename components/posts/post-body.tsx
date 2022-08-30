import styles from './PostBody.module.scss';

export default function PostBody({ content, modules }) {
	return (
		<div className=''>
			<div className={styles.container} dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
}
