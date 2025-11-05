import { useNavigate } from "react-router-dom";

const BackButton = (fallbackPath = "/") => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1); // previous page pe jao
    } else {
      navigate(fallbackPath); // fallback page
    }
  };

  return handleBack;
};

export default BackButton;
