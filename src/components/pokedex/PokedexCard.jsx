import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const borderByType = {
    grass: "border-green-500",
    fire: "border-red-500",
    water: "border-blue-500",
    fighting: "border-sky-500",
    normal: "border-amber-900",
    ground: "border-yellow-500",
    rock: "border-gray-500",
    bug: "border-lime-500",
    ghost: "border-fuchsia-900",
    steel: "border-gray-700",
    electric: "border-blue-600",
    psychic: "border-teal-500",
    ice: "border-sky-400",
    dark: "border-black",
    fairy: "border-rose-500",
    dragon: "border-cyan-600",
    poison: "border-purple-600"
}
const backgroundByType = {
    grass: "from-green-500 to-white",
    fire: "from-red-500 to-white",
    water: "from-blue-500 to-white",
    fighting: "from-sky-500 to-white",
    normal: "from-amber-900 to-white",
    ground: "from-yellow-500 to-white",
    rock: "from-gray-500 to-white",
    bug: "from-lime-500 to-white",
    ghost: "from-fuchsia-900 to-white",
    steel: "from-gray-700 to-white",
    electric: "from-blue-600 to-white",
    psychic: "from-teal-500 to-white",
    ice: "from-sky-400 to-white",
    dark: "from-black to-white",
    fairy: "from-rose-500 to-white",
    dragon: "from-cyan-600 to-white",
    poison: "from-purple-600 to-white"
}
const textColorByType = {
    grass: "text-green-500",
    fire:"text-red-500",
    water: "text-blue-500",
    fighting: "text-sky-500",
    normal: "text-amber-900",
    ground: "text-yellow-500",
    rock: "text-gray-500",
    bug: "text-lime-500",
    ghost: "text-fuchsia-900",
    steel: "text-gray-700",
    electric: "text-blue-600",
    psychic: "text-teal-500",
    ice: "text-sky-400",
    dark: "text-black",
    fairy: "text-rose-500",
    dragon: "text-cyan-600",
    poison: "text-purple-600"
}

const PokedexCard = ({pokemonUrl}) => {
    const [pokemon, setPokemon] = useState()

    const types = `${pokemon?.types
        .slice(0, 2)
        .map(type => type.type.name)
        .join(" / ")}`

    useEffect(() => {
        axios.get(pokemonUrl)
            .then((res) => setPokemon(res.data))
            .catch((err) => console.log(err))
    },[])
    
    return (
    <Link to={`/pokedex/${pokemon?.id}`} className={`text-center border-8 ${borderByType[pokemon?.types[0].type.name]} rounded-md`}>
        <section className={`relative bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} to-black h-[150px]`}>
            <div className='absolute -bottom-12 w-[200px] left-1/2 -translate-x-1/2'>
                <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
            </div>
        </section>
        <section>
            <h3 className={`text-xl mt-10 font-bold ${textColorByType[pokemon?.types[0].type.name]}`}>{pokemon?.name}</h3>
            <h4 className={`text-center font-semibold`}>{types}</h4>
            <span className='text-gray-500 text-sm'>Type</span>
            <hr />
            <section className='grid grid-cols-3 gap-2 p-2'>
                {
                    pokemon?.stats.map(stat => (
                        <div key={stat.stat.name}>
                            <h5 className='text-gray-500 text-sm'>{stat.stat.name}</h5>
                            <span className={`${textColorByType[pokemon?.types[0].type.name]} font-semibold`}>{stat.base_stat}</span>
                        </div>
                    ))
                }
            </section>
        </section>
    </Link>
  )
}

export default PokedexCard
