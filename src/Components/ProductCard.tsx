// interface Iprops {}

import Button from "./Button";
import Image from "./Image";

const ProductCard = () => {
  return (
    <div className="border p-2  m-3 rounded-lg bg-slate-300">
      <Image
        alt="Product Name"
        className="rounded-md"
        imageUrl="https://th.bing.com/th/id/OIP.f6ved8wranJjaO8g0qDStgHaEK?rs=1&pid=ImgDetMain"
      />
      <h3 className="font-medium">Audi Car R8 2025...</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea tempore
        illum exercitationem architecto nulla rem eos harum repellat fuga...
      </p>
      <div className="flex items-center space-x-2 my-2">
        <span className="w-5 h-5 rounded-full bg-yellow-700 cursor-pointer" />
        <span className="w-5 h-5 rounded-full bg-red-700 cursor-pointer" />
        <span className="w-5 h-5 rounded-full bg-indigo-700 cursor-pointer" />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-xl">$500,000</h3>

        <Image
          imageUrl="https://th.bing.com/th/id/OIP.f6ved8wranJjaO8g0qDStgHaEK?rs=1&pid=ImgDetMain"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          alt="Category Car"
        />
      </div>

      <div className="flex items-center justify-around  mt-3 space-x-2">
        <Button
          className="text-white p-2 bg-indigo-700 rounded-md w-full"
          children="EDIT"
        />
        <Button
          className="text-white p-2  bg-red-700 rounded-md w-full"
          children="DELETE"
        />
      </div>
    </div>
  );
};

export default ProductCard;
