const OrdersCard = ({order}) => {
    return (
      <div className="flex gap-2 w-full p-6 bg-white border border-gray-500 rounded-lg shadow">
        <div>
          <img
            src={order.itemImage}
            alt="Image"
            className="w-48 h-48 object-cover rounded-md"
          />
        </div>
        <div className="p-2">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {order.itemTitle ? order.itemTitle : "TITLE HERE"}
          </h5>
          <hr />
          <div className="flex flex-col">
            <p>
              <span className="font-bold">Price: $ </span>
              {order.itemPrice}
            </p>
            <p>
              <span className="font-bold">Sold By: </span>
              {order.sellerEmail}
            </p>
            <p>
              <span className="font-bold">Seller Contact: </span>
              {order.sellerContact}
            </p>
            <p>
              <span className="font-bold">Order Status: </span>
              {order.status}
            </p>
          </div>
        </div>
      </div>
    );
}

export default OrdersCard;