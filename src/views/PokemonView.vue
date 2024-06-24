<template>
  <div>
    <div class="text-center p-4" v-if="!pokemon">
      <p>Loading...</p>
    </div>

    <div
      class="poke-preview"
      :style="`background-image: url(${imageUrl})`"
    ></div>
    <div class="poke-info">
      <div class="title">
        {{ name }}
      </div>

      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full mt-2 mb-2 font-medium"
        :class="`bg-${firstType}`"
      >
        <span
          class="inline-flex align-center content-center rounded-full w-4 h-6"
        >
          <img :src="`../src/assets/${firstType}-icon.svg`" width="100%" />
        </span>
        {{ firstType }}
      </div>

      <audio
        class="mb-2"
        :src="pokemon.cries.latest"
        controls
        autoPlay
        playsInline
        v-if="pokemon && pokemon.cries && pokemon.cries.latest"
      />

      <div v-else>
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 leading-6 text-sm shadow rounded-full text-gray-500 bg-gray-200 hover:bg-gray-100 transition ease-in-out duration-150 cursor-not-allowed mb-2"
          disabled=""
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing Audio...
        </button>
      </div>

      <div class="description">
        {{ description }}
      </div>

      <div class="stats divide-y">
        <div class="stat p-2">
          <div class="stat-icon w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="{className}"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 7h.01" />
              <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
              <path d="m20 7 2 .5-2 .5" />
              <path d="M10 18v3" />
              <path d="M14 17.75V21" />
              <path d="M7 18a6 6 0 0 0 3.84-10.61" />
            </svg>
          </div>
          <div class="stat-attr w-24">Species</div>
          <div class="stat-value">{{ species }}</div>
        </div>
        <div class="stat p-2">
          <div class="stat-icon w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="5" r="3" />
              <path
                d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"
              />
            </svg>
          </div>
          <div class="stat-attr w-24">Weight</div>
          <div class="stat-value">{{ pokemon.weight }}</div>
        </div>
        <div class="stat p-2">
          <div class="stat-icon w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="{className}"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"
              />
              <path d="m14.5 12.5 2-2" />
              <path d="m11.5 9.5 2-2" />
              <path d="m8.5 6.5 2-2" />
              <path d="m17.5 15.5 2-2" />
            </svg>
          </div>
          <div class="stat-attr w-24">Height</div>
          <div class="stat-value">{{ pokemon.height }}</div>
        </div>
        <div class="stat p-2">
          <div class="stat-icon w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="{className}"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 14 4-4" />
              <path d="M3.34 19a10 10 0 1 1 17.32 0" />
            </svg>
          </div>
          <div class="stat-attr w-24">Speed</div>
          <div class="stat-value">{{ getStat("speed") }}</div>
        </div>
        <div class="stat p-2">
          <div class="stat-icon w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="{className}"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
              />
            </svg>
          </div>
          <div class="stat-attr w-24">HP</div>
          <div class="stat-value">{{ getStat("hp") }}</div>
        </div>
        <div class="stat p-2">
          <div class="stat-icon w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="{className}"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
              <line x1="13" x2="19" y1="19" y2="13" />
              <line x1="16" x2="20" y1="16" y2="20" />
              <line x1="19" x2="21" y1="21" y2="19" />
            </svg>
          </div>
          <div class="stat-attr w-24">Attack</div>
          <div class="stat-value">{{ getStat("attack") }}</div>
        </div>
        <div class="stat p-2">
          <div class="stat-icon w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="{className}"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
              />
            </svg>
          </div>
          <div class="stat-attr w-24">Defense</div>
          <div class="stat-value">{{ getStat("defense") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemon: {},
      species: "",
      description: "",
    };
  },
  created() {
    this.fetchPokemon(this.$route.params.id);
  },
  computed: {
    name: function () {
      return this.pokemon && this.capitalizeFirstLetter(this.pokemon.name);
    },

    firstType: function () {
      return (
        this.pokemon && this.pokemon.types && this.pokemon.types[0].type.name
      );
    },
    lowerCaseType: function () {
      return this.firstType && this.firstType.toLowerCase();
    },
    imageUrl: function () {
      return (
        this.pokemon &&
        this.pokemon.sprites &&
        this.pokemon.sprites.other["official-artwork"].front_default
      );
    },
  },
  methods: {
    capitalizeFirstLetter: function (string) {
      return string && string.charAt(0).toUpperCase() + string.slice(1);
    },

    fetchPokemon(pokemonNumber) {
      //Get number from route then fetch from pokeapi
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
        .then((response) => response.json())
        .then((data) => {
          this.pokemon = data;

          this.fetchSpecies();
        });
    },

    getStat(stat) {
      return (
        this.pokemon &&
        this.pokemon.stats &&
        this.pokemon.stats.find((s) => s.stat.name === stat).base_stat
      );
    },

    fetchSpecies() {
      fetch(this.pokemon.species.url)
        .then((response) => response.json())
        .then((data) => {
          this.species = data.genera.find(
            (g) => g.language.name === "en"
          ).genus;

          this.description = data.flavor_text_entries.find(
            (g) => g.language.name === "en"
          ).flavor_text;
        });
    },
  },
};
</script>
