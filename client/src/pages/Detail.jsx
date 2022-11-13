import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getPokemons, putPoke } from "../redux/actions";
import random from "../images/random.png";
import "../css/Details.css";
import "../css/Poke.css";

export default function Details(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  console.log(props);
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    return () => {
      dispatch(getPokemons());
    };
  }, [dispatch, props.match.params.id]);

  const myPokemon = useSelector((state) => state.detail);

  console.log(myPokemon);
  const back = () => {
    props.history.goBack();
    dispatch(getPokemons());
  };
  return (
    <div className="container">
      <button onClick={() => back()}>Back</button>

      <div className="poke">
        <h3>{myPokemon.name}</h3>
        <img
          src={myPokemon.image ? myPokemon.image : random}
          alt={myPokemon.name}
        />
        {/* <Link to={`/home/detail/editar/${id}`} style={{textDecoration:'none',  }} >
        <button className='btn_edit'>Edit</button>
        </Link> */}
      </div>
      <div className="info">
        <h3>Stats</h3>
        <span>HP: {myPokemon.hp}</span>
        <input type="range" min="0" max="150" value={myPokemon.hp} />
        <span>Attack: {myPokemon.attack}</span>
        <input type="range" min="0" max="200" value={myPokemon.attack} />
        <span>Defense: {myPokemon.defense}</span>
        <input type="range" min="0" max="200" value={myPokemon.defense} />
        <span>Speed: {myPokemon.speed}</span>
        <input type="range" min="0" max="100" value={myPokemon.speed} />
        <span>Height: {myPokemon.height}</span>
        <input type="range" min="0" max="80" value={myPokemon.height} />
        <span>Weight: {myPokemon.weight}</span>
        <input type="range" min="0" max="1500" value={myPokemon.weight} />

        {myPokemon.types &&
          myPokemon.types?.map((type, index) => {
            return (
              <div className="poke-type" key={index}>
                <span>{type.name}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
