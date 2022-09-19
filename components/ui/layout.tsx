import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Alert from './alert';
import Footer from './footer';
import Meta from '../posts/meta';
import Header from './header';
import Navigation from './navigation';

import styles from './Layout.module.scss';

import { motion, AnimatePresence } from 'framer-motion';

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

	const variants = {
		hidden: { opacity: 0, x: -200, y: 0 },
		enter: { opacity: 1, x: 0, y: 0 },
		exit: { opacity: 0, x: 0, y: -100 },
	};
	return (
		<>
			<Meta />
			<div className={preview ? styles.gridContainer : styles.container}>
				<Header pageView={preview} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
				<Navigation visible={menuOpen} categories={categories} />
				<motion.main
					variants={variants}
					initial='hidden'
					animate='enter'
					exit='exit'
					transition={{ type: 'linear' }}
					className={generateClasses()}
				>
					{children}
				</motion.main>
			</div>
		</>
	);
}
