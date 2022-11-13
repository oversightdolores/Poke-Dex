import React from 'react'
import '../css/Home.css'

export default function Paginado({ pokemonsPerPage, allPokemons, paginado, page}){
    const pageNumbers = []

    for (let i = 0 ; i < Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i + 1)
    }

    return(
        <nav >
            <ul className='paginado' >
                {
                    pageNumbers && pageNumbers.map( number => (
                        <li key={number} onClick={() => paginado(number)} id='pokeli'>
                            <div className='poke-key'>
                           <text style={ page === number ? {color:"red"} : {}}>{number}</text>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )

}