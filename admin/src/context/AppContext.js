import { createContext } from "react";

const AppContext = createContext({
  isLogin: false,
  setIsLogin: () => {},
  isToggleSidebar: false,
  setIsToggleSidebar: () => {},
  isHideSidebarAndHeader: false,
  setIsHideSidebarAndHeader: () => {},
});

export default AppContext;
