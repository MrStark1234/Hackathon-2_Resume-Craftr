import React from "react";
import styles from "./Header.module.css";
import resumesvg from "../../assets/resume.svg";
import { Link } from "react-router-dom";

const Headerr = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.contain}>
          <Link className={styles.btn} to="/about">
            About
          </Link>
        </div>
        <div className={styles.left}>
          <p className={styles.heading}>
            <span>Resume-Craftr</span>
          </p>
          <p className={styles.heading}>
            Helps to build your own resume. <span>For free</span>
          </p>
        </div>
        <div className={styles.right}>
          <img src={resumesvg} alt="Resume" />
        </div>
      </div>
    </>
  );
};

export default Headerr;
