import { Link } from "react-router-dom";
import { useAxios } from "../hook/useAxios";
import { setAll as setAllProducts } from "../store/reducers/productSlice";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { data: products, error: productsError } = useAxios("http://localhost:3000/products", {
    selector: "products",
    reduxSelector: (state) => state.product.all,
    reduxAction: setAllProducts,
  });

  if (productsError) {
    return (
      <>
        <h1>{productsError}</h1>
      </>
    );
  }

  return (
    <>
      <div className="flex gap-6 flex-row justify-center mt-6">
        {
            products && products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))
        }
      </div>
    </>
  );
};

export default Home;
