import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const PokemonId = () => {
    const [pokemon, setPokemon] = useState()
    
    const {id} = useParams()
    
    const backgroundByType = {
        grass: "bg-green-500",
        fire: "bg-red-500",
        water: "bg-blue-500",
        fighting: "bg-sky-500",
        normal: "bg-amber-900",
        ground: "bg-yellow-500",
        rock: "bg-gray-500",
        bug: "bg-lime-500",
        ghost: "bg-fuchsia-900",
        steel: "bg-gray-700",
        electric: "bg-blue-600",
        psychic: "bg-teal-500",
        ice: "bg-sky-400",
        dark: "bg-black",
        fairy: "bg-rose-500",
        dragon: "bg-cyan-600",
        poison: "bg-purple-600"
    }

    const getPercentStatBar = (stat_base) => {
        const percentBarProgres = Math.floor((stat_base * 100) / 255)
        return `${percentBarProgres}%`
    }

    useEffect(() => {
      const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
      axios.get(URL)
        .then((res) => setPokemon(res.data))
        .catch((err) => console.log(err))
    }, [])    
  return (
    <section>
        <Header/>
        <section className='px-2 py-14'>
            <article className='max-w-[900px] mx-auto shadow-2xl p-2 rounded-md border-[1px] border-white'>
                <section className={`relative h-[150px] ${backgroundByType[pokemon?.types[0].type.name]}`}>
                    <div className='w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-14'>
                        <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                    </div>
                </section>
                <section className='text-center p-10'>
                    <div className=''>
                        <h3 className='font-semibold'>#{pokemon?.id}</h3>
                    </div>
                    <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2'>
                        <hr />
                        <h2 className='capitalize font-bold text-2xl py-2'>{pokemon?.name}</h2>
                        <hr />
                    </div>
                    <div className='flex justify-center gap-6 text-center'>
                        <div>
                            <h5>Weight</h5>
                            <span className='font-semibold'>{pokemon?.weight}</span>
                        </div>
                        <div>
                            <h5>Height</h5>
                            <span className='font-semibold'>{pokemon?.height}</span>
                        </div>
                    </div>
                   <section className='grid md:grid-cols-2 gap-4'>
                    <section className='text-center'>
                            <h3>Types</h3>
                            <section className='grid grid-cols-2 gap-4 mt-4'>
                                {
                                    pokemon?.types.map(type => <article className={`text-white font-semibold capitalize py-2 px-8 border-gray-300 ${backgroundByType[pokemon?.types[0].type.name]}`} key={type.type.name}>{type.type.name}</article>)
                                }
                            </section>
                        </section>
                        <section className='text-center'>
                            <h3>Abilities</h3>
                            <section className='grid grid-cols-2 gap-4 mt-4'>
                                {
                                    pokemon?.abilities.map(ability => <article className='capitalize truncate py-2 px-8 border-[1px] border-gray-300' key={ability.ability.name}>{ability.ability.name}</article>)
                                }
                            </section>
                        </section>
                   </section>
                </section>
                <section className='py-6 px-10'>
                    <h3 className='font-bold text-2xl pb-3'>Stats</h3>
                    <section>
                        {
                            pokemon?.stats.map(stat => (
                                <article key={stat.stat.name}>
                                    <section className='flex justify-between'>
                                        <h5 className='capitalize'>{stat.stat.name}</h5>
                                        <span>{stat.base_stat}/255</span>
                                    </section>
                                    <div className='bg-gray-100 h-6 rounded-sm'>
                                        <div style={{"width": getPercentStatBar(stat.base_stat)}} className={`h-full bg-yellow-500 bg-gradient-to-r from-yellow-500 to-green-500`}></div>
                                    </div>
                                </article>
                            ))
                        }
                    </section>
                </section>
            </article>

            <article className='mt-10 border-[1px] border-white'>
                <section className='max-w-[900px] mx-auto shadow-xl p-6'>
                    <div className='grid grid-cols-[auto_1fr] items-center gap-2 mb-6'>
                        <h3 className='px-4 font-bold text-3xl'>Movements</h3>
                        <hr />
                    </div>
                    <section>
                        <ul className='flex flex-wrap gap-3'>
                            {
                                pokemon?.moves.map(move => (<li className="py-2 px-3 bg-gray-200 rounded-full" key={move.move.name}>{move.move.name}</li>))
                            }
                        </ul>
                    </section>
                </section>
            </article>
        </section>
    </section>
  )
}

export default PokemonId
