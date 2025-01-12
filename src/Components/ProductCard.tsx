import { IProduct } from "../Interfaces";
import { txtSlicer } from "../utilits/funcations";
import Button from "./ui/Button";
import Image from "./Image";
import CircleColor from "./CircleColor";

interface Iprops {
  product: IProduct;
}
const ProductCard = ({ product }: Iprops) => {
  const { imageURL, description, title, price, category, colors } = product;

  /**render CircleColors */
  const renderCircleColor = colors.map((color) => (
    <CircleColor color={color} key={color} />
  ));

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
      <Image
        imageUrl={imageURL}
        alt={"Product Name"}
        className="rounded-md h-52 w-full lg:object-cover"
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 break-words">
        {txtSlicer(description)}
      </p>
      <div className="flex items-center flex-wrap space-x-1">
        {renderCircleColor}
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-xl">{price}$</h3>

        <Image
          imageUrl={category.imageURL}
          className="w-10 h-10 rounded-full object-bottom"
          alt={category.name}
        />
      </div>

      <div className="flex items-center justify-between space-x-2 ">
        <Button
          className="text-white p-2 bg-indigo-700 rounded-md w-full"
          children="EDIT"
        />
        <Button
          className="text-white p-2  bg-red-700 rounded-md w-full "
          children="DELETE"
        />
      </div>
    </div>
  );
};

export default ProductCard;
