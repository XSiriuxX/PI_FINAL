import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { configure, shallow } from "enzyme";


import New from "../components/new/new";

configure({ adapter: new Adapter() });

describe("New", () => {
  let New;
  beforeEach(() => {
    New = shallow(<New />);
  });
});
