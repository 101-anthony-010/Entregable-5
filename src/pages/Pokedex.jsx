import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokedexCard from '../components/pokedex/PokedexCard'

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([])
  const [pokemonName, setPokemonName] = useState("")
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const nameTrainer = useSelector((store) => store.nameTrainer)

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value)
  }
  const pokemonsByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())) //true or false with .include
  
  const paginationLogic = () => {
    const POKEMONS_PER_PAGE = 12

    const sliceStart = (currentPage -1) * POKEMONS_PER_PAGE
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE
    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd)
    
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1
  
    const PAGES_PER_BLOCK = 5 
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

    const pagesInBlock = []
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
    const maxPage = actualBlock * PAGES_PER_BLOCK
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i)
      }
    }
    return {pokemonInPage, lastPage, pagesInBlock}
  }

  const {lastPage, pokemonInPage, pagesInBlock} = paginationLogic()

  const handleClickPreviusPage = () => {
    const newCurrentPage = currentPage - 1
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage)
    }
  }
  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage)
    }
  }

  useEffect(() => {
    if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281"
      axios.get(URL)
      .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err))
    }
  }, [currentType])
  
  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type/"
    axios.get(URL)
      .then((res) => {
        const newTypes = res.data.results.map((type) => type.name)
        setTypes(newTypes)
      })
      .catch((err) => console.log(err))
  }, [])
  
  useEffect(() => {
    if (currentType) {
      const URL = `https://pokeapi.co/api/v2/type/${currentType}/`
      axios.get(URL)
        .then((res) => {
          const pokemonByType = res.data.pokemon.map(pokemon => pokemon.pokemon)
          setPokemons(pokemonByType)
        })
        .catch((err) => console.log(err))
    }
  }, [currentType])
  
  useEffect(() => {
    setCurrentPage(1)
  }, [pokemonName, currentType])
  
  return (
    <section className='min-h-screen'>
      <Header/>
      <section className='mx-5'>
        <h2 className='py-6 px-2'>
          <span className='font-bold text-red-500 text-lg'>Welcome {nameTrainer}</span>, here you can find your favorite pokemon
        </h2>
        <form className='flex justify-between mb-5 flex-wrap gap-5' onSubmit={handleSubmit}>
          <div className='mx-auto flex flex-wrap gap-6'>
            <input className='shadow-md px-6 py-2' id="pokemonName" type="text" placeholder='Search your pokemon' />
            <button className='px-8 py-2 bg-red-500 rounded-sm text-white mx-auto'>Search</button>
          </div>
          <select className='py-2 shadow-md px-4 w-[200px] mx-auto text-lg font-semibold' onChange={(e) => setCurrentType(e.target.value)}>
            <option value="">all</option>
            {
              types.map((type) => <option className='capitalize' key={type} value={type}>{type}</option>)
            }
          </select>
        </form>
      </section>
      <section className='px-2 grid gap-6 p-4 auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] max-w-[1000px] mx-auto'>
        {
          pokemonInPage?.map(pokemon => (<PokedexCard key={pokemon.url} pokemonUrl={pokemon.url} />))
        }
      </section>
      <section>
      <ul className='flex gap-1 justify-center p-4'>
        <li onClick={() => setCurrentPage(1)} className='rounded-sm px-2 py-1 bg-red-600 text-white cursor-pointer'>{"<<"}</li>
        <li onClick={handleClickPreviusPage} className={`px-2 py-1 bg-red-600 text-white cursor-pointer rounded-sm`}>{"<"}</li>
        {
          pagesInBlock?.map(numberPage => (<li onClick={() => setCurrentPage(numberPage)} className={`${numberPage === currentPage ? 'bg-red-400': ''} rounded-sm px-2 py-1 bg-red-600 text-white cursor-pointer`} key={numberPage}>{numberPage}</li>))
        }
        <li onClick={handleClickNextPage} className='rounded-sm px-2 py-1 bg-red-600 text-white cursor-pointer'>{">"}</li>
        <li onClick={() => setCurrentPage(lastPage)} className='rounded-sm px-2 py-1 bg-red-600 text-white cursor-pointer'>{">>"}</li>
      </ul>
      </section>
    </section>
  )
}

export default Pokedex
