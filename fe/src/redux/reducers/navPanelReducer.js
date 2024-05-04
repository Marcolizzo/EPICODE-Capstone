import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toggled: false,
    broken: false,
}

const navPanelSlice = createSlice({
    name: 'navPanel',
    initialState,
    reducers: {
        setToggled(state, action) {
            state.toggled = action.payload
        },
        setBroken(state, action) {
            state.broken = action.payload
        },
    },
})

export const { setToggled, setBroken } = navPanelSlice.actions
export default navPanelSlice.reducer
