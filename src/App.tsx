import ProductCard from "./Components/ProductCard";
import Modal from "./Components/ui/Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { colors, formInputsList, productList } from "./data";
import Button from "./Components/ui/Button.tsx";
import Input from "./Components/ui/Input.tsx";
import { IProduct } from "./Interfaces/index.ts";
import { productValidation } from "./validation/index.ts";
import ErrorMassage from "./Components/ErrorMassage.tsx";
import CircleColor from "./Components/CircleColor.tsx";
import { v4 as uuid } from "uuid";
import Selector from "./Components/ui/Selector.tsx";


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
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProudectObj);
  const [tempColor, setTempColor] = useState<string[]>([]);
  console.log(tempColor);
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

  const onCancel = () => {
    setProduct(defaultProudectObj);
    close();
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
    setProducts((prev) => [
      ...prev,
      { ...product, id: uuid(), colors: tempColor },
    ]);
    setProduct(defaultProudectObj);
    setTempColor([]);
    close();
  };

  // ** Render Product List **/
  const renderProductList = products.map((product) => (
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

  /**render CircleColors */
  const renderCircleColor = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColor((prev) => [...prev, color]);
      }}
    />
  ));

  /**RenderTempColor */
  const renderTempColor = tempColor.map((item) => (
    <span
      className="block rounded my-1"
      style={{ backgroundColor: item }}
      key={item}
    >
      {item}
    </span>
  ));

  return (
    <main className="container">
      <Button
        className=" block text-white p-2  bg-indigo-700 rounded-md hover:bg-indigo-400 font-bold mx-auto my-10 "
        children="Build Product"
        onClick={open}
      />

      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      <Modal title="Add A New Product" close={close} isOpen={isOpen}>
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderInputFeilds}
          <Selector />
          <div className="flex flex-wrap items-center space-x-2 my-2">
            {renderTempColor}
          </div>
          <div className="flex items-center space-x-2 my-2">
            {renderCircleColor}
          </div>

          <div className="flex items-center space-x-3 ">
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
