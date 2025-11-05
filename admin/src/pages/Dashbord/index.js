import { useState, useEffect, useContext } from "react";
import DashbordBox from "./components/DashbordBox";
import { FaUserCircle } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
import { BsStars, BsBellFill } from "react-icons/bs";
import { BiTrendingUp, BiTrendingDown, BiCategory } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import { IoTimerOutline } from "react-icons/io5";
import { Button, Menu, MenuItem } from "@mui/material";
import { Chart } from "react-google-charts";
import logo from "../../assets/image/logo.jpg";
import AppContext from "../../context/AppContext";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 9],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  backgroundColor: "transparent",
  chartArea: { width: "100%", height: "80%" },
};

const Dashbord = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  const {
    setIsHideSidebarAndHeader,
    users,
    notifications,
    products,
    categories,
  } = useContext(AppContext);

  useEffect(() => {
    setIsHideSidebarAndHeader(false);
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    document.title = "Pizza Admin";

    const favicon = document.querySelector("link[rel='icon']");
    // if (favicon) {
    favicon.href = logo;
    // }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const totalUsers = users?.length || 0;
  const totalProducts = products?.length || 0;
  const totalNotification = notifications?.length || 0;
  const totalCategories = categories?.length || 0;
  const totalReviews = products.reduce(
    (acc, item) => acc + (item.numReviews || item.reviews?.length || 0),
    0
  );

  return (
    <>
      <div className="right-content w-100">
        <div className="row dashbordBoxWrapperRow">
          <div className="col-md-7">
            <div className="dashbordBoxWrapper d-flex">
              <DashbordBox
                text={["Total User", `${totalUsers}`, "95%"]}
                color={["#1da256", "#48d483"]}
                icon={<FaUserCircle />}
                back={<BiTrendingUp />}
              />
              <DashbordBox
                text={["Total Oraders", "338", "30%"]}
                color={["#c012e2", "#eb64fe"]}
                icon={<IoIosCart />}
                back={<BiTrendingDown />}
              />
              <DashbordBox
                text={["Total Products", `${totalProducts}`, "25%"]}
                color={["#2c78e5", "#60aff5"]}
                icon={<MdShoppingBag />}
                back={<BiTrendingDown />}
              />
              <DashbordBox
                text={["Total Reviews", `${totalReviews}`, "45%"]}
                color={["#e1950e", "#f3cd29"]}
                icon={<BsStars />}
                back={<BiTrendingUp />}
              />
              <DashbordBox
                text={["Total Notification", `${totalNotification}`, "45%"]}
                color={["#ff5f6d", "#ffc371"]}
                icon={<BsBellFill />}
                back={<BiTrendingUp />}
              />

              <DashbordBox
                text={["Total Category", `${totalCategories}`, "95%"]}
                color={["#27F5EB", "#33D6CE"]}
                icon={<BiCategory />}
                back={<BiTrendingUp />}
              />
            </div>
          </div>

          <div className="col-md-5 pl-0">
            <div className="box graphBox">
              <div className="d-flex align-item-center w-100 bottomEle">
                <h4>Total Sales</h4>

                <div className="ml-auto">
                  <Button className="ml-auto toggleIcon" onClick={handleClick}>
                    <HiDotsVertical />
                  </Button>

                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <IoTimerOutline className="me-1" /> Last Day
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoTimerOutline className="me-1" /> Last Week
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoTimerOutline className="me-1" /> Last Month
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoTimerOutline className="me-1" /> Last Year
                    </MenuItem>
                  </Menu>
                </div>
              </div>
              <h3 className="text-white font-weight-bold"> $465,768,798</h3>
              <p>$3,458,23 in last month</p>

              <Chart
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                width="100%"
                height="180px"
                data={data}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashbord;
