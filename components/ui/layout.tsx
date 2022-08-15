import Alert from './alert';
import Footer from './footer';
import Meta from '../posts/meta';
import Header from './header';

import styles from './Layout.module.scss';

export default function Layout({ preview, children }) {
	return (
		<>
			<Meta />
			<div className={styles.container}>
				<Header />
				<main>{children}</main>
			</div>
		</>
	);
}
