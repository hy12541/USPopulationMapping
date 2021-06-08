import React, { Component } from "react";

import US from "./usmap";
import DropDowns from "./dropDowns";
import DropDown from "./dropDown";
import US1 from "./usmap1";

class Map extends Component {
  render() {
    return (
      <div>
        <br></br>
        {/* <DropDowns></DropDowns> */}

        <US1></US1>
      </div>
    );
  }
}

export default Map;
