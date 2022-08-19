import styles from './navigation.module.scss';

const Navigation = ({ visible }) => {
	return <div className={visible ? styles.containerVisible : styles.container}>Enter</div>;
};

export default Navigation;
