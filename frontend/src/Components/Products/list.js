import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ProductList = ({ list, handleDelete }) => {
	return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Profile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((val, index) => (
            <Fragment key={index}>
              <tr>
                <td scope="row">{val.product_name ?? "-"}</td>
                <td>{val.description ?? "-"}</td>
                <td>{val.profile ?? "-"}</td>
                <td>
                  <Link
                    to={`/users/edit/${val._id}`}
                    className="btn btn-sm btn-warning mx-1"
                  >
                    Edit
                  </Link>
                  <button
					onClick={(e) => {
						e.preventDefault();
						handleDelete(val._id)
					}}
                    className="btn btn-sm btn-danger mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;
