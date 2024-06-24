<template>
    <header id="header">
    <div class="header-left" @click="pushButton" />
    <div class="header-right right-0" />
    </header>
</template>


<script>
export default {
    name: 'Header',
    methods: {
        pushButton: function () {
            this.$router.push({ name: 'home' })
        }
    }
}
</script>