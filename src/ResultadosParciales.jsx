import React from 'react'

import './styles/ResultadosParciales.scss'

import correcta from './assets/images/correcta.svg';
import incorrecta from './assets/images/incorrecta.svg';

export const ResultadosParciales = ( {respuestasParciales} ) => {
    return (
        <>
            <ul className="lista-resultados-parciales">
                {
                    respuestasParciales.map( respuesta => (
                        <li key={respuesta.preguntaNumero} className="animate__animated animate__heartBeat">
                            <img src={ respuesta.esCorrecta ? correcta : incorrecta } alt="" />
                            <span  className={ respuesta.esCorrecta ? "correcta" : "incorrecta" }>{respuesta.preguntaNumero}</span>
                        </li>
                    ))
                }

            </ul>
        </>
    )
}
