import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getPokemons, putPoke, getTypes, getDetail } from '../redux/actions'


export default function Editar(props) {
    const id = props.match.params.id
    const types = useSelector(state => state.types)
    const dispatch = useDispatch()
    const myPokemon = useSelector(state => state.detail)
    console.log (myPokemon)
    const [input, setInput] = useState({
        name: '',
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
        image: ''
    })
    useEffect(() => {
        dispatch(getDetail(id))
        dispatch(getPokemons())
        dispatch(getTypes())
    }
    , [dispatch])
    useEffect(() => {
        setInput({
            name: myPokemon.name,
            hp: myPokemon.hp,
            attack: myPokemon.attack,
            defense: myPokemon.defense,
            speed: myPokemon.speed,
            height: myPokemon.height,
            weight: myPokemon.weight,
            types: myPokemon.types,
            image: myPokemon.image
        })
    }
    , [myPokemon])
    const handleInputChange = function(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleSelectChange = function(e) {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }
    const handleDelete = function(e) {
        setInput({
            ...input,
            types: input.types.filter(type => type !== e.target.value)
        })
    }
    const handleSubmit = function(e) {
        e.preventDefault()
        dispatch(putPoke(input, id))
        alert('Pokemon edited')
        props.history.push('/home')
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type='text' name='name' value={input.name} onChange={handleInputChange}/>
                <label>HP</label>
                <input type='number' name='hp' value={input.hp} onChange={handleInputChange}/>
                <label>Attack</label>
                <input type='number' name='attack' value={input.attack} onChange={handleInputChange}/>
                <label>Defense</label>
                <input type='number' name='defense' value={input.defense} onChange={handleInputChange}/>
                <label>Speed</label>
                <input type='number' name='speed' value={input.speed} onChange={handleInputChange}/>
                <label>Height</label>
                <input type='number' name='height' value={input.height} onChange={handleInputChange}/>
                <label>Weight</label>
                <input type='number' name='weight' value={input.weight} onChange={handleInputChange}/>
                <label>Image</label>
                <input type='text' name='image' value={input.image} onChange={handleInputChange}/>
                <select onChange={handleSelectChange}>
                    <option value=''>Select a type</option>
                    {
                        types.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))
                    }
                </select>
                {
                    input.types.map(type => (
                        <div key={type}>
                            <button value={type} onClick={handleDelete}>X</button>
                            <p>{type}</p>
                        </div>
                    ))
                }
                <button type='submit'>Submit</button>
            </form>
            <Link to='/home'>Back</Link>
        </div>
    )
}
