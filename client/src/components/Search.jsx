import React, {useState,useEffect} from "react";
import {getPokemonName} from "../redux/actions";
import {useDispatch} from "react-redux";
import '../css/Home.css'




const SearchPokemon =() => {

    const dispatch = useDispatch();
   const [seartch , setSearch] = useState("")
   

    function handleSearch(e){
        e.preventDefault();
        dispatch(getPokemonName(seartch.toLowerCase()))
        setSearch("")
    }





    return (
        < div className="search">
            <input
                
                type="text"
                placeholder="Search Pokemon"
                onChange={(e) => setSearch(e.target.value)}
                value={seartch}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

    


export default SearchPokemon;


