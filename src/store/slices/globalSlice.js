import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listaReservas: [],
    listaEspecialidades: [],
    listaClinicas: [],
    listaOdontologos: [],
    listaPacientes: [], 
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
        cargarPacientes: (state, action) => {
            state.listaPacientes = action.payload
        }
    }
});


export const { cargarReservas, cargarEspecialidades, cargarClinicas, cargarOdontologos, cargarPacientes } = globalSlice.actions;

export default globalSlice.reducer;