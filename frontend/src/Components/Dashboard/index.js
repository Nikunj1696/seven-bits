import { useState, useEffect } from "react";
import UserList from "./UserList";
import { getUserList } from "../../api/users";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setIsLoading(true);
    const res = await getUserList(search);
    if (res.status === 200) {
      setUserData(res.data);
    } else {
      alert(JSON.stringify(res.message));
    }
    setIsLoading(false);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <>
      <div className="container">
        <h2 className="text-center">Dashboard</h2>
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Total Users</h5>
            <h4>{userData && userData.count}</h4>
          </div>
        </div>
        <div className="mt-3">
          <h3>Latest users</h3>
          <div className="input-group row">
            <div className="col-md-6">
              <div className="input-group mb-3">
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
          </div>
          {!isLoading && userData.rows && <UserList list={userData.rows} />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
