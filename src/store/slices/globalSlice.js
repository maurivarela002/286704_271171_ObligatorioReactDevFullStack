import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    alcanzoLimiteReservas: false,
    listaReservas: [],
    listaEspecialidades: [],
    listaClinicas: [],
    listaOdontologos: [],
}


export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
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
        },
        agregarReserva: (state, action) => {
            const { _id, fechaReserva, especialidad, clinica, odontologo } = action.payload;
            const newReserva = {
                _id,
                fechaReserva,
                especialidad: especialidad.nombre,
                clinica: clinica.nombre,
                odontologo: odontologo.nombre
            };
            state.listaReservas = [...state.listaReservas, newReserva];
        },
        actualizarReserva: (state, action) => {
            const { _id, fechaReserva, especialidad, clinica, odontologo } = action.payload;
            state.listaReservas = state.listaReservas.map(reserva =>
                reserva._id === _id
                    ? {
                        ...reserva,
                        fechaReserva,
                        especialidad: especialidad.nombre,
                        clinica: clinica.nombre,
                        odontologo: odontologo.nombre
                    }
                    : reserva
            );
        },
        eliminarReserva: (state, action) => {
            state.listaReservas = state.listaReservas.filter(
                reserva => reserva._id !== action.payload
            );
        }
    }
});


export const {
    cargarReservas,
    cargarEspecialidades,
    cargarClinicas,
    cargarOdontologos,
    cargarUser,
    limiteReservas,
    agregarReserva,
    actualizarReserva,
    eliminarReserva
} = globalSlice.actions;

export default globalSlice.reducer;