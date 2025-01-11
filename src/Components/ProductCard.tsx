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
    <CircleColor color={color} />
  ));

  return (
    <div className="max-w-sm md:max-w-lg mx-auto border p-2  m-2 md:mx-0 rounded-lg bg-slate-300  ">
      <Image
        alt="Product Name"
        className="rounded-md object-cover"
        imageUrl={imageURL}
      />
      <h3 className="font-medium">{title}</h3>
      <p className="overflow-hidden">{txtSlicer(description)}</p>
      <div className="flex items-center space-x-2 my-2">
        {renderCircleColor}
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-xl">{price}$</h3>

        <Image
          imageUrl={category.imageURL}
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          alt={category.name}
        />
      </div>

      <div className="flex items-center justify-around  mt-3 space-x-2 ">
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
