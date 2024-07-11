import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom"; 
import rigoImageUrl from "../../img/rigo-baby.jpg";
import homeImage from "../../img/fit-and-focused signup image.png"
import "../../styles/home.css";

export const Signup = () => {
    const {store, actions} = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async() => {
        let result = await actions.signup(email, password)
        if (result) {
         navigate("/login")
        }
        else {
         setError("Error occurred, while signing you up")
        }
     };

    return (
    <div>
        <img src= {homeImage} className="responsive-image" />
        <div className="card overlay-card">
            <div className="card-body">
                <label htmlFor="InputEmail" className="form-label">Email</label>
                <input 
                    type="email"
                    className="form-control mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email Address"
                     / >
                <label htmlFor="InputPassword" className="form-label">Password</label>
                <input 
                    type="password"
                    className="form-control mb-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                     / >
                <button className="btn btn-success" onClick={handleSignup} >Signup!</button>
            </div>
        </div>
    </div>
    )
}