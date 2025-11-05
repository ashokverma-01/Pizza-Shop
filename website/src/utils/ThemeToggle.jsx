import React, { useContext } from "react";
import AppContext from "../Context/AppContext";
import { MdOutlineLightMode } from "react-icons/md";
import Button from "@mui/material/Button";

export default function ThemeToggle() {
  const { themeMode, setThemeMode } = useContext(AppContext);

  return (
    <Button
      className="rounded-circle mr-3"
      onClick={() => setThemeMode(!themeMode)}
    >
      {" "}
      <MdOutlineLightMode size={25} />
    </Button>
  );
}
