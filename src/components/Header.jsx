import { Search, ShoppingBasket } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebaseApp";

const Header = () => {
	const [{ basket, user }, dispatch] = useStateValue();


	const handleAuthentication = () => {
		if (user) {
			auth.signOut();
		}
	};

	console.log("user: ", user)

	

	return (
		<div className="header">
			<Link to="/">
				<img
					className="header__logo"
					src="https://jordantravers.com/wp-content/uploads/2018/10/Amazon-Logo-1024x373.png"
					alt=""
				/>
			</Link>


			<div className="header__search">
				<input type="text" className="header__searchInput" />
				<Search className="header__searchIcon" />
			</div>

			<div className="header__nav">
				<Link
					to={!user && "/login"}
					className="header__option"
					onClick={handleAuthentication}
				>
					<span className="header__optionLineOne">
						Hello {user ? user.email : "Guest"}
					</span>
					<span className="header__optionLineTwo">
						{user ? "Sign Out" : "Sign In"}
					</span>
				</Link>

				<Link to="/orders"
				className="header__option">
					<span className="header__optionLineOne">Return</span>
					<span className="header__optionLineTwo">& Orders</span>
				</Link>

				<Link to="/checkout" className="header__optionBasket">
					<ShoppingBasket style={{ fontSize: "140%" }} />
					<span className="header__optionLineTwo header__basketCount">
						{basket?.length}
					</span>
				</Link>
			</div>
		</div>
	);
};

export default Header;
