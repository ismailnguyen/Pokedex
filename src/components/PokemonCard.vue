<template>
  <div
    class="flex rounded-xl cursor-pointer"
    :class="`bg-100-${lowerCaseType}`"
    @click="viewPokemon(pokemon)"
  >
    <div class="flex-1 flex flex-col justify-center pl-4">
      <span class="text-xs font-medium">#{{ pad(pokemon.id) }}</span>
      <h2 class="text-xl font-bold">
        {{ name }}
      </h2>
      <div>
        <div
          class="inline-flex items-center gap-2 px-2 py-1 text-xs rounded-full mt-2 font-medium"
          :class="`bg-${ lowerCaseType }`"
        >
          <span
            class="inline-flex align-center content-center rounded-full w-3 h-3"
          >
            <img :src="`/images/${ lowerCaseType }-icon.svg`" width="100%" />
          </span>
          {{ firstType }}
        </div>
      </div>
    </div>
    <div class="flex-1 relative h-32">
      <div
        class="absolute bg-gray-200 rounded-xl bg-cover bg-center top-2 right-2 bottom-2 left-2"
        :style="`background-image: url(${ imageUrl })`"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  computed: {
    name: function () {
      return this.pokemon && this.capitalizeFirstLetter(this.pokemon.name);
    },
    firstType: function () {
      return this.pokemon.types[0].type.name;
    },
    lowerCaseType: function () {
      return this.firstType.toLowerCase();
    },
    imageUrl: function () {
      return `/images/sprites/thumbnails/${ this.pad(this.pokemon.id) }.png`;
    },
  },
  methods: {
    capitalizeFirstLetter: function (string) {
      return string && string.charAt(0).toUpperCase() + string.slice(1);
    },
    pad(number) {
      return number.toString().padStart(3, "0");
    },
    viewPokemon(pokemon) {
      this.$emit("viewPokemon", pokemon);
    },
  },
};
</script>
