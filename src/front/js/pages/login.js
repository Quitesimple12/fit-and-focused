import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"; 
import rigoImageUrl from "../../img/rigo-baby.jpg";
import homeImage from "../../img/fit-and-focused home image 2.png"
import "../../styles/home.css";

export const Login = () => {
    const {store, actions} = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState("");

    const handleLogin = async () => {
        try {
            const result = await actions.login(email, password);
            if (result) {
                navigate("/");
                setLoginStatus("success");
            } else {
                setLoginStatus("error");
            }
        } catch (error) {
            setLoginStatus("error");
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
                <button className="btn btn-success">Login!</button>
                <Link to="/signup">
                    <button className="btn btn-success">Don't have an account? Signup Here!</button>
                </Link>
            </div>
        </div>
    </div>
    )
}