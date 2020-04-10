<template>
  <div class="container text-left">
    <h1>About Minesweeper</h1>

    <p>This application is deployed in an EC2 instance using Docker and is powered by the following technologies:</p>

    <p><b>Frontend:</b></p>
    <ul class="list-unstyled">
      <li>Node v12.14.1</li>
      <li>npm 6.14.4</li>
      <li>Vue 2.6.11</li>
      <li>Jquery 3.4.1</li>
      <li>Boostrap 4.4.1</li>
    </ul>

    <p><b>Backend:</b></p>
    <ul class="list-unstyled">
      <li>Go 1.12.6</li>
      <li>Gin Gonic 1.6.2</li>
      <li>Redis</li>
      <li>Swagger</li>
    </ul>

    <div class="text-center">
      <button class="btn btn-primary" @click="goPlay">Play</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  methods: {
    goPlay() {
      this.$router.push({ name: "Home" });
    }
  }
}
</script>