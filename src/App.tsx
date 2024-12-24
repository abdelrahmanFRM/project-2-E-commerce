import ProductCard from "./Components/ProductCard";

function App() {
  return (
    <div>
      <div className=" bg-indigo-400 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}

export default App;
