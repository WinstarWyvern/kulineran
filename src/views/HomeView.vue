<template>
  <div class="home">
    <NavbarComponent />
  </div>
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue'
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
    NavbarComponent
  }
}
</script>
