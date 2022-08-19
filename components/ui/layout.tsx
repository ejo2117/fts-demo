import { useState } from 'react';

import Alert from './alert';
import Footer from './footer';
import Meta from '../posts/meta';
import Header from './header';
import Navigation from './navigation';

import styles from './Layout.module.scss';

export default function Layout({ preview, children }) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			<Meta />
			<div className={preview ? styles.gridContainer : styles.container}>
				<Header pageView={preview} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
				<Navigation visible={menuOpen} />
				<main className={preview ? styles.gridContainer : styles.postContainer}>{children}</main>
			</div>
		</>
	);
}
