import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { API_BASE_PATH } from "../Constants";
import ProductPage from '../component/ProductPage';

const ProductDetails = () => {
    const [productToDisplay, setProductToDisplay] = useState(null);
    const product = useSelector((state) => state.productReducer.products);
    const params = useParams();
    useEffect(() => {
        if (product?.length) {
            const productDs = product.filter(p => p.id === params.id)[0];
            setProductToDisplay(productDs);
        }else {
            const token = localStorage.getItem("token");
            axios.get(API_BASE_PATH + `/item/get/${params.id}`, {
              headers: {
                Authorization: "Bearer " + token,
              },
            }).then(res => setProductToDisplay(res.data));
        }
    }, [])
    console.log(productToDisplay);

    return (
      <div className="m-10 bg-white border-solid border-cyan-950 rounded-lg text-gray-900">
        <ProductPage product={productToDisplay} />
      </div>
    );
}

export default ProductDetails;