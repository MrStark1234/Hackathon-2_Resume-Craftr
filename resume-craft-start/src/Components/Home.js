import React from "react";
import Headerr from "./Header/Headerr";
import Body from "./Body/Body";

const Home = (props) => {
  return (
    <div>
      <Headerr />
      <Body
        colors={props.colors}
        setActiveColor={props.setActiveColor}
        activeColor={props.activeColor}
      />
    </div>
  );
};

export default Home;
