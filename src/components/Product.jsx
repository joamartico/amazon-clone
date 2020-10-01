import React from "react";
import { useStateValue } from "../StateProvider";
import "./Product.css";

const Product = ({ id, title, image, price, rating }) => {
	const [{ basket }, dispatch] = useStateValue();

	const addToBasket = () => {
		dispatch({
			type: "ADD_TO_BASKET",
			item: {
				id,
				title,
				image,
				price,
				rating,
			},
		});
	};

	return (
		<div className="product">
			<div className="product__info">
				<p>{title}</p>
				<p className="product__price">
					<small>
						<strong>${price}</strong>
					</small>
				</p>
				<div className="product__rating">
					{Array(rating)
						.fill()
						.map((_, i) => (
							<img src="https://www.emojibase.com/resources/img/emojis/apple/2b50.png" />
						))}
				</div>
			</div>

			<img src={image} alt={title} />

			<button onClick={addToBasket}>Add to Basket</button>
		</div>
	);
};

export default Product;
