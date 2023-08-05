"use client";
import Link from "next/link";
import varibles from "../app/varibles.module.scss";

const Navbar = () => {
  return (
    <nav className={varibles.nav}>
      <div className={varibles.navbar}>
        <span className={varibles.logo}>
          <Link className={varibles.link} href={"/"}>
            Next-ToDo
          </Link>
        </span>
        <span className={varibles.btn}>
          <Link className={varibles.link} href={"/addTask"}>
            Add Task
          </Link>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
