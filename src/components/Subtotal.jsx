import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { ShoppingBasket } from "@material-ui/icons";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import { useHistory } from "react-router-dom";

const Subtotal = () => {
	const [{ basket }, dispatch] = useStateValue()

	const history = useHistory()
	
	return (
		<div className="subtotal">
			<CurrencyFormat
				renderText={(value) => (
					<>
						<p>
							Subtotal ({basket.length} items):
							<strong> {value}</strong>
						</p>
						<small className="subtotal__gift">
							<input type="checkbox" />
							This order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={getBasketTotal(basket)}
				displayType={"text"}
				thousandSeparator={false}
				prefix={"$"}
			/>

			<button onClick={() => history.push("/payment")}>
				Proceed to checkout
			</button>
		</div>
	);
};

export default Subtotal;
