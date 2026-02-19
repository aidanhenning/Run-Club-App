import React from "react";
import styles from "./BottomNav.module.css";
import { Link, useLocation } from "react-router";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { IoSearchCircleOutline } from "react-icons/io5";
import { IoSearchCircle } from "react-icons/io5";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { HiMiniRectangleGroup } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { IoPersonCircle } from "react-icons/io5";

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className={styles.bottomNav}>
      <Link to="/home" className={styles.bottomNavLink}>
        {path === "/home" ? <GoHomeFill /> : <GoHome />}
      </Link>
      <Link to="/search" className={styles.bottomNavLink}>
        {path === "/search" ? <IoSearchCircle /> : <IoSearchCircleOutline />}
      </Link>
      <Link to="/clubs" className={styles.bottomNavLink}>
        {path === "/clubs" ? (
          <HiMiniRectangleGroup />
        ) : (
          <HiOutlineRectangleGroup />
        )}
      </Link>
      <Link to="/profile" className={styles.bottomNavLink}>
        {path === "/profile" ? <IoPersonCircle /> : <CgProfile />}
      </Link>
    </nav>
  );
}
