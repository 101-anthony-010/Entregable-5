import React from 'react'
import Footer from '../components/Footer'
import { useDispatch } from 'react-redux'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const dispacth = useDispatch()
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispacth(setNameTrainer(e.target.nameTrainer.value))
        navigate("/pokedex")    
    }

  return (
    <section className='min-h-screen grid grid-rows-[1fr_auto]'>
        <section className='flex justify-center items-center'>
            <article className='text-center'>
                <div className='p-2'>
                    <img src="/images/pokedex.png" alt="" />
                </div>
                <h2 className='text-red-500 font-bold text-2xl py-4'>¡Hola Entrenador!</h2>
                <p>Para poder comenzar, dame tu nombre:</p>
                <form  onSubmit={handleSubmit} className='py-4'>
                    <input className='shadow-md px-5 py-2 mr-2 mb-2' id='nameTrainer' type="text" placeholder='Your name ...' required/>
                    <button className='mt-2 ml-2 text-white bg-red-500 px-5 py-2 rounded-sm'>Comenzar</button>
                </form>
            </article>
        </section>
        <Footer/>
    </section>
  )
}

export default Home
