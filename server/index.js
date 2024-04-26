const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require('stripe')(process.env.KEY);

const app = express();
app.use(cors());

app.get('/',(req,res) => {
    res.send("Hello world");
})

app.post('/payment', async (req,res) => {
    const product = await stripe.products.create({
        name: 'T-Shirt'
    });
    if(product){
        var price = await stripe.prices.create({
            product: `${product.id}`,
            unit_amount: 100 * 100,
            currency: 'usd',
        });
    }
    if(price.id){
        var session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: `${price.id}`,
                    quantity: 1,
                }
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            customer_email: 'dummmy@gmail.com',
        })
    }
    res.json(session);
});

app.get('/success',(req,res) => {
    res.send("Your payment gets successfull!");
})

app.listen(3000,() => {
    console.log("Server is running on the port 3000");
})