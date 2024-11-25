import React from 'react';
import classes from './HowItWorks.module.css';
import { FaTimes } from 'react-icons/fa';

const HowItWorks = (props) => {

  return (
    <aside className = {`${props.isHowItWorksOpen ? 'sidebar-wrapper show' : 'sidebar-wrapper '}`}>

      <div className = 'sidebar'>
        <button className = 'close-btn' onClick = {props.closeHowItWorks}>
          	<FaTimes />
        </button>

        <h3 className = {classes.header}>Cómo funciona</h3>

        <ul className = {classes.container}>
          <li className = {classes.item}>
            <span className = {classes.number}>1</span>
            <div className = {classes.content}>
              <div className = {classes.title}>¡Encuentra el mejor lugar para Ti.!</div>
              <p className = {classes.read}>Regístrate y comprueba tu precensia en el estacionamiento!!</p>
            </div>
          </li>
          <li className = {classes.item}>
            <span className = {classes.number}>2</span>
            <div className = {classes.content}>
              <div className = {classes.title}>¡Lugares Disponibles!</div>
              <p className = {classes.read}>Selecciona fecha y hora, consulta disponibilidad, consulta precios.</p>
            </div>
          </li>
          <li className = {classes.item}>
            <span className = {classes.number}>3</span>
            <div className = {classes.content}>
              <div className = {classes.title}>¡Estacionarse!</div>
              <p className = {classes.read}>A su llegada, solo tiene que mostrar su reserva en el parking.</p>
            </div>            
          </li>
        </ul>
        
        <a className = {classes.car} href="https://www.animatedimages.org/cat-cars-67.htm">
          <img src="https://www.animatedimages.org/data/media/67/animated-car-image-0021.gif" border="0" alt = "park here" />
        </a>
      </div>

    </aside>
  );
}

export default HowItWorks;

