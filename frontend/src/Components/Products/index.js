import { useState, useEffect } from "react";
import ProductList from "./list";
import { getProductList, deleteProductAPI } from "../../api/products";
import { Link } from "react-router-dom";

function Products() {
  const [productData, setProductData] = useState({});
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setIsLoading(true);
    const res = await getProductList(search);
    if (res.status === 200) {
      setProductData(res.data);
    } else {
      alert(JSON.stringify(res.message));
    }
    setIsLoading(false);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleDelete = async (deleteUser) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const res = await deleteProductAPI(deleteUser);
      if (res.status === 200) {
        alert(JSON.stringify(res?.message));
        getList();
      }
      if (res.status === 400) {
        alert(JSON.stringify(res?.message));
      }
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Products</h2>
      <div className="mt-3">
        <div className="input-group row">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="Search name, email"
                aria-describedby="button-addon2"
                value={search}
                onChange={handleChange}
              />
              <button
                className="btn btn-outline-primary"
                type="button"
                id="button-addon2"
                onClick={(e) => {
                  e.preventDefault();
                  getList();
                }}
              >
                Search
              </button>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-row-reverse">
            <Link className="btn btn-primary " to="/products/add">
              Add Product
            </Link>
          </div>
        </div>
        {!isLoading && productData.rows && (
          <>
            <ProductList list={productData.rows} handleDelete={handleDelete} />
          </>
        )}
      </div>
    </div>
  );
}

export default Products;
