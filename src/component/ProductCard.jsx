const ProductCard = ({product}) => {
    const image = product?.imageURL?.[0];
    const textDisplay = product?.productDescription?.slice(0, 80);
    const titleDisplay = product?.productName?.length > 20 ? product?.productName?.slice(0, 15)+"..." : product?.productName;
    return (
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <img className='w-full h-48 object-cover' src={image}/>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {titleDisplay}
        </h5>
        <p className="mb-3 font-normal text-gray-700">
          {textDisplay}{textDisplay && "..."}
        </p>
        <div className="flex gap-2">
          <p className="mb-3 font-normal text-gray-700">
            <bold>Price:</bold>
            {product?.price}
          </p>
          <p className="mb-3 font-normal text-gray-700">
            <bold>Quantity:</bold>
            {product?.totalQuantity}
          </p>
        </div>
      </div>
    );
}
export default ProductCard;