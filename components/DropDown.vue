<template>
  <div class="menu-toggle" tabindex="-1">
    <span>…</span>
    <div class="options">
      <span class="edit" @click="$emit('edit')">Edit</span>
      <span class="delete" @click="$emit('delete')">Delete</span>
    </div>
  </div>
</template>

<style scoped>
  .menu-toggle {
    position: absolute;
    top: 0; right: 0;
    font-size: 1.5rem;
    cursor: pointer;
    user-select: none;
  }

  .options {
    padding: .25rem;
    position: absolute;
    top: .25rem; right: 0;
    background: var(--white);
    border-radius: .5rem;
    box-shadow: var(--shadow);
    display: none;
  }

  .menu-toggle:focus .options {
    display: block;
  }

  .options span {
    min-width: 4rem;
    display: block;
    font-size: .75rem;
    padding: .5rem;
    border-radius: .5rem;
    font-weight: bold;
  }

  .options span:hover {
    background: var(--light-gray);
  }

  .delete {
    color: var(--red);
  }
</style>
