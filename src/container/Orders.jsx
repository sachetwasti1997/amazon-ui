import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrder } from "../features/orders/ordersSlice";
import OrdersCard from "../component/OrdersCard";

const Orders = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userReducer.token);
  const userData = useSelector((state) => state.userReducer.userData);
  const areOrdersFetched = useSelector((state) => state.orderReducer.fetchCall);
  const myOrders = useSelector((state) => state.orderReducer.myOrders);

  useEffect(() => {
    if (!areOrdersFetched && userData) {
      dispatch(fetchMyOrder({ email: userData.email, token }));
    }
  }, [userData]);

  console.log(myOrders);

  return (
    <div className="flex flex-col gap-4 m-10 bg-white border-solid border-cyan-950 rounded-lg text-gray-900">
      {myOrders && myOrders?.map((order) => (
        <OrdersCard order={order}/>
      ))}
    </div>
  );
};

export default Orders;
