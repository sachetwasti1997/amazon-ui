import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_PATH } from "../Constants";
import { addMyProducts } from "../features/products/productsSlice";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ submit }) => {
  const NAME = "name",
    DESCRIPTION = "description",
    CATEGORY = "category",
    PRICE = "price",
    QUANTITY = "quantity",
    IMAGE = "image";

  const OPTIONS = ["SELECT ONE", "COSMETICS", "ELECTRONICS"];

  const token = useSelector((state) => state.userReducer.token);
  const userData = useSelector((state) => state.userReducer.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imageToSend, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");

  const isSubmitDisabled = () => {
    return (
      !productName ||
      !imageToSend ||
      !productDescription ||
      !category ||
      !price ||
      !totalQuantity
    );
  };

  const submitAction = () => {
    const request = {
      productName,
      productDescription,
      category,
      price,
      totalQuantity,
      userId: userData.id,
      userEmail: userData.email,
      userContact: userData.countryCode + " " + userData.phone,
    };
    const json = JSON.stringify(request);
    const blob = new Blob([json], {
      type: "application/json",
    });

    const formData = new FormData();
    formData.append("data", blob);
    formData.append("file", imageToSend);

    axios
      .post(API_BASE_PATH + "/item/save", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        dispatch(addMyProducts(res.data));
        navigate("/product");
      });
  };

  const onChangeHandler = (event, target) => {
    switch (target) {
      case IMAGE:
        if (event.target.files && event.target.files[0]) {
          setImage(event.target.files[0]);
        }
        break;
      case NAME:
        setProductName(event.target.value);
        break;
      case DESCRIPTION:
        setProductDescription(event.target.value);
        break;
      case CATEGORY:
        setCategory(event.target.value);
        break;
      case PRICE:
        setPrice(event.target.value);
        break;
      case QUANTITY:
        setTotalQuantity(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="m-10 bg-white border-solid border-cyan-950 rounded-lg text-gray-900">
      <h1 className="text-left text-4xl mb-5">Product Information</h1>
      <div className="flex justify-between">
        <label>
          <h1 className="text-left text-xl">Product Image</h1>
          <input
            type="file"
            className="file:mr-5 file:py-1 file:px-3 file:border-[1px]
            file:text-xs file:font-medium
          file:bg-blue-500 file:text-white
            hover:file:cursor-pointer hover:file:bg-blue-700
          hover:file:text-white file:rounded-md file:h-10"
            onChange={(e) => onChangeHandler(e, IMAGE)}
          />
        </label>
        <img
          src={imageToSend ? URL.createObjectURL(imageToSend) : null}
          className="h-40 w-40 border-none"
        />
      </div>
      <label>
        <h1 className="text-left text-xl">Product Name</h1>
        <input
          className="w-full border-2 border-gray-200 mb-5 rounded-md h-10"
          onChange={(e) => onChangeHandler(e, NAME)}
          defaultValue={productName}
        />
      </label>
      <label>
        <h1 className="text-left text-xl">Product Description</h1>
        <textarea
          className="w-full border-2 border-gray-200 mb-5 rounded-md h-20"
          onChange={(e) => onChangeHandler(e, DESCRIPTION)}
          defaultValue={productDescription}
        />
      </label>
      <div className="flex gap-2 mb-2">
        <label className="w-1/3">
          <h1 className="text-left text-xl">Quantity</h1>
          <input
            type="number"
            className="w-full border-2 border-gray-200 rounded-md h-10"
            onChange={(e) => onChangeHandler(e, QUANTITY)}
            defaultValue={totalQuantity}
          />
        </label>
        <label className="w-1/3">
          <h1 className="text-left text-xl">Price</h1>
          <input
            type="number"
            className="w-full border-2 border-gray-200 rounded-md h-10"
            onChange={(e) => onChangeHandler(e, PRICE)}
            defaultValue={price}
          />
        </label>
        <label className="w-1/3">
          <h1 className="text-left text-xl">Category</h1>
          <select
            className="w-full border-2 border-gray-200 rounded-md h-10"
            onChange={(e) => onChangeHandler(e, CATEGORY)}
            defaultValue={category}
          >
            {OPTIONS.map((optionNm, index) => (
              <option key={index}>{optionNm}</option>
            ))}
          </select>
        </label>
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white my-2 font-semibold  rounded-md p-4 text-center items-center justify-center"
        onClick={submitAction}
        disabled={isSubmitDisabled()}
      >
        Submit
      </button>
    </div>
  );
};

export default AddProduct;
