import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Search from "../components/Search";
import Paginado from "../components/Paginado";
import pokeimg from "../images/pokeimg.png";
import "../css/Home.css";
import loading from "../images/loading.gif";
import notFound from "../images/notFound.png";
import pokebola from "../images/pokebola.png";
import random from "../images/random.png";
import { getPokemons, removeDetail,getTypes,reloadPokemons,filterCreated, filterPokemonsByType, orderByNameOrStrengh } from "../redux/actions";


export default function Home() {

  const dispatch = useDispatch()
  const allPokemons = useSelector(state => state.pokemons)
  const all = useSelector(state => state.allPokemons)
  const types = useSelector(state => state.types)

  const [pokLoaded, /*setPokLoaded*/] = useState(all.length ? true : false)
  const [orden, setOrden] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, /*setPokemonsPerPage*/] = useState(12)
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
  }
console.log(orden)

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
    <div className="contP">
      

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
      <div className="conData">
        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
          page={currentPage}
        />

        <div className="container_home">
          {currentPokemons.length ? (
            typeof currentPokemons[0] === "object" ? (
              currentPokemons.map((el) => {
                return (
                  <div className="containerCards" key={el.id}>
                    <Card
                      id={el.id}
                      name={el.name}
                      types={el.types}
                      image={el.image ? el.image : random}
                      attack={el.attack}
                      weight={el.weight}
                      height={el.height}
                    />
                  </div>
                );
              })
            ) : (
              <div>
                <img src={notFound} alt="Pokemon not found" width="200px" />
                <span>{currentPokemons[0]} not found</span>
              </div>
            )
          ) : (
            <div>
              <img src={loading} alt="Loading.." width="250px" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
