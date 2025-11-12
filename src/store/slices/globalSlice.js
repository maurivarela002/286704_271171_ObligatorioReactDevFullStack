import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{},
    alcanzoLimiteReservas: false,
    listaReservas: [],
    listaEspecialidades: [],
    listaClinicas: [],
    listaOdontologos: [],
}


export const globalSlice = createSlice({
    name:"global",
    initialState,
    reducers:{
        cargarReservas: (state, action) => {
            state.listaReservas = action.payload
        },
        cargarEspecialidades: (state, action) => {
            state.listaEspecialidades = action.payload
        },
        cargarClinicas: (state, action) => {
            state.listaClinicas = action.payload
        },
        cargarOdontologos: (state, action) => {
            state.listaOdontologos = action.payload
        },
        cargarUser: (state, action) => {
            state.user = action.payload
        },
        limiteReservas: (state, action) => {
            state.alcanzoLimiteReservas = action.payload
        }
    }
});


export const { 
    cargarReservas, 
    cargarEspecialidades, 
    cargarClinicas, 
    cargarOdontologos, 
    cargarUser,
    limiteReservas 
} = globalSlice.actions;

export default globalSlice.reducer;