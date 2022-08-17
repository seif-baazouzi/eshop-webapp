<template>
  <div class="loading-page" v-if="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  position: fixed;
  top: 0; left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
  z-index: 10000;
}

p {
  width: 8rem;
  font-size: 1rem;
  position: relative;
  aspect-ratio: 1 / 1;
  line-height: 8rem;
  text-align: center;
  font-weight: bold;
  letter-spacing: .075rem;
}

p::before {
  content: "";

  width: 100%;
  height: 100%;
  position: absolute;
  top: 0; left: 0;
  border-radius: 50%;
  border: .5rem solid;
  border-color: var(--black) transparent var(--black) transparent;
  animation: lds-dual-ring 1.5s ease-out infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
