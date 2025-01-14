import ProductCard from "./Components/ProductCard";
import Modal from "./Components/ui/Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./Components/ui/Button.tsx";
import Input from "./Components/ui/Input.tsx";
import { IProduct } from "./Interfaces/index.ts";
import { productValidation } from "./validation/index.ts";
import ErrorMassage from "./Components/ErrorMassage.tsx";
import CircleColor from "./Components/CircleColor.tsx";
import { v4 as uuid } from "uuid";
import Selector from "./Components/ui/Selector.tsx";
import { TProductNames } from "./Types/index.ts";
import toast, { Toaster } from 'react-hot-toast';


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
  const [product, setProduct] = useState<IProduct>(defaultProudectObj);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProudectObj)
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0)
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
 

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  /*------- Handler ----------*/
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true)
  const closeConfirmModal = () => setIsOpenConfirmModal(false)
  const openEditModal = () => setIsOpenEdit(true);
  const closeEditModal = () => setIsOpenEdit(false);
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

 
  // onChange Handler for Edit ////

   const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onCancel = () => {
    setProductToEdit(defaultProudectObj);
    close();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price,} = product;
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
      
      { ...product, id: uuid(), colors: tempColor ,category:selectedCategory },...prev
    ]);
    setProduct(defaultProudectObj);
    setTempColor([]);
    close();
  };


  /**submitEditHandler */
  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price,} = productToEdit;
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
    const updateProduct = [...products];
    updateProduct[productToEditIdx] = {...productToEdit , colors: tempColor.concat(productToEdit.colors)}; 
setProducts(updateProduct);

    setProductToEdit(defaultProudectObj)
setTempColor([]);
   closeEditModal();
  };

  // ** Render Product List **/
  const renderProductList = products.map((product,idx) => (
    <ProductCard key={product.id} product={product} setProductToEdit={setProductToEdit} openEditModal={openEditModal} idx={idx} setProductToEditIdx={setProductToEditIdx} openConfirmModal={openConfirmModal} />
  ));
  /**Remove Product From ProductList */
  const renderProductsAfterRemove = () => {
    console.log(productToEdit.id)
    const filtered = products.filter((product) => product.id !== productToEdit.id)
    setProducts(filtered);
    closeConfirmModal();
    toast('the product Deleted Succsseful.', {
      duration: 4000,
      position: 'top-center',

      // Styling
      style: {
        border: '1px solid #713200',
      padding: '16px',
        color: "white",
        backgroundColor: "black",
      font:"bold"
      },
      className: 'rounded',

      // Custom Icon
      icon: '👏',
    })
  }


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
        if (productToEdit.colors.includes(color)) {
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

  /**Render product Edit With Errors */
  const renderProductToEditWithErrore = (name:TProductNames, label :string) => {

    return (
      <div className="flex flex-col">
           <label htmlFor={name} className="mb-1">
{label}      </label>
      <Input
        type={"title"}
        id={name}
        name={name}
        value={productToEdit[name]}
        onChange={onChangeEditHandler}
            />
            <ErrorMassage msg={errors[name]} />
          </div>)
  }

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
      {/* ADD Product Modal */}
      <Modal title="Add A New Product" close={close} isOpen={isOpen}>
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderInputFeilds}
          <Selector selected={selectedCategory} setSelected={setSelectedCategory} />
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
{/* Edit Product Modal */}
       <Modal title="Edit This Product" close={closeEditModal} isOpen={isOpenEdit}>
        <form className="space-y-3" onSubmit={submitEditHandler}>
          
          {renderProductToEditWithErrore("title","Product Title")}
          {renderProductToEditWithErrore("description" , "Product Description")}
          {renderProductToEditWithErrore("imageURL","Product Image")}
          {renderProductToEditWithErrore("price", "product Price")}


          <Selector selected={productToEdit.category} setSelected={(value)=>setProductToEdit({...productToEdit , category:value})} />
          <div className="flex flex-wrap items-center space-x-2 my-2">
            {tempColor.concat(productToEdit.colors).map((item) => (
    <span
      className="block rounded my-1"
      style={{ backgroundColor: item }}
      key={item}
    >
      {item}
    </span>
  ))}
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
              onClick={closeEditModal}
            />
          </div>
        </form>
      </Modal>

{/* Remove Product Modal */}
      <Modal
      close={closeConfirmModal} isOpen={isOpenConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action." >
        <div className="flex items-center space-x-3">
          <Button className="text-white p-2  bg-red-700 rounded-md w-full" onClick={renderProductsAfterRemove}>
            Yes, remove
          </Button>
          <Button type="button" className="text-white p-2  bg-gray-500 rounded-md w-full" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Modal>
<Toaster/>
    </main>
  );
}

export default App;
