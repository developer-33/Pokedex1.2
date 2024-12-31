// src/api.js
import axios from 'axios';

export const fetchGeneration = async (id) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/generation/${id}`);
  return data.pokemon_species;
};

export const fetchPokemonDetails = async (name) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return data;
};
