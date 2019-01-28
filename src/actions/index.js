export const getGridData = (params) => {
    return {
        type: "GET_GRID_DATA",
        payload: {
            ...params
        }
    }
}