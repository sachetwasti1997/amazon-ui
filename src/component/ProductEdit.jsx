import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_PATH } from "../Constants";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../features/products/productsSlice";

const ProductEdit = ({ product }) => {
  const NAME = "name",
    DESCRIPTION = "description",
    CATEGORY = "category",
    PRICE = "price",
    QUANTITY = "quantity",
    IMAGE = "image";
  const OPTIONS = ["SELECT ONE", "COSMETICS", "ELECTRONICS"];

  const token = useSelector((state) => state.userReducer.token);

  const dispatch = useDispatch();

  const [imageToDisplay, setImageToDisplay] = useState(null);
  const [imageURLs, setImageURLs] = useState(null);
  const [imageToSend, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [error, setError] = useState("");

  const changeImageToDisplay = (index) => {
    setImageToDisplay(imageURLs[index]);
  };

  useEffect(() => {
    setImageToDisplay(product?.imageURL?.[0]);
    setProductName(product?.productName);
    setPrice(product?.price);
    setProductDescription(product?.productDescription);
    setTotalQuantity(product?.totalQuantity);
    setCategory(product?.category);
    setImageURLs(product?.imageURL);
  }, [product]);

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

  const addImage = () => {
    if (!imageToSend) {
      setError("No Image Uploaded");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageToSend);

    axios.put(API_BASE_PATH + `/item/addImage/${product.id}`, formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(res => {
        const prd = res.data;
        setImageURLs(prd.imageURL);
        dispatch(updateProduct(prd));
    });
  };

  const updateDetails = () => {
    const request = {
      userId: product.userId,
      userEmail: product.userEmail,
      userContact: product.userContact,
      productName,
      productDescription,
      category,
      price,
      totalQuantity,
      imageURL: imageURLs,
      id: product.id
    };
    axios
      .post(API_BASE_PATH + `/item/update`, request, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        dispatch(updateProduct(res.data));
      });
  }

  return (
    <div className="flex gap-2">
      <div className="w-1/3 grow flex flex-col gap-2">
        <img
          src={imageToDisplay}
          alt="Image"
          className="w-full h-160 object-cover rounded-md"
        />
        <div className="mt-2 grid grid-cols-7 gap-1 h-16">
          {imageURLs?.map((imgItm, index) => (
            <img
              onClick={() => changeImageToDisplay(index)}
              src={imgItm}
              alt="Image"
              className="w-16 h-16 rounded-md"
            />
          ))}
        </div>
        <input
          type="file"
          className="file:mr-5 file:py-1 file:px-3 file:border-[1px]
                file:text-xs file:font-medium
              file:bg-blue-500 file:text-white
                hover:file:cursor-pointer hover:file:bg-blue-700
              hover:file:text-white file:rounded-md file:h-10"
          onChange={(e) => onChangeHandler(e, IMAGE)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addImage}
        >
          Add Image
        </button>
      </div>
      <div className="bg-gray-500 w-0.5"></div>
      <div className="w-2/3 grow flex flex-col gap-1 p-2">
        <label>
          <h1 className="text-left text-xl">Product Name</h1>
          <input
            className="w-full border-2 border-gray-200 rounded-md h-10 outline-none focus:outline-none p-2"
            onChange={(e) => onChangeHandler(e, NAME)}
            defaultValue={productName}
          />
        </label>
        <label>
          <h1 className="text-left text-xl">Product Description</h1>
          <textarea
            className="w-full border-2 border-gray-200 rounded-md h-20  outline-none focus:outline-none p-2"
            onChange={(e) => onChangeHandler(e, DESCRIPTION)}
            defaultValue={productDescription}
          />
        </label>
        <label>
          <h1 className="text-left text-xl">Quantity</h1>
          <input
            type="number"
            className="w-full border-2 border-gray-200 rounded-md h-10 outline-none focus:outline-none p-2"
            onChange={(e) => onChangeHandler(e, QUANTITY)}
            defaultValue={totalQuantity}
          />
        </label>
        <label>
          <h1 className="text-left text-xl">Price</h1>
          <input
            type="number"
            className="w-full border-2 border-gray-200 rounded-md h-10 outline-none focus:outline-none p-2"
            onChange={(e) => onChangeHandler(e, PRICE)}
            defaultValue={price}
          />
        </label>
        <label>
          <h1 className="text-left text-xl">Category</h1>
          <select
            className="w-full border-2 border-gray-200 rounded-md h-10"
            onChange={(e) => onChangeHandler(e, CATEGORY)}
            defaultValue={{label:category?.toUpperCase(), value:category?.toUpperCase()}}
          >
            {OPTIONS.map((optionNm, index) => (
              <option key={index} selected={optionNm === category?.toUpperCase()}>{optionNm}</option>
            ))}
          </select>
        </label>
        <button
          className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={updateDetails}
        >
          Update Item
        </button>
      </div>
    </div>
  );
};

export default ProductEdit;
