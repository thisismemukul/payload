import React, { useEffect, useState } from 'react';

function PaymentStatus() {
    const [paymentData, setPaymentData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/get-payment-data');
                if (!response.ok) {
                    throw new Error('Failed to fetch payment data');
                }
                const data = await response.json();
                setPaymentData(data);
            } catch (error) {
                console.error('Fetch error:', error.message);
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!paymentData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Payment Status</h1>
            <p>Transaction ID: {paymentData.merchantTxnId}</p>
            <p>Amount: {paymentData.amount}</p>
            <p>Currency: {paymentData.currency}</p>
            <p>Status: {paymentData.statusMessage}</p>
            <p>Mode: {paymentData.mode}</p>
            <p>Signature: {paymentData.signature}</p>
        </div>
    );
}

export default PaymentStatus;
