import Alert from './alert';
import Footer from './footer';
import Meta from '../posts/meta';
import Header from './Header';

import styles from './Layout.module.scss';

export default function Layout({ preview, children }) {
	return (
		<>
			<Meta />
			<div className={preview ? styles.gridContainer : styles.container}>
				<Header pageView={preview} />
				<main className={preview ? styles.gridContainer : styles.postContainer}>{children}</main>
			</div>
		</>
	);
}
