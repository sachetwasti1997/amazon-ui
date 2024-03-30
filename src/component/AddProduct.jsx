import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_PATH } from "../Constants";
import {
  fetchMyProductCall,
  fetchProducts,
  fetchUserProducts,
} from "../features/products/productsSlice";
import ProductCard from "./ProductCard";

const AddProduct = () => {
  const NAME = "name",
    DESCRIPTION = "description",
    CATEGORY = "category",
    PRICE = "price",
    QUANTITY = "quantity",
    IMAGE = "image";

  const OPTIONS = ["Select One", "Cosmetics", "Electronics"];

  const token = useSelector((state) => state.userReducer.token);
  const userData = useSelector((state) => state.userReducer.userData);
  const myProducts = useSelector((state) => state.productReducer.myProducts);
  const fetchCalled = useSelector(
    (state) => state.productReducer.myProductFetched
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetchCalled) {
      dispatch(fetchMyProductCall(true));
      dispatch(fetchUserProducts({ userId: userData.id, token }));
    }
  }, []);

  const onEditSelect = (product) => {
    setProductName(product.productName);
    setProductDescription(product.productDescription);
    setPrice(product.price);
    setTotalQuantity(product.totalQuantity);
    setCategory(product.category);
    setImageURL(product.imageURL);
    setId(product.id);
  };

  const [id, setId] = useState(null);
  const [imageToSend, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [imageURL, setImageURL] = useState([]);

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

  const submit = () => {
    const request = {
      productName,
      productDescription,
      category,
      price,
      totalQuantity,
      userId: userData.id
    };
    if(id) {
        request['id'] = id;
    }
    if (imageURL) {
        request['imageURL'] = imageURL;
    }
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
        setImage(null);
        setProductName("");
        setProductDescription("");
        setCategory("");
        setPrice(0);
        setTotalQuantity(0);
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
    <>
      <h1 className="text-left text-4xl mb-5">Product Information</h1>
      <div className="flex justify-between">
        <label>
          <h1 className="text-left text-xl">Product Image</h1>
          <input type="file" onChange={(e) => onChangeHandler(e, IMAGE)} />
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
            <option>SELECT ONE</option>
            {OPTIONS.map((optionNm, index) => (
              <option key={index}>{optionNm}</option>
            ))}
          </select>
        </label>
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white my-2 font-semibold  rounded-md p-4 text-center items-center justify-center"
        onClick={submit}
        disabled={isSubmitDisabled()}
      >
        Submit
      </button>
      <div className="grid grid-cols-4 gap-2 mt-7">
        {myProducts?.map((p) => (
          <ProductCard
            onEditSelect={onEditSelect}
            isEditAction={true}
            key={p.id}
            product={p}
          />
        ))}
      </div>
    </>
  );
};

export default AddProduct;
