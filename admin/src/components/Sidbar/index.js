import Button from "@mui/material/Button";
import { MdDashboard } from "react-icons/md";
import {
  FaAngleRight,
  FaProductHunt,
  FaFacebookMessenger,
  FaUser,
  FaTags,
} from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";
import SearchBox from "../SearchBox";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Sidbar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
  const { isMessenger, setIsMessenger, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const isOpenSubmenu = (index) => {
    setActiveTab(index);
    setIsToggleSubmenu(!isToggleSubmenu);
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <div className="searchbar w-100 mb-3">
              <SearchBox />
            </div>
          </li>

          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 0 ? "active" : ""}`}
                onClick={() => isOpenSubmenu(0)}
              >
                <span className="icon">
                  <MdDashboard />{" "}
                </span>
                Dashbord
                <span className="arrow">
                  {" "}
                  <FaAngleRight />
                </span>
              </Button>
            </Link>
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 1 ? "active" : ""}`}
              onClick={() => isOpenSubmenu(1)}
            >
              <span className="icon">
                <FaProductHunt />{" "}
              </span>
              Products
              <span className="arrow">
                {" "}
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWapper ${
                activeTab === 1 && isToggleSubmenu === true
                  ? "collapse"
                  : "collapsed"
              }`}
            >
              <ul className="submenu">
                <li>
                  <Link to="/product/list">Products List</Link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 1 ? "active" : ""}`}
              onClick={() => isOpenSubmenu(1)}
            >
              <span className="icon">
                <FaCartArrowDown />{" "}
              </span>
              Orders
              <span className="arrow">
                {" "}
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWapper ${
                activeTab === 1 && isToggleSubmenu === true
                  ? "collapse"
                  : "collapsed"
              }`}
            >
              <ul className="submenu">
                <li>
                  <Link to="/order/list">Order List</Link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 1 ? "active" : ""}`}
              onClick={() => isOpenSubmenu(1)}
            >
              <span className="icon">
                <FaUser />
              </span>
              Customer
              <span className="arrow">
                {" "}
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWapper ${
                activeTab === 1 && isToggleSubmenu === true
                  ? "collapse"
                  : "collapsed"
              }`}
            >
              <ul className="submenu">
                <li>
                  <Link to="/customer/list">Customer List</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Button
              className={`w-100 ${activeTab === 1 ? "active" : ""}`}
              onClick={() => isOpenSubmenu(1)}
            >
              <span className="icon">
                <FaTags />
              </span>
              Category
              <span className="arrow">
                {" "}
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWapper ${
                activeTab === 1 && isToggleSubmenu === true
                  ? "collapse"
                  : "collapsed"
              }`}
            >
              <ul className="submenu">
                <li>
                  <Link to="/category/list">Category List</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link to="/notification/list">
              {/*  onClick={()=>isOpenSubmenu(4)} */}
              <Button className={`w-100 ${activeTab === 4 ? "active" : ""}`}>
                <span className="icon">
                  <IoIosNotifications />{" "}
                </span>
                Notificarions
                <span className="arrow">
                  {" "}
                  <FaAngleRight />
                </span>
              </Button>
            </Link>
          </li>

          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 5 ? "active" : ""}`}
                onClick={() => setIsMessenger(!isMessenger)}
              >
                <span className="icon">
                  {" "}
                  <FaFacebookMessenger />
                </span>
                Messenger
                <span className="arrow">
                  {" "}
                  <FaAngleRight />{" "}
                </span>
              </Button>
            </Link>
          </li>

          <li>
            <Link to="/">
              <Button className={`w-100 ${activeTab === 6 ? "active" : ""}`}>
                <span className="icon">
                  <MdMarkEmailUnread />{" "}
                </span>
                Email
                <span className="arrow">
                  {" "}
                  <FaAngleRight />
                </span>
              </Button>
            </Link>
          </li>
        </ul>

        <div className="logoutWrapper">
          <div className="logoutBox">
            <Button variant="contained" onClick={handleLogout}>
              <IoLogOutOutline />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidbar;
