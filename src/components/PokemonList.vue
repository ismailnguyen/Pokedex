<template>
    <PokemonCard 
        v-for="pokemon in pokemons" 
        :key="pokemon.id" 
        :pokemon="pokemon" 
        @viewPokemon="viewPokemon" />
</template>

<script>
import PokemonCard from '../components/PokemonCard.vue'

export default {
    props: {
        pokemons: {
            type: Array,
            required: true
        }
    },
    components: {
        PokemonCard
    },
    methods: {
        viewPokemon(pokemon) {
            this.$router.push({ name: 'pokemon', params: { id: pokemon.id } })
        }
    }
}
</script>