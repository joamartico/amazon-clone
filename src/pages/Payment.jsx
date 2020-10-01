import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import CheckoutProduct from "../components/CheckoutProduct";
import { getBasketTotal } from "../reducer";
import { useStateValue } from "../StateProvider";
import "./Payment.css";
import axios from "../axios";
import { db } from "../firebaseApp";

const Payment = () => {
	const [{ basket, user }, dispatch] = useStateValue();

	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [succeeded, setSucceeded] = useState(false);
	const [clientSecret, setClientSecret] = useState();

	const stripe = useStripe();
	const elements = useElements();

	const history = useHistory();

	useEffect(() => {
		const getClientSecret = async () => {
			const res = await axios({
				method: "post",
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
			});
			setClientSecret(res.data.clientSecret);
		};
		getClientSecret();
	}, [basket]);

	console.log("secret:", clientSecret);

	const handleChange = (e) => {
		setDisabled(e.empty);
		setError(e.error ? e.error.message : "");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setProcessing(true);

		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(async ({ paymentIntent }) => {
				console.log({ ...basket });

				await db
					.collection("users")
					.doc(user?.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				setError(null);
				setProcessing(false);
				setSucceeded(true);

				dispatch({
					type: "EMPTY_BASKET",
				});

				history.replace("/orders");
			});
	};

	return (
		<div className="payment">
			<div className="payment__container">
				<h1>Checkout ({basket.length} items)</h1>
				<div className="payment__section">
					<div className="payment__title">
						<h3>Delivery Adress</h3>
					</div>

					<div className="payment__adress">
						<p>{user?.email}</p>
						<p>123 Lincoln</p>
						<p>Castelar, Buenos Aires</p>
					</div>
				</div>

				<div className="payment__section">
					<div className="payment__title">
						<h3>Review Items and Delivery</h3>
					</div>

					<div className="payment__items">
						{basket.map((product) => (
							<CheckoutProduct
								className="payment__product"
								id={product.id}
								image={product.image}
								price={product.price}
								title={product.title}
								rating={product.rating}
								hideButton={false}
							/>
						))}
					</div>
				</div>

				<div className="payment__section">
					<div className="payment__title">
						<h3>Payment Method</h3>
					</div>

					<div className="payment__details">
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />

							<div className="payment__priceContainer">
								<CurrencyFormat
									renderText={(value) => (
										<h3 className="payment__price"> OrderTotal: {value}</h3>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={"text"}
									prefix={"$"}
									thousandSeparator={true}
								/>

								<button
									disabled={
										processing || disabled || succeeded
									}
									className="payment__button"
								>
									<strong>
										{processing ? "Processing" : "Buy Now"}
									</strong>
								</button>
							</div>

							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;
