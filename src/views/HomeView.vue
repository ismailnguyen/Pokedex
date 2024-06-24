<template>
  <SearchBar @search="onSearch" />

  <div class="flex flex-col px-4 gap-4">
    <Loader v-if="isLoading" />

    <PokemonList :pokemons="filteredPokemonList"  v-else />
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
import SearchBar from "../components/SearchBar.vue";
import PokemonList from "../components/PokemonList.vue";

const TOTAL_POKEMON_TO_LOAD = 800;

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
    this.fetchPokemonList();
  },
  computed: {
    filteredPokemonList() {
      return this.pokemonList.filter((pokemon) => pokemon.name.includes(this.keyword));
    },
  },
  methods: {
    onSearch(keyword) {
      this.keyword = keyword;
    },

    async fetchPokemonList() {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=" + TOTAL_POKEMON_TO_LOAD)
        .then((response) => response.json())
        .then((allpokemon) => {
          allpokemon.results.forEach((pokemon) => {
            this.fetchPokemonData(pokemon);
          });
        });
    },

    async fetchPokemonData(pokemon) {
      let url = pokemon.url;
      fetch(url)
        .then((response) => response.json())
        .then((pokeData) => {
          this.pokemonList.push(pokeData);

          if (this.pokemonList.length === TOTAL_POKEMON_TO_LOAD) {
            this.isLoading = false;
          }
        });
    },
  },
};
</script>
