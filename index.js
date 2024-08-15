const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

let paymentData = null;

app.post('/receive-payment-data', (req, res) => {
    paymentData = req.body;
    console.log('Payment Data Received:', paymentData); 
    res.status(200).send('Payment data received successfully');
});

app.get('/get-payment-data', (req, res) => {
    if (paymentData) {
        res.status(200).json(paymentData);
    } else {
        res.status(404).send('No payment data found');
    }
});

app.listen(3001, () => {
    console.log('Backend server is running on http://localhost:3001');
});
