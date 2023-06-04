import React from "react";
import styles from "./Body.module.css";

import { Link } from "react-router-dom";

const Body = ({ setActiveColor, colors, activeColor }) => {
  const handleColorClick = (item) => {
    setActiveColor(item);
    console.log(item);
  };

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Resume-Craftr</p>
      <Link className={styles.btn} to="/editor">
        Create New Resume
      </Link>
      <div className={styles.toolbar}>
        <div className={styles.colors}>
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={styles.color}
              onClick={handleColorClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
