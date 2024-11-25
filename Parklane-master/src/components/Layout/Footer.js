import classes from './Footer.module.css';

const Footer = () => {
	return (
		<div className = {classes.footer}>
			<footer className = {classes.foot}>
				<span>&copy; SmartPark UTSH</span>
			</footer>
		</div>
	);
};
export default Footer;