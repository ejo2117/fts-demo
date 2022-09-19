import styles from './Title.module.scss';
const Title = () => {
	return (
		<section className={styles.container}>
			<h1>
				<strong>UnitedMasters</strong> University
			</h1>
			<h3>Welcome to Your First Year</h3>
		</section>
	);
};

export default Title;
