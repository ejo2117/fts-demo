import styles from './hamburger.module.scss';
const Hamburger = ({ isActive, handleClick }) => {
	return (
		<div className={styles.container} onClick={handleClick}>
			<div className={styles.outer}>
				<div className={`${isActive ? styles.innerActive : styles.inner}`}></div>
			</div>
		</div>
	);
};

export default Hamburger;
