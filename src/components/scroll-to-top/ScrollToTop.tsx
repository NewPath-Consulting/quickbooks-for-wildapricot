import {useLocation} from "react-router-dom";
import {useEffect} from "react";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    const contentArea = document.querySelector(".content-area");
    if (contentArea) {
      contentArea.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null; // This component doesn't render anything
};