import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * A component that scrolls the window to the top of the page on route changes.
 * @returns {null} This component does not render anything.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;