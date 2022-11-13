import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import '../css/Home.css'
import { getPokemons, filterCreated, orderByNameOrStrengh, getTypes, removeDetail, filterPokemonsByType, reloadPokemons, getPokemonDb } from '../redux/actions';

import pokebola from '../images/pokebola.png'

import '../css/Home.css'
import Search from '../components/Search'

import { useDispatch, useSelector } from 'react-redux'

export default function Navbar() {
   
    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.pokemons)
    const all = useSelector(state => state.allPokemons)
    const types = useSelector(state => state.types)
    const [pokLoaded, setPokLoaded] = useState(all.length ? true : false)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
    console.log(currentPokemons)
    console.log(allPokemons)
    
    
   

    useEffect(() => {
        dispatch(removeDetail());
        dispatch(getTypes());
        if(!pokLoaded){
            dispatch(getPokemons());
        }   
    }, [pokLoaded, dispatch])
   

    useEffect(() => {
        setCurrentPage(1);
      }, [allPokemons.length,setCurrentPage]);

    function handleClick(e){
        e.preventDefault();
        dispatch(reloadPokemons());
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleFilterByType(e){
        dispatch(filterPokemonsByType(e.target.value));
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByNameOrStrengh(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

  return (
    

    

    <div className='filtros'>
    <button  className='btn-rload' onClick={e => {handleClick(e)}} > Reload all</button> 
        <select  onChange={e => handleSort(e)}>
            <option value="normal">Normal</option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
            <option value="HAttack">Highest Attack</option>
            <option value="LAttack">Lowest Attack</option>
        </select>
        <select onChange={e => handleFilterCreated(e)}>
            <option value="All">All</option>
            <option value="Api">API</option>
            <option value="Created">Created</option>
        </select>
        <select   onChange={e => handleFilterByType(e)}>
            <option value="All">all types</option>
            {
                types.map( type => (
                    <option value={type.name} key={type.name}>{type.name}</option>
                ))
            }
        </select>

            <Search />
        <Link to='/create'>
        <img src={pokebola} alt='pokebola' className='pokebola' />
    </Link>
    </div>
  )
}
