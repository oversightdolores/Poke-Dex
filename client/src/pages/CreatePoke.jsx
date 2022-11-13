import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes, getPokemons } from "../redux/actions";
import { useHistory } from "react-router-dom";
import "../css/CreatePoke.css";
import random from "../images/random.png";
import { validate, validateImg } from "../components/Validate";

const CreatePoke = () => {
  const dispatch = useDispatch();
  const sTypes = useSelector((state) => state.types);
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const pokemons = useSelector((state) =>
    state.pokemons.map((pokemon) => pokemon.name)
  );

  const [input, setInput] = useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    image: "",
    types: [],
    alert: "",
  });

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  console.log(sTypes);
  console.log(input.types);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        pokemons
      )
    );
  }

  function handleSelect(e) {
    if (!input.types.includes(e.target.value)) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }

    setErrors(
      validate(
        {
          ...input,
          types: [...input.types, e.target.value],
        },
        pokemons
      )
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      setInput({
        ...input,
        alert: "Por favor, revise los campos",
      });
    } else if (
      input.speed &&
      input.height &&
      input.weight &&
      input.types.length &&
      input.image.length &&
      input.name.length &&
      input.hp &&
      input.attack &&
      input.defense
    ) {
      setInput({
        ...input,
        alert: "Pokemon creado con éxito",
      });
      dispatch(postPokemon(input));
      dispatch(getPokemons());
      setInput({
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        image: "",
        types: [],
      });

      setTimeout(() => {
        history.push("/home");
      }, 2000);
    } else {
      setInput({
        ...input,
        alert: "Por favor, complete los campos",
      });
    }
  }
  console.log(Object.keys(errors));
  console.log(input.length);

  return (
    <div className="create">
      <section className="createPoke">
        <form onSubmit={handleSubmit}>
          <h1>Create your Pokemon</h1>
          <h2>{input.alert}</h2>
          <div className="form-group">
            <label>Name </label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
              className="form-control"
            />
            <span className="error">{errors.name}</span>
          </div>
          <div className="form-group">
            <label>Hp </label>
            <input
              type="range"
              min="0"
              max="150"
              name="hp"
              value={input.hp}
              onChange={handleChange}
              className="form-control"
            />
            <span className="danger">{errors.hp}</span>
          </div>

          <div className="form-group">
            <label>Attack </label>
            <input
              type="range"
              min="0"
              max="200"
              name="attack"
              value={input.attack}
              onChange={handleChange}
              className="form-control"
            />
            <span className="danger">{errors.attack}</span>
          </div>

          <div className="form-group">
            <label>Defense </label>
            <input
              type="range"
              min="0"
              max="200"
              name="defense"
              value={input.defense}
              onChange={handleChange}
              className="form-control"
            />
            <span className="danger">{errors.defense}</span>
          </div>

          <div className="form-group">
            <label>Speed </label>
            <input
              type="range"
              name="speed"
              min="0"
              max="100"
              value={input.speed}
              onChange={handleChange}
              className="form-control"
            />
            <span className="danger">{errors.speed}</span>
          </div>

          <div className="form-group">
            <label>Height </label>
            <input
              type="range"
              name="height"
              min="0"
              max="80"
              value={input.height}
              onChange={handleChange}
              className="form-control"
            />
            <span className="danger">{errors.height}</span>
          </div>

          <div className="form-group">
            <label>Weight </label>
            <input
              type="range"
              name="weight"
              min="0"
              max="1500"
              value={input.weight}
              onChange={handleChange}
              className="form-control"
            />
            <span className="danger">{errors.weight}</span>
          </div>

          <div className="form-group">
            <label>Image </label>
            <input
              accept="image/png,image/jpeg"
              type="text"
              name="image"
              value={input.image}
              onChange={validateImg ? handleChange : null}
              className="form-control"
            />
            <span className="danger">{errors.image}</span>
          </div>

          <div className="form-group">
            <label>Types </label>
            <select
              name="types"
              onChange={handleSelect}
              className="form-control"
            >
              <option value="">Choose a type</option>
              {sTypes.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>

            <span className="danger">{errors.types}</span>

            {input.types.map((type) => (
              <div style={{ display: "flex" }} key={type}>
                <button
                  type="button"
                  onClick={() =>
                    setInput({
                      ...input,
                      types: input.types.filter((t) => t !== type),
                    })
                  }
                >
                  {type}
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className={
              Object.entries(errors).length > 0
                ? "btn-disabled"
                : "btn btn-primary"
            }
          >
            {" "}
            Create Pokemon
          </button>
          <Link to="/home">
            <button className="btn btn-primary">Volver</button>
          </Link>
        </form>
      </section>

      <section className="vistaPrevia">
        <h2>Vista previa</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{input.name}</h5>
            <img src={input.image ? input.image : random} alt="pokemon" />
            <span className="card-text">Hp: {input.hp}</span>
            <span className="card-text">Attack: {input.attack}</span>
            <span className="card-text">Defense: {input.defense}</span>
            <span className="card-text">Speed: {input.speed}</span>
            <span className="card-text">Height: {input.height}</span>
            <span className="card-text">Weight: {input.weight}</span>
            <span className="card-text">
              {" "}
              {input.types.map((type) => (
                <span
                  style={{
                    backgroundColor: "#49a19d",
                    padding: 2,
                    color: "white",
                    margin: 5,
                    borderRadius: 5,
                  }}
                  key={type}
                >
                  {type + " "}{" "}
                </span>
              ))}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreatePoke;
