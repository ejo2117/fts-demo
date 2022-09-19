import Link from 'next/link';
import styles from './Header.module.scss';
import Hamburger from '@components/common/hamburger';
import { useState } from 'react';

export default function Header({ pageView = false, menuOpen, setMenuOpen }) {
	return (
		<div className={pageView ? styles.containerPage : styles.container}>
			<h2>
				<Link href='/'>
					<a className={`${menuOpen ? styles.blackText : ''}  hover:underline`}>
						<strong>UnitedMasters</strong> University
					</a>
				</Link>
			</h2>

			<div className='flex items-center'>
				<Link href={'https://unitedmasters.com/'}>
					<a className={styles.partnerLink}>VISIT UM</a>
				</Link>

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
