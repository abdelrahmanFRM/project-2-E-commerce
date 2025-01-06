import ProductCard from "./Components/ProductCard";
import Modal from "./Components/ui/Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { formInputsList, productList } from "./data";
import Button from "./Components/ui/Button.tsx";
import Input from "./Components/ui/Input.tsx";
import { IProduct } from "./Interfaces/index.ts";
import { productValidation } from "./validation/index.ts";
import Errors from "./Components/ErrorMassage.tsx";
import ErrorMassage from "./Components/ErrorMassage.tsx";

function App() {
  const defaultProudectObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  /* state*/
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProudectObj);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
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
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    console.log(hasErrorMsg);
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    console.log("send your data to your server");
  };

  const onCancel = () => {
    setProduct(defaultProudectObj);
    close();
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
      <ErrorMassage msg={errors[input.name]} />
    </div>
  ));

  return (
    <main className="container">
      <Button
        className="text-white p-2 my-4 bg-indigo-700 rounded-md w-full font-bold "
        children="Build Product"
        onClick={open}
      />

      <div className=" bg-indigo-400 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {renderProductList}
      </div>
      <Modal title="Add A New Product" close={close} isOpen={isOpen}>
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderInputFeilds}
          <div className="flex items-center space-x-3">
            <Button
              className="text-white p-2  bg-indigo-700 rounded-md w-full "
              children="Submit"
            />
            <Button
              className="text-white p-2  bg-red-700 rounded-md w-full "
              children="Cancel"
              onClick={onCancel}
            />
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
