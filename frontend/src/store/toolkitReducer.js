import { createSlice } from "@reduxjs/toolkit"

export const toolKitSlice = createSlice({
    name: 'toolkit',
    initialState: {
        user: {
            author: null,
            avatar: null
        }
    },
    reducers: {
        setNameRedux(state, action) {
            state.user = action.payload

        }
    }
})
export default toolKitSlice.reducer
export const { setNameRedux } = toolKitSlice.actions
export const userAuthRedux = (state) => state.toolkit.user;