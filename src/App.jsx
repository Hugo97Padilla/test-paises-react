import { useState } from 'react';
import { preguntas } from './assets/data/data';
import { Pregunta } from './Pregunta';
import { ResultadosParciales } from './ResultadosParciales';
import './styles/App.scss';

function App() {

  const [numeroPreguntas, setNumeroPreguntas] = useState( 0 );

  const [camposVacios, setCamposVacios] = useState( true );

  const [terminado, setTerminado] = useState( false );

  const [nombreUsuario, setNombreUsuario] = useState( '' );

  const [apellidoUsuario, setApellidoUsuario] = useState( '' );

  const preguntaActual = preguntas[numeroPreguntas];

  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState('');

  const [respuestasParciales, setRespuestasParciales] = useState([]);

  const handleIngresoDato = ( event ) => {

    if( event.target.id === 'nombre' ) {
      setNombreUsuario( event.target.value )
    } else {
      setApellidoUsuario( event.target.value )
    }
  }

  const handleLogin = () => {
    if( nombreUsuario === '' || apellidoUsuario === ''){
      setCamposVacios( true );
      return;
    }else {
      setCamposVacios( false );
    }    
  }

  const handleSiguientePregunta = () => {
    let respuestaCorrecta = respuestaSeleccionada.toLowerCase() === preguntaActual.respuesta.letra.toLowerCase();

    setRespuestasParciales([
      ...respuestasParciales,
      {
        preguntaNumero: numeroPreguntas + 1,
        esCorrecta: respuestaCorrecta,
      }
    ])
    setNumeroPreguntas( numeroPreguntas + 1 );
    
    if( preguntas.length === numeroPreguntas + 1 ){
      setTerminado( true );
      return;
    }
    
  }

  return (
    <div className="App">

      {
        camposVacios  &&  
            <div className="ingreso-caja animate__animated animate__backInDown">
              <input name="nombre" id="nombre" type="text" onChange={ handleIngresoDato }  value={ nombreUsuario } required placeholder="Nombre" />
              <input name="apellido" id="apellido" type="text" onChange={ handleIngresoDato } value={ apellidoUsuario } required placeholder="Apellido" />

              { 
                (nombreUsuario === '' || apellidoUsuario === '') && 
                <span className="text-danger h6 animate_animated animate__backInDown">*Debe llenar todos los campos</span> 
              }

              <button onClick={ handleLogin } className="btn boton-login"> Realizar Intento</button>
            </div>
        
      }


      {
        (!camposVacios && !terminado )&& 
            <div className="animate__animated animate__fadeIn">
              <div className="titulo-inicio">
                <h3>Hola { nombreUsuario } { apellidoUsuario}!! Veamos que tanto sabes de Geografía</h3>
              </div>

              <div className="preguntas">
                  <Pregunta 
                    numeroPreguntas={numeroPreguntas} 
                    preguntaActual={preguntaActual} 
                    setRespuestaSeleccionada={setRespuestaSeleccionada}
                  />
              </div>

              <button 
                onClick={ handleSiguientePregunta } 
                className="btn btn-primary boton-siguiente"
                disabled={ respuestaSeleccionada === '' }
              > 
                Siguiente Pregunta 
              </button>
            </div>
      }

      <div className="resultados-parciales">
        {
          terminado &&
            <>
              <div className="resultados animate__animated animate__zoomInDown">
                <span className="text-success">
                  Preguntas Correctas: { respuestasParciales.filter( resp => resp.esCorrecta ).length }
                </span>
                <span className="text-danger">
                  Preguntas Incorrectas: { respuestasParciales.filter( resp => !resp.esCorrecta ).length }
                </span>
              </div> 

              <button className="btn btn-success boton-nuevo-intento animate__animated animate__zoomInDown" onClick={ () => { window.location.reload() } }>Nuevo Intento</button>
            </>

        }
        <ResultadosParciales  respuestasParciales={respuestasParciales} /> 
      </div>
      
    </div>
  );
}

export default App;
