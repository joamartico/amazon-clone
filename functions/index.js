const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const path = require("path");
const stripe = require("stripe")(
	"sk_test_51HRcfkJar0aHqrtQo7uJnHZdTgj7Vu2eHID4odedhzYZPGrK7jtRxe9hcbrigx1g0mFOLSIoqZlt0H3zx1rVHM9v001BFfyvNH"
);



// const admin = require("firebase-admin")
// admin.initializeApp(functions.config().firebase)



//INITIALIZATIONS
const app = express();


//MIDDLEWARES
app.use(cors({ origin: true }));
//app.use(express.urlencoded({extended: true}))
app.use(express.json());

//ROUTES
app.get("/", (req, res) => res.status(200).send("hellllo"));

app.post("/payments/create", async (req, res) => {
	const total = req.query.total;
	console.log("Payment request for the amount of", total);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: "usd",
	});

	res.status(201).send({
		clientSecret: paymentIntent.client_secret
	});
});

//LISTEN
exports.api = functions.https.onRequest(app);
