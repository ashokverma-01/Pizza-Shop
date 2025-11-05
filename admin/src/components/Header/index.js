import "../../App.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/image/logo.jpg";
import Button from "@mui/material/Button";
import { MdMenuOpen } from "react-icons/md";
import SearchBox from "../SearchBox";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import { FaBarsStaggered } from "react-icons/fa6";
import AppContext from "../../context/AppContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import { FaShieldAlt } from "react-icons/fa";
import UserAvatarImg from "../UserAvatarImg/indix";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const openMyAcc = Boolean(anchorEl);
  const openNotification = Boolean(notificationAnchorEl);
  const {
    isLogin,
    logout,
    user,
    isToggleSidebar,
    setIsToggleSidebar,
    themeMode,
    setThemeMode,
    notifications,
    markAsRead,
    unreadCount,
  } = useContext(AppContext);

  const handleCloseNotificationsDrop = () => {
    setNotificationAnchorEl(null);
    navigate("/notification/list");
  };
  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };

  const handleToggleNotificationsDrop = (event) => {
    if (notificationAnchorEl) setNotificationAnchorEl(null);
    else setNotificationAnchorEl(event.currentTarget);
  };

  const handleToggleMyAccDrop = (event) => {
    //close --> null --> false
    if (anchorEl) setAnchorEl(null);
    else setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="d-flex align-items-center">
      <div className="container-fluid w-100">
        <div className="row align-items-center w-100 ">
          {/* Logo */}
          <div className="part1">
            <Link
              to="/"
              className="d-flex align-items-center logo text-decoration-none px-3"
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />

              <span className="ms-3 mt-2 fw-bold text-dark">Pizza Shop</span>
            </Link>
          </div>

          {/* Menu Button */}
          <div className="part2 align-items-center">
            <Button
              className="rounded-circle"
              onClick={() => setIsToggleSidebar((prev) => !prev)}
            >
              {isToggleSidebar ? <FaBarsStaggered /> : <MdMenuOpen />}
            </Button>

            <SearchBox className="searchBox"></SearchBox>
          </div>

          <div className="part3 d-flex align-items-center justify-content-right">
            <div className="part03 align-items-center gap-2">
              <Button
                className="rounded-circle mr-3"
                onClick={() => setThemeMode(!themeMode)}
              >
                {" "}
                <MdOutlineLightMode />
              </Button>

              <Button className="rounded-circle mr-3">
                {" "}
                <MdOutlineEmail />{" "}
              </Button>

              <div className="dropdoenWrapper position-relative">
                <Button
                  className="rounded-circle position-relative"
                  onClick={handleToggleNotificationsDrop}
                >
                  <FaRegBell size={20} />

                  {/* Unread count badge */}
                  {unreadCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {unreadCount}
                    </span>
                  )}
                </Button>
                <Menu
                  anchorEl={notificationAnchorEl}
                  open={openNotification}
                  onClose={handleCloseNotificationsDrop}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  PaperProps={{
                    sx: {
                      width: { xs: 300, sm: 350 }, // responsive width
                      maxHeight: 400,
                    },
                  }}
                >
                  {/* Header */}
                  <div
                    className="head pb-1 px-3"
                    style={{ borderBottom: "1px solid #eee" }}
                  >
                    <h6 style={{ margin: 0 }}>
                      {notifications.length > 0
                        ? `${unreadCount} Unread`
                        : "No Notifications"}
                    </h6>
                  </div>

                  {/* Notification list */}
                  <div style={{ maxHeight: "350px", overflowY: "auto" }}>
                    {notifications.filter((n) => !n.isRead).length === 0 && (
                      <p className="p-3 text-center m-0">
                        No unread notifications
                      </p>
                    )}

                    {notifications
                      .filter((n) => !n.isRead) // Only unread
                      .map((n) => (
                        <MenuItem
                          key={n._id}
                          className="py-2"
                          onClick={() => {
                            markAsRead(n._id);
                            handleCloseNotificationsDrop();
                          }}
                        >
                          <div className="row g-2 align-items-start">
                            {/* Avatar + Username */}
                            <div className="col-auto d-flex align-items-center">
                              <div
                                className="d-flex justify-content-center align-items-center rounded-circle fw-bold border overflow-hidden"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  backgroundColor: "var(--bs-body-bg)",
                                  borderColor: "var(--bs-border-color)",
                                }}
                              >
                                {n.user?.imageUrl ? (
                                  <img
                                    src={n.user?.imageUrl}
                                    alt={n.user?.username || "User"}
                                    className="w-100 h-100 rounded-circle object-fit-cover"
                                  />
                                ) : (
                                  <span className="fs-6 text-dark">
                                    {n.user?.username
                                      ? n.user?.username.charAt(0).toUpperCase()
                                      : "U"}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Username + Message */}
                            <div className="col d-flex flex-column">
                              <span
                                className="fw-bold text-truncate"
                                title={n.user?.username}
                              >
                                {n.user?.username || "No Name"}
                              </span>

                              <span
                                className="text-wrap"
                                style={{ wordBreak: "break-word" }}
                              >
                                {n.message}
                              </span>

                              {/* Rating stars */}
                              {n.rating !== undefined && (
                                <div className="mt-1">
                                  {Array.from({ length: n.rating }).map(
                                    (_, i) => (
                                      <span key={i} className="text-warning">
                                        ★
                                      </span>
                                    )
                                  )}
                                  {Array.from({ length: 5 - n.rating }).map(
                                    (_, i) => (
                                      <span key={i} className="text-secondary">
                                        ★
                                      </span>
                                    )
                                  )}
                                </div>
                              )}

                              {/* Date */}
                              <small className="text-muted">
                                {new Date(n.createdAt).toLocaleString()}
                              </small>
                            </div>
                          </div>
                        </MenuItem>
                      ))}
                  </div>

                  {/* View all button */}
                  <div className="px-3 py-2">
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleCloseNotificationsDrop}
                      sx={{ textTransform: "none" }}
                    >
                      View All Notifications
                    </Button>
                  </div>
                </Menu>
              </div>
            </div>

            {isLogin !== true ? (
              <Link to={"/login"}>
                <Button className="btn-blue btn-lg btn-round Sing_in">
                  Sign In
                </Button>
              </Link>
            ) : (
              <div
                className="myAccWraooer d-flex"
                onClick={handleToggleMyAccDrop}
              >
                <Button
                  className="myAcc d-flex align-items-center justify-content-center"
                  style={{ padding: "6px 10px", gap: "8px" }}
                >
                  {user?.imageUrl ? (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "2px solid #007bff",
                        backgroundColor: "#f0f5ff",
                      }}
                    >
                      <img
                        src={`${user.imageUrl}?v=${user._id}`}
                        alt="User Avatar"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(240, 245, 255)",
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "18px",
                        textTransform: "uppercase",
                      }}
                    >
                      {user?.username?.charAt(0) || "U"}
                    </div>
                  )}

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={openMyAcc}
                    onClose={handleCloseMyAccDrop}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        handleCloseMyAccDrop();
                        navigate(`/customer/details/${user?._id}`);
                      }}
                    >
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      My account
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCloseMyAccDrop();
                        navigate("/forgot-password");
                      }}
                    >
                      <ListItemIcon>
                        <FaShieldAlt />
                      </ListItemIcon>
                      Reset Password
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                      <ListItemIcon>
                        <Logout fontSize="small" sx={{ color: "red" }} />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
