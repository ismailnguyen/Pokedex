<script setup>
</script>

<template>
   <div class="mt-12 p-4">
          <form class="flex items-center">   
            <label htmlFor="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
                <div class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                  <svg class="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  v-model="keyword"
                  id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-12 p-4  text-lg" placeholder="Search..." required />
            </div>
        </form>
      </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ''
    }
  },
  watch: {
    keyword: function (newKeyword) {
      this.$emit('search', newKeyword)
    }
  }
}
</script>