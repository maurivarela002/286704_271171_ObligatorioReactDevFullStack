import { useEffect } from 'react';
import errorHandler from './api/config/globalHttpErrorHandler';
import { useApiHandlers } from './api/config/i18nErrorHandler';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './pages/Menu';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { handleApiError, handleApiSuccess } = useApiHandlers();
  useEffect(() => {
    errorHandler.initHandlers = () => {
      errorHandler.apiHandlers = { handleApiError, handleApiSuccess };
    };
    errorHandler.initHandlers();
  }, [handleApiError, handleApiSuccess]);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Menu />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
            toastStyle={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          />
        </Provider>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;

























// import './App.css';
// import Lista from './componentes 22-10-25/Lista';
// import Contenido from './componentes/Contenido';
// import Menu from './componentes/Menu';
// import { Provider } from 'react-redux';
// import { store } from './store/store';
// import Contador from './componentes/Contador';
// import Boton from './componentes/Boton';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <Menu/>
//       <Contador/>
//       <Boton/>
//       <Contenido/>
//     </Provider>
//   );
// }

// export default App;






















// import './App.css';
// import Lista from './componentes 22-10-25/Lista';

// const App = () => {
//   return (
//     <div className="App">
//       <Lista/>
//     </div>
//   );
// }

// export default App;


//--------------------------------------------------------------------------------------------------------------










// import './App.css';
// import Contador from './componentes/Contador';
// import Informacion from './componentes/Informacion';
// import Persona from './componentes/Persona';
// import Texto from './componentes/Texto';
// //primera / => comenzar la importacion de algo desde la raiz del proyecto
// //segunda ./ => arranco la importacion desde una ruta hermana a donde estoy parado
// //tercera ../ => comience la importacion una ubicacion hacia atras

// const App = () => {

//   // let nombre = "Mauro";
//   // let nombres = ["Martin", "Manuel", "Sebastian"];
//   // let nombres = [<p>Martin</p>, <p>Manuel</p>, <p>Sebastian</p>];
//   let personas =[
//     {id:22, nombre: "Pedro", edad: 27},
//     {id:23, nombre: "Martin", edad: 22},
//     {id:24, nombre: "Lucia", edad: 21},
//   ]
//   return (
//     <div className="App">
//         {/* <h1>Titulo</h1> */}
//         {/* <h2>{nombre}</h2> */}

//         {/* <Informacion nombre={nombre} apellido="Nacimento"/>
//         <Informacion  nombre="Pepe" apellido="Suarez"/> */}
//         {/* <Informacion/>
//         <Informacion/>
//         <Informacion/> */}

//         <Informacion  nombre="Pepe" apellido="Suarez"/>
//         {/* <p>{nombres[0]}</p>
//         <p>{nombres[1]}</p>
//         <p>{nombres[2]}</p> */}

//         {/* {nombres.map(nom => <p>{nom}</p>)} */}

//         {/* {nombres.map((nom, i) => <Persona key={i} nombre={nom}/>)} */}

//         {/* {personas.map((p, i )=> <Persona key={i} nombre={p.nombre}/>)} */}

//         {/* {personas.map(p=> <Persona key={p.id} nombre={p.nombre} edad={p.edad}/>)} */}

//         {personas.map(p=> <Persona key={p.id} {...p}/>)}

//           <Contador/>

//           <Texto/>
//     </div>
//   );
// }

// export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Editar <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
