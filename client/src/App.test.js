import {orderByName, filterByPlatform} from "./redux/actions/index"

describe("Action-Testing", () => {
    it("It should return an action with type ORDER_BY_NAME and the payload must be the function argument", () => {
        expect(orderByName("asc")).toEqual({
            type: "ORDER_BY_NAME",
            payload: "asc"
        })
    })

    it("It should return an action with type FILTER_BY_PLATFORM and the payload must be the function argument", () => {
        expect(filterByPlatform("PC")).toEqual({
            type: "FILTER_BY_PLATFORM",
            payload: "PC"
        })
    })
})

