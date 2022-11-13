import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Landing.css'

export default function Landing() {
  return (
    <>

    <div className='contLanding'>
      
      <Link to='/home' style={{ textDecoration: 'none' }}>
      <div className='poke-container'>
        
      <div className='poke-up'>
        </div>
        <text className='btn-landing' >
          INGRESAR
        </text>
      <div className='poke-center'>
        <div><p>O</p></div>
      </div>
        <div className='poke-down'>
          </div>

      </div>
      </Link>
    </div>
    </>
  )
}
