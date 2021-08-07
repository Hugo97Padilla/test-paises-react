import React from 'react'

import './styles/Pregunta.scss';

export const Pregunta = ( {numeroPreguntas, preguntaActual, setRespuestaSeleccionada} ) => {

    const { pregunta, opciones } = preguntaActual;
    

    const handleCambioOpcion = ( event ) => {
        setRespuestaSeleccionada( event.target.value ) 
    }

    return (
        <div className="row" style={{ 'width': '100%'}}>
            <div className="col-md-9 pregunta">
                <h3 className="titulo-pregunta animate__animated animate__bounceIn">{numeroPreguntas + 1}: ¿{pregunta}?</h3>

                <div className="opciones-preguntas">

                    <div className="form-check row">
                        {
                            opciones.map( opt => (
                                <label key={opt.letra} className="form-check-label col-12 mb-4 animate__animated animate__slideInDown">
                                    <input 
                                        onChange={ handleCambioOpcion } 
                                        type="radio" 
                                        className="form-check-input" 
                                        name="opcion-seleccionada" 
                                        id="opcion-seleccionada" 
                                        value={opt.letra} 
                                    />
                                    <span>{opt.letra}: <strong>{opt.texto}</strong> </span>
                                </label>
                            ) )
                        }
                    </div>
                    
                </div>

            </div>
        </div>
    )
}
