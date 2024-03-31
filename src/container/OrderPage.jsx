import { useParams } from "react-router-dom"

const OrderDetails = () => {
    const params = useParams();
    const orderId = params.id;
    return <div>{orderId}</div>
}

export default OrderDetails;