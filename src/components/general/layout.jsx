import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Cross1Icon, DragHandleHorizontalIcon } from "@radix-ui/react-icons";

export default function Layout() {
  const [close, setClose] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (width <= 768) return setIsMobileScreen(true);
    return setIsMobileScreen(false);
  }, [width]);

  const handleClick = () => {
    if (isMobileScreen) setClose(!close);
  };

  const handleClickOutside = (e) => {
    if (
      isMobileScreen &&
      navRef.current &&
      !navRef.current.contains(e.target) &&
      close
    ) {
      setClose(false);
      console.log("clicked outside");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileScreen) return setClose(false);
    return setClose(true);
  }, [isMobileScreen]);

  return (
    <div className="flex w-screen b min-h-screen">
      <span
        className="text-2xl absolute top-0 right-0 md:hidden flex"
        onClick={handleClick}
      >
        {close ? (
          <Cross1Icon color="black" width={50} height={50} />
        ) : (
          <DragHandleHorizontalIcon color="black" width={50} height={50} />
        )}
      </span>
      {close && (
        <div
          className={`md:w-1/4 w-3/4 md:static fixed bg-slate-700 z-20`}
          ref={navRef}
        >
          <Sidebar />
        </div>
      )}
      <Outlet />
    </div>
  );
}