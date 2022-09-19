import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Alert from './alert';
import Footer from './footer';
import Meta from '../posts/meta';
import Header from './header';
import Navigation from './navigation';

import styles from './Layout.module.scss';

export default function Layout({ preview, categories, children }) {
	const router = useRouter();
	const [menuOpen, setMenuOpen] = useState(false);

	const closeMenu = () => {
		setMenuOpen(false);
	};

	useEffect(() => {
		router.events.on('routeChangeStart', closeMenu);

		return () => {
			router.events.off('routeChangeStart', closeMenu);
		};
	}, [router.events]);

	const generateClasses = () => {
		return [
			...(preview ? [`${styles.gridContainer}`, `${styles.addTop}`] : [`${styles.postContainer}`]),
			...(menuOpen ? [`${styles.blurred}`] : ['']),
		].join(' ');
	};

	return (
		<>
			<Meta />
			<div className={preview ? styles.gridContainer : styles.container}>
				<Header pageView={preview} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
				<Navigation visible={menuOpen} categories={categories} />
				<main className={generateClasses()}>{children}</main>
			</div>
		</>
	);
}
