import { useState } from 'react'

const App = () => {
  const [pokemon, setPokemon] = useState("")
  const [pokemonData, setPokemonData] = useState(null)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      
      const data = await response.json()
      console.log(data);

      if (response.ok) {
        setPokemonData(data)
      }
    } catch (error) {
      setError("Questo Pokemon non esiste!")
    }
  }

  return (
    <>
      <input type="text" value={pokemon} onChange={(e) => setPokemon(e.target.value)} />
      <button onClick={handleSearch}>Search infos!</button>

      {error && <p>{error}</p>}
      {pokemonData && (
        <div>
          <h1>Nome: {pokemonData.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemonData.name} />
          <p>Esperienza di base : {pokemonData.base_experience}</p>
          <p>Abilità: {pokemonData.abilities.map((element) => element.ability.name).join(", ")}</p>
        </div>
      )}
    </>
  )
}

export default App