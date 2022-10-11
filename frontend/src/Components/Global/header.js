import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../store/actions/index";
import { logOutAPI } from "../../api/login";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState("");
  const user = useSelector((state) => state.userDetails);

  useEffect(() => {
    const localData = localStorage.getItem("accessToken") ?? "";
    setUserData(localData);
  }, [userData]);

  const logoutHandler = async () => {
    try {
      const res = await logOutAPI();
      if (res.status === 200) {
        dispatch(loginAction(""));
        alert(JSON.stringify(res.message));
        setUserData("");
        navigate("/login");
      }
      if (res.status === 400) {
        alert(res?.message ?? "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Practical
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {user && user.token !== "" ? (
                <>
                  <li className="nav-item">
                    <Link
                      to="/dashboard"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/users"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/products"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/metamask"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Metamask
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
              )}
            </ul>
            <div className="d-flex">
              {user && user.token !== "" ? (
                <>
                  <a
                    href="/"
                    className="nav-link mx-3"
                    onClick={(e) => {
                      e.preventDefault();
                      logoutHandler();
                    }}
                  >
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link mx-1">
                    Login
                  </Link>
                  <Link to="/register" className="nav-link mx-1">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
