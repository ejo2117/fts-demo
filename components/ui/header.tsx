import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
	return (
		<h2 className={styles.container}>
			<Link href='/'>
				<a className='hover:underline'>UnitedMasters University</a>
			</Link>
		</h2>
	);
}
