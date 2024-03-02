import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = () => {

    const element = useElements();
    const stripe = useStripe();


    const checkout = async () => {
        if(!stripe || !element || !element.getElement(CardElement)) {
            return;
        }
        let paymentInfo = {
            "userEmail": "sachetwasti61@gmail.com",
            "amount": 100,
            "orderId": "65d6f40ac6d1bc1d6ff7d12c"
        };
        const config = {
            headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3YXN0aXNhY2hldEBnbWFpbC5jb20iLCJpYXQiOjE3MDg1ODE4MTMsImV4cCI6MTcwODYxNzgxM30.7phwfZ_6HFzkvCfkcevmozk26DBHTf5IqsnP_pGf1ME' }
        };
        const url = 'https://amazon.dev/api/v1/payment';
        axios.post(url, paymentInfo, config)
        .then(res => {
            const stripeResponse = res.data;
            stripe.confirmCardPayment(
                stripeResponse.client_secret,
                {
                    payment_method:{
                        card: element.getElement(CardElement),
                        billing_details: {
                            email: 'sachetwasti61@gmail.com'
                        }
                    }
                }, {handleActions: false}
            ).then(res => {
                const url = 'https://amazon.dev/api/v1/payment/complete'
                axios.post(url, {
                    "orderId": "65d6f40ac6d1bc1d6ff7d12c",
                    "paymentStatus": "PAYMENT_SUCCESS"
                }, config)
            })
        })
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-full m-20 p-6 bg-white border border-gray-50 rounded-lg shadow dark:bg-gray-80 dark:border-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Credit Card</h5>
                <p className="text-gray-700 text-base">
                    Proceed with the payment of $20
                </p>
                <CardElement id="card-element" className="m-2"/>
                <button 
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={checkout}
                >
                    Make Payment
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default PaymentForm;