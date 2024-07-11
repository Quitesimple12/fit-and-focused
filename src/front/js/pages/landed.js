import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"; 
import rigoImageUrl from "../../img/rigo-baby.jpg";
import homeImage from "../../img/fit-and-focused home image.png"
import "../../styles/home.css";

export const Landed = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div className="image-container">
				<img src= {homeImage} className="responsive-image" />
				<Link to="/login">
					<button className="btn-success overlay-button">ihjohjpajif</button>
				</Link>
				<p className="overlay-text">You're logged in!</p>
			</div>
		</div>
	);
};