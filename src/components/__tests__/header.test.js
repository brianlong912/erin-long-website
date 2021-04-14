import React from "react"
import {render, fireEvent, cleanup} from "@testing-library/react"

import Header from "../header"

afterEach(cleanup);

test ("has site title", () => {
  const { getByText } = render(<Header siteTitle="Erin Long"/>)

  expect(getByText("Erin Long").textContent).toBe("Erin Long")
})