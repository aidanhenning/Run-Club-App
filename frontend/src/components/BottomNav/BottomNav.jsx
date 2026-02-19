import React from "react";
import styles from "./BottomNav.module.css";
import { Link } from "react-router";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { IoSearchCircleOutline } from "react-icons/io5";
import { IoSearchCircle } from "react-icons/io5";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { HiMiniRectangleGroup } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { IoPersonCircle } from "react-icons/io5";

export default function BottomNav() {
  return (
    <nav className={styles.bottomNav}>
      <Link to="/home" className={styles.bottomNavLink}>
        <GoHome />
        <GoHomeFill />
      </Link>
      <Link to="/search" className={styles.bottomNavLink}>
        <IoSearchCircleOutline />
        <IoSearchCircle />
      </Link>
      <Link to="/clubs" className={styles.bottomNavLink}>
        <HiOutlineRectangleGroup />
        <HiMiniRectangleGroup />
      </Link>
      <Link to="/profile" className={styles.bottomNavLink}>
        <CgProfile />
        <IoPersonCircle />
      </Link>
    </nav>
  );
}
