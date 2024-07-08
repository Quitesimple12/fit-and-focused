import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark bg-dark">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Fit-And-Focused</span>
				</Link>
				<div className="ml-auto">
					<ul className="navbar-menu">
						<li><span className="navbar-button">Exercises</span></li>
						<li><span className="navbar-button">Records</span></li> 
						<li><span className="navbar-button">Login</span></li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
