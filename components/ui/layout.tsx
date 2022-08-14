import Alert from './alert';
import Footer from './footer';
import Meta from '../posts/meta';
import Header from './header';

export default function Layout({ preview, children }) {
	return (
		<>
			<Meta />
			<div className='min-h-screen'>
				<Header />
				<main>{children}</main>
			</div>
		</>
	);
}
