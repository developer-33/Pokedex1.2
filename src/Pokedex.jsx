import React, { useState, useEffect } from "react";
import { fetchGeneration, fetchPokemonDetails } from "./api";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [generation, setGeneration] = useState(1); // Default to Gen 1
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadPokemon = async () => {
      const species = await fetchGeneration(generation);
      setPokemonList(species);
    };
    loadPokemon();
  }, [generation]);

  const handleClick = async (name) => {
    const details = await fetchPokemonDetails(name);
    setSelectedPokemon(details);
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen bg-gray-100 dark:bg-gray-900`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Pokédex
          </h1>
          <button
            className="px-4 py-2 bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 rounded"
            onClick={() => setDarkMode(!darkMode)}
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>
        </div>

        {/* Search and Generation Selector */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search Pokémon..."
            className="w-full md:w-1/2 px-4 py-2 border rounded glass dark:text-white dark:placeholder-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="w-full md:w-1/4 px-4 py-2 border rounded glass dark:text-white"
            value={generation}
            onChange={(e) => setGeneration(e.target.value)}
          >
            {Array.from({ length: 9 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Generation {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Pokémon Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {filteredPokemon.map((pokemon) => (
            <div
              key={pokemon.name}
              className="p-4 bg-white/60 dark:bg-gray-800/60 rounded shadow glass hover:scale-105 cursor-pointer transition transform"
              onClick={() => handleClick(pokemon.name)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`}
                alt={pokemon.name}
                className="w-full h-24 object-contain"
              />
              <p className="text-center capitalize mt-2 text-gray-800 dark:text-gray-100">
                {pokemon.name}
              </p>
            </div>
          ))}
        </div>

        {/* Pokémon Modal */}
        {selectedPokemon && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-10">
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-lg p-6 glass w-4/5 sm:w-1/2 lg:w-1/3 relative">
              <button
                className="absolute top-2 right-2 text-gray-800 dark:text-gray-100"
                onClick={() => setSelectedPokemon(null)}
              >
                ✖
              </button>
              <button
                className="absolute top-2 left-2 text-gray-800 dark:text-gray-100 px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded"
                onClick={() => setSelectedPokemon(null)}
              >
                Back
              </button>
              <div className="text-center">
                <img
                  src={selectedPokemon.sprites.other["official-artwork"].front_default}
                  alt={selectedPokemon.name}
                  className="mx-auto w-32 h-32"
                />
                <h2 className="text-2xl font-bold capitalize mt-4 text-gray-800 dark:text-gray-100">
                  {selectedPokemon.name}
                </h2>
              </div>
              <div className="mt-4 text-gray-800 dark:text-gray-100">
                <p>
                  <strong>Height:</strong> {selectedPokemon.height / 10} m
                </p>
                <p>
                  <strong>Weight:</strong> {selectedPokemon.weight / 10} kg
                </p>
                <p>
                  <strong>Types:</strong> {selectedPokemon.types.map(t => t.type.name).join(", ")}
                </p>
                <p>
                  <strong>Stats:</strong>
                </p>
                <ul className="list-disc ml-6">
                  {selectedPokemon.stats.map((stat) => (
                    <li key={stat.stat.name}>
                      {stat.stat.name}: {stat.base_stat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokedex;
