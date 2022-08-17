import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header({ pageView = false }) {
	console.log(`pageView: ${pageView}`);

	return (
		<div className={pageView ? styles.containerPage : styles.container}>
			<h2>
				<Link href='/'>
					<a className='hover:underline'>UnitedMasters University</a>
				</Link>
			</h2>

			<span className={styles.partnerLink}>VISIT UM</span>
		</div>
	);
}
