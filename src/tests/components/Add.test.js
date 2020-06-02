import React from "react";
import { shallow } from "enzyme";
import  {Add}  from "../../components/Add";

test("Should render Add component correctly.", () => {
  const wrapper = shallow(<Add />);
  expect(wrapper).toMatchSnapshot();
});
