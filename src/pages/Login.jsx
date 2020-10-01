import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebaseApp";

const Login = () => {
	const [email, setEmail] = useState("");

	const [password, setPassword] = useState("");

	const history = useHistory();

	const signIn = (e) => {
		e.preventDefault();

		auth.signInWithEmailAndPassword(email, password)
			.then((auth) => {
				console.log(auth);
				history.replace("/");
			})
			.catch((err) => alert(err));
	};

	const register = (e) => {
		e.preventDefault();

		auth.createUserWithEmailAndPassword(email, password)
			.then((auth) => {
				alert(auth);
				history.replace("/");
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="login">
			<Link to="/">
				<img
					className="login__logo"
					src="https://logos-marcas.com/wp-content/uploads/2020/04/Amazon-Logo.png"
				/>
			</Link>

			<div className="login__container">
				<h1>Sign-in</h1>

				<form>
					<h5>E-mail</h5>
					<input
						type="text"
						className="login__input"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<h5>Password</h5>
					<input
						type="password"
						className="login__input"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button
						type="submit"
						className="login__signInButton"
						onClick={signIn}
					>
						Sign In
					</button>
				</form>

				<p>
					By signing-in you agree to Amazon's Conditions of Use &
					Sale. Please see our Privacy Notice, our Cookies Notice and
					our Interest-Based Ads Notice.
				</p>

				<button className="login__registerButton" onClick={register}>
					Create your Amazon Account
				</button>
			</div>
		</div>
	);
};

export default Login;
