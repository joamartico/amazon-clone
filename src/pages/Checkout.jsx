import React from "react";
import CheckoutProduct from "../components/CheckoutProduct";
import Subtotal from "../components/Subtotal";
import { useStateValue } from "../StateProvider";
import "./Checkout.css";

const Checkout = () => {
	const [{ basket }, dispatch] = useStateValue();

	return (
		<div className="checkout__page">
			<div className="checkout">
				<div className="checkout__top">
					<div className="checkout__left">
						<h2 className="checkout__title">
							Your Shopping Basket
						</h2>
					</div>

					<div className="checkout__right">
						<Subtotal className="checkout__subtotal" />
					</div>
				</div>

				<div className="checkout__products">
					{basket.map((product) => (
						<CheckoutProduct
							price={product.price}
							title={product.title}
							rating={product.rating}
							id={product.id}
							image={product.image}
							hideButton={false}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Checkout;
