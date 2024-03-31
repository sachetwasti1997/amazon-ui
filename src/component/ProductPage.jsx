import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_BASE_PATH } from "../Constants";
import { useNavigate } from "react-router-dom";

const ProductPage = ({ product }) => {
  const imageURLs = product?.imageURL;
  const [imageToDisplay, setImageToDisplay] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const token = useSelector(state => state.userReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    setImageToDisplay(imageURLs?.[0]);
  }, [product]);

  const changeImageToDisplay = (index) => {
    setImageToDisplay(imageURLs[index]);
  };

  const handleSubmit = () => {
    const itemPrice = parseInt(quantity) * parseInt(product.price);
    const request = {
      userEmail: product.userEmail,
      itemId: product.id,
      quantity,
      itemPrice
    };
    axios.post(API_BASE_PATH + "/order/create", request, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(res => navigate(`/order/${res.data.id}`));
  };

  const onChangeHandler = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <div className="flex flex-row gap-3">
      <div className="w-1/2">
        <img
          src={imageToDisplay}
          alt="Image"
          className="w-full h-160 object-cover rounded-md"
        />
        {imageURLs?.length > 1 && (
          <div className="mt-2 flex flex-row gap-1 h-16">
            {imageURLs?.map((imgItm, index) => (
              <img
                onClick={() => changeImageToDisplay(index)}
                src={imgItm}
                alt="Image"
                className="w-16 h-16 rounded-md"
              />
            ))}
          </div>
        )}
      </div>
      <div className="w-1/2 flex flex-col gap-4 p-4">
        <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          {product?.productName}
        </h5>
        <hr />
        <div className="flex flex-col gap-2">
          <label className="w-full">
            Total Stock
            <input
              type="number"
              defaultValue={product?.totalQuantity}
              // onChange={(e) => inputChangeHandler(e, ZIP_CODE)}
              className="w-full p-2 disabled text-black bg-transparent border-2 border-gray-500 rounded-lg outline-none focus:outline-none"
            />
          </label>
          <label className="w-full">
            Order Quantity
            <input
              type="number"
              defaultValue={1}
              onChange={onChangeHandler}
              className="w-full p-2 text-black bg-transparent border-2 border-gray-500 rounded-lg outline-none focus:outline-none"
            />
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-bold">Price: $ </span>
            {product?.price}
          </p>
          <p>
            <span className="font-bold">Sold By: </span>
            {product?.userEmail}
          </p>
          <p>
            <span className="font-bold">Seller Contact: </span>
            {product?.userContact}
          </p>
        </div>
        <hr />
        <p>{product?.productDescription}</p>
        <button
          className="mt-2 items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            handleSubmit()
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
