import Link from 'next/link';
import styles from './Header.module.scss';
import Hamburger from '@components/common/hamburger';
import { useState } from 'react';

export default function Header({ pageView = false }) {
	console.log(`pageView: ${pageView}`);
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div className={pageView ? styles.containerPage : styles.container}>
			<h2>
				<Link href='/'>
					<a className='hover:underline'>UnitedMasters University</a>
				</Link>
			</h2>

			<div className='flex items-center'>
				<span className={styles.partnerLink}>VISIT UM</span>

				<Hamburger
					isActive={menuOpen}
					handleClick={() => {
						setMenuOpen(!menuOpen);
					}}
				/>
			</div>
		</div>
	);
}
