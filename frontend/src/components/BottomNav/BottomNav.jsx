import styles from "./BottomNav.module.css";
import { Link, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";
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
  const { user } = useAuth();

  const profilePath = `/profile/${user?.id}`;

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
      <Link to={profilePath} className={styles.bottomNavLink}>
        {path === profilePath ? <IoPersonCircle /> : <CgProfile />}
      </Link>
    </nav>
  );
}
