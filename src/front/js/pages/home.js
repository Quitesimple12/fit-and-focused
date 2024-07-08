import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"; 
import rigoImageUrl from "../../img/rigo-baby.jpg";
import homeImage from "../../img/fit-and-focused home image.png"
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div className="image-container">
				<img src= {homeImage} className="responsive-image" />
				<Link to="/login">
					<button className="btn-success overlay-button">Get Started!</button>
				</Link>
				<p className="overlay-text">Ready to stay Fit and Focused? Track your progress here! Quick and easy, with no payments!</p>
			</div>
		</div>
	);
};
