import React from "react";
import Product from "../components/Product";
import "./Home.css";

const Home = () => {
	return (
		<div className="home">
			<div className="home__container">
				<img
					className="home__image"
					src="https://images-eu.ssl-images-amazon.com/images/G/30/kindle/journeys/ZGQ0OWJhZWEt/ZGQ0OWJhZWEt-OWUyMGVmODQt-w1500._CB405391193_.jpg"
					alt="alexa"
				/>
			</div>

			<div className="home__rows">
				<div className="home__row">
					<Product
						rating={5}
						image="https://m.media-amazon.com/images/I/81jgCiNJPUL._AC_UL320_.jpg"
						title="Lean Startup Method"
						price={300}
						id="1"
					/>
					<Product
						image="https://m.media-amazon.com/images/I/817NmEWIdwL._AC_UL320_.jpg"
						title="iPhone X"
						price={1000}
						rating={4}
						id="2"
					/>
				</div>

				<div className="home__row">
					<Product />
					<Product />
					<Product />
				</div>

				<div className="home__row">
					<Product />
				</div>
			</div>
		</div>
	);
};

export default Home;
