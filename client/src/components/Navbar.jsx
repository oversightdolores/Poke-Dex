import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Search from "../components/Search";
import pokeimg from "../images/pokeimg.png";
import "../css/Home.css";
import pokebola from "../images/pokebola.png";
import { reloadPokemons,filterCreated, filterPokemonsByType, orderByNameOrStrengh, getPokemons } from "../redux/actions";

export default function Navbar() {

    const dispatch = useDispatch()
    const [orden, setOrden] = useState('')
  const types = useSelector(state => state.types)
  
  
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
        dispatch(orderByNameOrStrengh(e.target.value));
        setOrden(`Ordenado ${e.target.value}`)
       
    }



  return (
    <div>
        <div className="filtros">
    <Link to="/">
      <img src={pokeimg} alt="pokeLogo" className="pokeLogo" />
    </Link>
    <button
      className="btn-rload"
      onClick={(e) => {
        handleClick(e);
      }}
    >
      {" "}
      Reload all
    </button>
    <select className="selecFiltros" onChange={(e) => handleSort(e)}>
      <option value="normal">Normal</option>
      <option value="asc">A - Z</option>
      <option value="desc">Z - A</option>
      <option value="HAttack">Highest Attack</option>
      <option value="LAttack">Lowest Attack</option>
    </select>
    <select
      className="selecFiltros"
      onChange={(e) => handleFilterCreated(e)}
    >
      <option value="All">All</option>
      <option value="Api">API</option>
      <option value="Created">Created</option>
    </select>
    <select
      className="selecFiltros"
      onChange={(e) => handleFilterByType(e)}
    >
      <option value="All">all types</option>
      {types.map((type) => (
        <option value={type.name} key={type.name}>
          {type.name}
        </option>
      ))}
    </select>

    <Search />
    <Link style={{textDecoration: 'none' }} to="/create">
      <img src={pokebola} alt="pokebola" className="pokebola" />
      <p className="crear">Create</p>
    </Link>
  </div>
    </div>
  )
}
