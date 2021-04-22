import React from "react"
import renderer from "react-test-renderer"
import { render, fireEvent, cleanup } from "@testing-library/react"

import { PureLayout as Layout } from "../layout"

afterEach(cleanup);

describe("Layout", () => {
  const data = {
    site: {
      siteMetadata: {
        title: "Erin Long",
      },
    },
  }
  it("renders correctly", () => {
    const tree = renderer.create(<Layout data={data} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("shows toTopButton when scrolled down", () =>{
    const {rerender, container} = render(<Layout data={data} />)

    expect(container.querySelector("#toTopButton")).toHaveStyle("visibility: hidden")

    fireEvent.scroll(window, {target: {scrollY: 10}})

    rerender(<Layout data={data} />)

    expect(container.querySelector("#toTopButton")).toHaveStyle("visibility: visible")
  })
})
