import { createSlice } from "@reduxjs/toolkit"

export const toolKitSlice = createSlice({
    name: 'toolkit',
    initialState: {
        user: {
            author: null,
            avatar: null
        },
        callData: {
            video: false,
            callTo: ''
        }
    },
    reducers: {
        setNameRedux(state, action) {
            state.user = action.payload
        },
        setCallDataRedux(state, action) {
            state.callData = action.payload
        }
    }
})
export default toolKitSlice.reducer
export const { setNameRedux } = toolKitSlice.actions
export const userAuthRedux = (state) => state.toolkit.user;

export const { setCallDataRedux } = toolKitSlice.actions
export const callDataRedux = (state) => state.toolkit.callData;