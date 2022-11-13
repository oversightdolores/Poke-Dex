import React from "react";
import "../css/Cards.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteApi, deletePoke, getPokemons } from "../redux/actions";

export default function Card({ name, types, image, id, weight, height }) {
  const dispatch = useDispatch();

  function handleDelete() {
    console.log(id);
    if (id.length > 4) {
      dispatch(deletePoke(id));
      dispatch(getPokemons());
    } else {
      dispatch(deleteApi(id));
    }
  }

  return (
    <div className="container_cards" key={id}>
      <div className="container_info">
        <button className="btn_delete" onClick={handleDelete}>
          DELETE
        </button>
        <Link to={"/home/detail/" + id} style={{ textDecoration: "none" }}>
          <h3>{name}</h3>
          <img className="img_card" src={image} alt={name} />
          <div className="typesCont">
            {types?.map((type) => (
              <div key={type.id}>
                <p className="types">{type.name}</p>
              </div>
            ))}
          </div>
        </Link>
      </div>
    </div>
  );
}
