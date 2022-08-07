<template>
  <div class="pop-up">
    <div class="close" @click="$emit('close')">✖</div>
    <div class="box">
      <slot />
    </div>
  </div>
</template>

<style scoped>
  .pop-up {
    width: 100%;
    min-height: 100vh;
    padding: 1rem;
    position: fixed;
    top: 0; left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .6);
    z-index: 1000000;
  }

  .close {
    color: #fff;
    padding: .5rem;
    font-weight: bold;
    font-size: 1.5rem;
    position: absolute;
    top: 1rem; right: 2rem;
    cursor: pointer;
  }

  .box {
    width: 100%;
    max-width: 520px;
    padding: 1rem;
    background: var(--white);
    border-radius: .25rem;
    box-shadow: var(--shadow);
  }
</style>
