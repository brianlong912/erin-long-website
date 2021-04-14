import React from "react"
import renderer from "react-test-renderer"
import { render, fireEvent, cleanup } from "@testing-library/react"

import modalImage from "../../../__mocks__/modalImage"
import modalInfo from "../../../__mocks__/modalInfo"
import Modal from "../modal"

afterEach(cleanup)

describe("Modal render", () => {
  it("renders correctly without modalInfo", () => {
    const tree = renderer
      .create(<Modal modalImage={modalImage} />, { attachTo: document.body })
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with modalInfo", () => {
    const tree = renderer
      .create(<Modal modalImage={modalImage} modalInfo={modalInfo} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

test("modal closes with close button", () => {
  //setting up props for render
  var modalVisible = true
  const mockSetModalVisible = jest.fn(value => {
    modalVisible = value
  })
  const { rerender, getByTestId, container } = render(
    <Modal
      modalImage={modalImage}
      modalVisible={modalVisible}
      setModalVisible={mockSetModalVisible}
    />
  )
  
  //expect modal to initially be visible
  expect(container.querySelector("#modal")).toHaveStyle("visibility: visible")

  //Clicking of button
  fireEvent.click(getByTestId("modal-close-button"))
  rerender(
    <Modal
      modalImage={modalImage}
      modalVisible={modalVisible}
      setModalVisible={mockSetModalVisible}
    />
  )
  expect(container.querySelector("#modal")).toHaveStyle("visibility: hidden")
})

test("modal closes with pressing outside of image and info (both present)", () => {
  var modalVisible = true
  const mockSetModalVisible = jest.fn(value => {
    modalVisible = value
  })
  const { rerender, getByTestId, container } = render(
    <Modal
      modalImage={modalImage}
      modalInfo={modalInfo}
      modalVisible={modalVisible}
      setModalVisible={mockSetModalVisible}
    />
  )
  
  expect(container.querySelector("#modal")).toHaveStyle("visibility: visible")

  fireEvent.click(container.querySelector("#modal"))
  rerender(
    <Modal
      modalImage={modalImage}
      modalInfo={modalInfo}
      modalVisible={modalVisible}
      setModalVisible={mockSetModalVisible}
    />
  )
  expect(container.querySelector("#modal")).toHaveStyle("visibility: hidden")
})

test("modal closes with pressing outside of image (no info present)", () => {
  var modalVisible = true
  const mockSetModalVisible = jest.fn(value => {
    modalVisible = value
  })
  const { rerender, getByTestId, container } = render(
    <Modal
      modalImage={modalImage}
      modalVisible={modalVisible}
      setModalVisible={mockSetModalVisible}
    />
  )
  
  expect(container.querySelector("#modal")).toHaveStyle("visibility: visible")

  fireEvent.click(container.querySelector("#modal"))
  rerender(
    <Modal
      modalImage={modalImage}
      modalInfo={modalInfo}
      modalVisible={modalVisible}
      setModalVisible={mockSetModalVisible}
    />
  )
  expect(container.querySelector("#modal")).toHaveStyle("visibility: hidden")
})

test("modal does not close when pressing on image", () => {
  var modalVisible = true
  const mockSetModalVisible = jest.fn(value => {
    modalVisible = value
  })
  const { rerender, getByTestId, container } = render(
    <Modal
      modalImage={modalImage}
      modalInfo={modalInfo}
      modalVisible={modalVisible}
      setModalVisible={mockSetModalVisible}
    />
  )
  
  expect(container.querySelector("#modal")).toHaveStyle("visibility: visible")

  fireEvent.click(container.querySelector("#modal-pic"))
  rerender(
    <Modal
      modalImage={modalImage}
      modalInfo={modalInfo}
      modalVisible={modalVisible}
      setModalVisible={mockSetModalVisible}
    />
  )
  expect(container.querySelector("#modal")).toHaveStyle("visibility: visible")
})

test("modal does not close when pressing info (info present)", () => {
  var modalVisible = true
  const mockSetModalVisible = jest.fn(value => {
    modalVisible = value
  })
  const { rerender, getByTestId, container } = render(
    <Modal
      modalImage={modalImage}
      modalInfo={modalInfo}
      modalVisible={modalVisible}
      setModalVisible={mockSetModalVisible}
    />
  )
  
  expect(container.querySelector("#modal")).toHaveStyle("visibility: visible")

  fireEvent.click(container.querySelector("#modal-info"))
  rerender(
    <Modal
      modalImage={modalImage}
      modalInfo={modalInfo}
      modalVisible={modalVisible}
      setModalVisible={mockSetModalVisible}
    />
  )
  expect(container.querySelector("#modal")).toHaveStyle("visibility: visible")
})

test("modal does not close when pressing info (no info)", () => {
  var modalVisible = true
  const mockSetModalVisible = jest.fn(value => {
    modalVisible = value
  })
  const { rerender, getByTestId, container } = render(
    <Modal
      modalImage={modalImage}
      modalVisible={modalVisible}
      setModalVisible={mockSetModalVisible}
    />
  )
  
  expect(container.querySelector("#modal")).toHaveStyle("visibility: visible")

  fireEvent.click(container.querySelector("#modal-info"))
  rerender(
    <Modal
      modalImage={modalImage}
      modalInfo={modalInfo}
      modalVisible={modalVisible}
      setModalVisible={mockSetModalVisible}
    />
  )
  expect(container.querySelector("#modal")).toHaveStyle("visibility: visible")
})
