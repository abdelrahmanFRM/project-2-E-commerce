import ProductCard from "./Components/ProductCard";
import Modal from "./Components/ui/Modal";
import { ChangeEvent, useState } from "react";
import { formInputsList, productList } from "./data";
import Button from "./Components/ui/Button.tsx";
import Input from "./Components/ui/Input.tsx";
import { IProduct } from "./Interfaces/index.ts";

function App() {
  /* state*/
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  });

  /*------- Handler ----------*/
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // ** Render Product List **/
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  /**renderInputsFeilds */
  const renderInputFeilds = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-1">
        {input.label}
      </label>
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
    </div>
  ));

  return (
    <main className="container">
      <Button
        className="text-white p-2 my-4 bg-indigo-700 rounded-md w-full "
        children="ADD"
        onClick={open}
      />

      <div className=" bg-indigo-400 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {renderProductList}
      </div>
      <Modal title="Add A New Product" close={close} isOpen={isOpen}>
        <form className="space-y-3">
          {renderInputFeilds}
          <div className="flex items-center space-x-3">
            <Button
              className="text-white p-2  bg-indigo-700 rounded-md w-full "
              children="Submit"
            />
            <Button
              className="text-white p-2  bg-red-700 rounded-md w-full "
              children="Cancel"
              onClick={close}
            />
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
