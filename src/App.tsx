import ProductCard from "./Components/ProductCard";
import Modal from "./Components/ui/Modal";
import { useState } from "react";
import { productList } from "./data";
import Button from "./Components/ui/Button.tsx";

function App() {
  /* state*/
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  // ** Render Product List **//
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
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
        <div className="flex items-center space-x-2">
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
      </Modal>
    </main>
  );
}

export default App;
