import moment from "moment";
import React from "react";
import "./Order.css";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

const Order = ({ order }) => {
	console.log(order.data.basket);

	return (
		<div className="order">
			<div className="order__details">
				<h2>Order</h2>

				<p>
					{moment
						.unix(order.data.created)
						.format("MMM Do YYYY, h:ma")}
				</p>

				<p className="order__id">
					<small>Order Id: {order.id}</small>
				</p>
			</div>

			{order.data.basket?.map((item) => (
				<CheckoutProduct
					id={item.id}
					title={item.title}
					price={item.price}
					image={item.image}
                    rating={item.rating}
                    hideButton={true}
				/>
			))}

			<CurrencyFormat
				renderText={(value) => <h3> OrderTotal: {value}</h3>}
				decimalScale={2}
				value={order.data.amount / 100}
				displayType={"text"}
				prefix={"$"}
				thousandSeparator={true}
			/>
		</div>
	);
};

export default Order;
