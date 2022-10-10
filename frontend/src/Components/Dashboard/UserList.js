import React, { Fragment } from "react";

const UserList = ({ list }) => {
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {list.map((val, index) => (
            <Fragment key={index}>
              <tr>
                <th scope="row">{index}</th>
                <td>{val.full_name ?? "-"}</td>
                <td>{val.email ?? "-"}</td>
                <td>{val.profile ?? "-"}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
