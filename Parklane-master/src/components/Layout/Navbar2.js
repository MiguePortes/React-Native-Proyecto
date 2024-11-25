import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/smartblanco.png'; 
import { FaBars } from 'react-icons/fa';
import HowItWorks from './HowItWorks';
import {useAppContext} from '../../AppContext';
import UserIn from './UserIn';
import {
  FaHome,
  FaSignOutAlt,
  FaTicketAlt,
  FaQuestion
} from 'react-icons/fa';


const Navbar = () => {
	const {logoutHandler, email} = useAppContext();

	const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
	const [showLinks, setShowLinks] = useState(false); 

	const linksContainerRef = useRef(null);
	const linksRef = useRef(null);
	const toggleRef = useRef(null);


	const getoutHandler = () => {
		logoutHandler();
	};

	const howItWorksHandler = () => {
		setIsHowItWorksOpen((prevstate) => !prevstate);
	};

	useEffect(() => {
		const linksHeight = linksRef.current.getBoundingClientRect().height;

		if (showLinks) {
			linksContainerRef.current.style.height = `${linksHeight}px`;
			toggleRef.current.style.transform = 'rotate(90deg)';
			toggleRef.current.style.color = '#19222a';
		}
		else {
			linksContainerRef.current.style.height = '0px';
			toggleRef.current.style.transform = 'rotate(0deg)';
			toggleRef.current.style.color = 'beige';
		}
	}, [showLinks]);


	return (
		<>
			<nav className = "nav2">
				<div className = "nav-center">
					<div className = "nav-header2">
						<Link to = '/'><img src = {logo} className = 'nav-logo' alt = 'parklane' /></Link>
						<button className = "btn toggle-btn" ref = {toggleRef} onClick = {() => setShowLinks(!showLinks)}>
							<FaBars />
						</button>
					</div>
					
					<div className = "links-container" ref = {linksContainerRef}>

						<ul className = "links" ref = {linksRef}>
							<li className = 'splink'>
								<span>{email}</span>
							</li>
							<li>
								<Link to = '/profile'><span>{showLinks && <FaHome />} Inicio </span></Link>
							</li>
							<li>
								<Link to = '/bookings'><span>{showLinks && <FaTicketAlt />} Reservas</span></Link> 
							</li>
							<li onClick = {howItWorksHandler}>
								<span style = {{cursor:'pointer'}}>{showLinks && <FaQuestion />} Cómo Funciona</span>
							</li>
							<li className = 'logout-mobile'>
								<span onClick = {getoutHandler}>{showLinks && <FaSignOutAlt />} Cerrar sesión</span> 
							</li>
							<div className = 'dot'></div>
						</ul>
						
					</div>

					<UserIn />

					<button className = 'logout-pc' onClick = {getoutHandler}>Cerrar Sesion</button>
				</div>
			</nav>

			{isHowItWorksOpen && <HowItWorks isHowItWorksOpen = {isHowItWorksOpen} closeHowItWorks = {howItWorksHandler}  />}
		</>
	);
};

export default Navbar;
