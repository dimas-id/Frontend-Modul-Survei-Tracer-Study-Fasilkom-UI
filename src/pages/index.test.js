import React from "react";
import { shallow } from "enzyme";
import Pages from "./index";

it("renders without crashing", () => {
  shallow(<Pages />);
});
