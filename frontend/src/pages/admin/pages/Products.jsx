import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProduct } from "../features/products/productSlice";

function Products() {
  const products = useSelector(state => state.products.list);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>

      <button
        onClick={() =>
          dispatch(addProduct({ id: Date.now(), name: "New Product" }))
        }
      >
        Add Product
      </button>

      {products.map(p => (
        <div key={p.id}>
          {p.name}
          <button onClick={() => dispatch(deleteProduct(p.id))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;