<template>
  <SearchBar @search="onSearch"  v-if="!isLoading" />

  <div class="flex flex-col px-4 gap-4">
    <Loader v-if="isLoading" />

    <PokemonList :pokemons="filteredPokemonList"  v-else />
  </div>
</template>

<script>
import localforage from 'localforage'

localforage.config({
    name: 'Pokedex'
});

import Loader from "../components/Loader.vue";
import SearchBar from "../components/SearchBar.vue";
import PokemonList from "../components/PokemonList.vue";

const TOTAL_POKEMON_TO_LOAD = 1000;

export default {
  components: {
    Loader,
    SearchBar,
    PokemonList,
  },
  data() {
    return {
      pokemonList: [],
      isLoading: true,
      keyword: "",
    };
  },
  async mounted() {
    this.pokemonList = await this.loadPokemonsFromCache();

    if (this.pokemonList.length < TOTAL_POKEMON_TO_LOAD) {
      this.pokemonList = await this.loadPokemonsFromApi();
    }

    this.isLoading = false;
  },
  computed: {
    filteredPokemonList() {
      return this.pokemonList
              .sort((a, b) => a.id - b.id)
              && this.pokemonList.filter((pokemon) => pokemon.name.includes(this.keyword)).sort((a, b) => a.id - b.id)
              || [];
    },
  },
  methods: {
    onSearch(keyword) {
      this.keyword = keyword;
    },

    async loadPokemonsFromCache () {
      return await localforage.getItem('pokemons') || [];
    },

    async loadPokemonsFromApi () {
      return fetch("https://pokeapi.co/api/v2/pokemon?limit=" + TOTAL_POKEMON_TO_LOAD)
        .then((response) => response.json())
        .then(async ({ results }) => {
          return Promise.all(results.map(this.fetchPokemonData))
                  .then (async (allPokemons) => {
                    await localforage.setItem('pokemons', allPokemons);

                    return allPokemons;
                  });
      });
    },

    async fetchPokemonData({ url }) {
      return fetch(url)
        .then((response) => response.json());
    },
  },
};
</script>
