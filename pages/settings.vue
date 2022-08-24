<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="tabs">
        <div
          class="tab-item"
          :class="{ active: currentTab === 'email' }"
          @click="setTab('email')"
          >Update Email
        </div>
        <div
          class="tab-item"
          :class="{ active: currentTab === 'username' }"
          @click="setTab('username')"
          >Update Username
        </div>
        <div
          class="tab-item"
          :class="{ active: currentTab === 'password' }"
          @click="setTab('password')"
          >Update Password
        </div>
      </div>
      <SettingsUpdateEmail v-if="currentTab === 'email'" />
      <SettingsUpdateUsername v-if="currentTab === 'username'" />
      <SettingsUpdatePassword v-if="currentTab === 'password'" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "Settings",
  
  data() {
    return {
      currentTab: "email",
    }
  },

  methods: {
    setTab(tabName: string) {
      this.currentTab = tabName
    }
  }
})
</script>

<style scoped>
  .tabs {
    --tab-height: 1.75rem;

    width: 100%;
    height: var(--tab-height);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .25rem;
    position: fixed;
    bottom: 0; left: 0;
  }

  .tab-item {
    height: 100%;
    padding: 0 .25rem;
    font-size: .75rem;
    font-weight: bold;
    color: var(--dark-gray);
    line-height: var(--tab-height);
    cursor: pointer;
  }

  .tab-item.active {
    border-top: .125rem solid var(--blue);
  }
  
  @media screen and (min-width: 768px) {
    .tabs {
      justify-content: flex-start;
      position: sticky;
      top: 2.5rem; left: 0;
    }

    .tab-item.active {
      border-top: none;
      border-bottom: .125rem solid var(--blue);
    }
  }

</style>
