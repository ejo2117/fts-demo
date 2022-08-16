import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
	return (
		<div className={styles.container}>
			<h2>
				<Link href='/'>
					<a className='hover:underline'>UnitedMasters University</a>
				</Link>
			</h2>

			<span className={styles.partnerLink}>VISIT UM</span>
		</div>
	);
}
