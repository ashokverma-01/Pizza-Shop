import { useContext } from "react";
import Header from "../Header/index";
import Sidbar from "../Sidbar/index";
import Messenger from "../../pages/Messenger/index";
import AppContext from "../../context/AppContext";

const Layout = ({ children }) => {
  const { isHideSidebarAndHeader, isToggleSidebar, isMessenger } =
    useContext(AppContext);

  return (
    <>
      {/* Header */}
      {!isHideSidebarAndHeader && <Header />}

      <div className="main d-flex">
        {/* Sidebar */}
        {!isHideSidebarAndHeader && (
          <div className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""}`}>
            <Sidbar />
          </div>
        )}

        {/* Messenger */}
        {isMessenger && (
          <div
            className={`MessengerWrapper ${isToggleSidebar ? "toggle" : ""}`}
          >
            <Messenger />
          </div>
        )}

        {/* Main content */}
        <div
          className={`content ${isHideSidebarAndHeader ? "full" : ""} ${
            isToggleSidebar ? "toggle" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
