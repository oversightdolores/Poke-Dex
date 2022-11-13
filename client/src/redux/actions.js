
import axios from 'axios'
import { useSelector } from 'react-redux'

export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/pokemons",{

        })
        
        return dispatch({
            type:"GET_POKEMONS",
            payload: json.data
        })
    }
}


export function reloadPokemons(){
    return {
        type:"RELOAD_POKEMONS",
    }
}

export function getTypes(){
    return async function(dispatch){
        var info = await axios.get("http://localhost:3001/types",{

        })

        return dispatch({ 
            type:"GET_TYPES",
            payload: info.data
        })
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        const pokemon = await axios.post("http://localhost:3001/pokemons", payload)
        console.log(pokemon)
        return {
            type:"POST_POKEMON",
            payload: pokemon
        }
    }
}

export function getPokemonName(name){
    return async function (dispatch){
        try{
            const json = await axios.get("http://localhost:3001/pokemons/name?name=" + name)
            // console.log(json.data)

            return dispatch({
                type:"GET_POKEMON_NAME",
                payload: json.data
            })
        } catch(error){
            console.log(error)
            return dispatch({
                type:"GET_POKEMON_NAME",
                payload: ['Pokemon']
            })
        }
    }
}

export function getDetail (id){
    return async function (dispatch){
        try{
            let json = await axios.get("http://localhost:3001/pokemons/" + id);

            return dispatch({
                type:"GET_DETAILS",
                payload: json.data
            }) 
        } catch(error){
            console.log(error)
        }
    }
}

export function deletePoke (id){
    return async function (dispatch){
        try{
            let json = await axios.delete("http://localhost:3001/pokemons/delete/" + id);

            return dispatch({
                type:"DELETE_POKEMON",
                payload: json.data
            }) 
        } catch(error){
            console.log(error)
        }
    }
}

export function deleteApi (id){
    
    return async function (dispatch){
        try{

            return dispatch({
                type:"DELETE_POKEMON",
                payload: id
            }) 
        }
        catch(error){
            console.log(error)
        }
    }
}


export function putPoke (payload){
    return async function (dispatch){
        try{
            let json = await axios.put("http://localhost:3001/pokemons/" + payload.id, payload);

            return dispatch({
                type:"PUT_POKEMON",
                payload: json.data
            }) 
        } catch(error){
            console.log(error)
        }
    }
}


export function removeDetail(){
    return {
        type:"REMOVE_DETAILS",
    }
}

export function filterPokemonsByType(payload){
    return {
        type:"FILTER_BY_TYPES",
        payload
    }
}

export function filterCreated(payload){
    
    return {
        type:"FILTER_CREATED",
        payload
    }
}

export function orderByNameOrStrengh(payload){
    
    return {
        type:"ORDER_BY_NAME_OR_STRENGH",
        payload
    }
}