import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import { auth } from "./firebaseApp";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./pages/Orders";

const promise = loadStripe(
	"pk_test_51HRcfkJar0aHqrtQvUkan4aNnoM8WrwnyLCU9nIpKSgUMRe8A7ZlOQf743V1AD6LEaM1fS4Ct8NSw5Bd1sww8fk300WZHL08cL"
	//"sk_test_51HRcfkJar0aHqrtQo7uJnHZdTgj7Vu2eHID4odedhzYZPGrK7jtRxe9hcbrigx1g0mFOLSIoqZlt0H3zx1rVHM9v001BFfyvNH"
);
 
function App() {
	const [{}, dispatch] = useStateValue();

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				console.log("user dispatched: ", authUser);
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);

	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/login">
						<Login />
					</Route>

					<Route exact path="/checkout">
						<Header />
						<Checkout />
					</Route>

					<Route exact path="/orders">
						<Header />
						<Orders />
					</Route>

					<Route exact path="/payment">
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>

					<Route exact path="/">
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
