import { fireEvent, render } from "@testing-library/react";
import Calculator from "../Calculator";

describe("Calculator", () => {
    it("Testing Number", () => {
        const { getByTestId } = render(<Calculator />)
        const number = getByTestId("number").textContent;
        expect(number).toBe("0")
    })
    it("Testing Add Function", () => {
        const { getByTestId, getByRole } = render(<Calculator />)
        const addBtn = getByRole("button", {name : "Add"})
        fireEvent.click(addBtn)
        const number = getByTestId("number").textContent;
        expect(number).toBe("1")
    })
})
