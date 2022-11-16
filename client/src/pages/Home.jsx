import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import Paginado from "../components/Paginado";
import "../css/Home.css";
import loading from "../images/loading.gif";
import notFound from "../images/notFound.png";
import random from "../images/random.png";
import { getPokemons, removeDetail,getTypes} from "../redux/actions";
import Navbar from "../components/Navbar";


export default function Home() {

  const dispatch = useDispatch()
  const allPokemons = useSelector(state => state.pokemons)
  const all = useSelector(state => state.allPokemons)
  const [pokLoaded, /*setPokLoaded*/] = useState(all.length ? true : false)
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, /*setPokemonsPerPage*/] = useState(12)
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
  }


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

  
  return (
    <div className="contP">

      <Navbar />

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
