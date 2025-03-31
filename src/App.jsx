import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchTerm.length < 3) {
      setPokemon(null);
      setError('');
      return;
    }

    const fetchPokemon = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        if (!response.ok) {
          throw new Error('Pokemon no encontrado');
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [searchTerm]);

  return (
    <div className="App">
      <h1>Pokemon Search</h1>
      <input 
        type="text" 
        placeholder="Enter Pokemon name or ID" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {pokemon && (
        <div className="pokemon-card">
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      )}
    </div>
  );
}

export default App;