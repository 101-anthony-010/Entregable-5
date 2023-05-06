import { Route, Routes } from "react-router-dom"

import ProtectedName from "./components/auth/ProtectedName"
import NotFound from "./pages/NotFound"
import Pokedex from "./pages/Pokedex"
import Home from "./pages/Home"
import PokemonId from "./pages/PokemonId"

function App() {
  
  return (
    <section className="">
      <Routes>
        <Route path="/" element={<Home />}/>
        
        <Route element={<ProtectedName />}>
          <Route path='/pokedex' element={<Pokedex/>}/>
          <Route path="/pokedex/:id" element={<PokemonId/>}/>
        </Route>
        
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </section>
  )
}

export default App
