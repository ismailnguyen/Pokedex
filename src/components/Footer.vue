<template>
    <div class="h-24">
        </div>
        <div class="bg-pokeball">
    </div>
    <footer id="footer" class="flex">
        <a class="menu-item flex-1 flex justify-center" @click="pushButton">
            <img src="../assets/IconSnap.png"  class="-mt-4" />
        </a>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    methods: {
        pushButton: function () {
            // On home page, the button trigger the search input
            if (this.$route.name == 'home') {
                document.getElementById('simple-search').focus()
            } else {
                this.$router.push({ name: 'home' })
            }
            
        }
    }
}
</script>





