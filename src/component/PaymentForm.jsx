import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const PaymentForm = () => {
  const element = useElements();
  const stripe = useStripe();
  const { state } = useLocation();
  const token = useSelector((state) => state.userReducer.token);
  const navigate = useNavigate();

  const [counter, setCounter] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }else {
        navigate("/orders");
    }
  }, [counter]);

  const checkout = async () => {
    if (!stripe || !element || !element.getElement(CardElement)) {
      return;
    }
    let paymentInfo = {
      userEmail: state.order.userEmail,
      amount: state.order.itemPrice,
      orderId: state.order.id,
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = "https://amazon.dev/api/v1/payment";
    axios.post(url, paymentInfo, config).then((res) => {
      setLoading(true);
      const stripeResponse = res.data;
      stripe
        .confirmCardPayment(
          stripeResponse.client_secret,
          {
            payment_method: {
              card: element.getElement(CardElement),
              billing_details: {
                email: state.order.userEmail,
              },
            },
          },
          { handleActions: false }
        )
        .then((res) => {
          const url = "https://amazon.dev/api/v1/payment/complete";
          console.log(res);
          axios
            .post(
              url,
              {
                orderId: state.order.id,
                paymentStatus: "PAYMENT_SUCCESS",
              },
              config
            )
            .then((res) => {
              navigate("/orders");
            });
        })
        .catch((err) => {
          setError(err);
        });
    }).catch(err => setError(err.message));
  };

  const spinner = <Spinner/>

  const component = (
    <>
      <div className="w-full m-20 p-6 bg-white border border-gray-50 rounded-lg shadow dark:bg-gray-80 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          Credit Card
        </h5>
        <p className="text-gray-700 text-base">
          Proceed with the payment of ${state.order.itemPrice}
        </p>
        <CardElement id="card-element" className="m-2" />
        <button
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={checkout}
        >
          Make Payment
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </>
  );

  return (
    <div className="h-screen flex flex-col m-10 items-center gap-2 justify-center">
      <h1 className="text-left text-4xl mb-5">Complete Payment</h1>
      <p className="text-red-500">
        Please complete payment within {counter} seconds
      </p>
      {loading ? spinner : null}
      {component}
    </div>
  );
};

export default PaymentForm;
