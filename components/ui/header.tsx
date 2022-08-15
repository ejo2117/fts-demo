import Link from 'next/link';

export default function Header() {
	return (
		<h2 className=''>
			<Link href='/'>
				<a className='hover:underline'>UnitedMasters University</a>
			</Link>
		</h2>
	);
}
