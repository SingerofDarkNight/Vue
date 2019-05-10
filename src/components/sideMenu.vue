<template>
  <div class="side-menu-wrapper">
    <div @click="goTo('manage')">
      <Icon class="side-menu-wrapper-item" size="36" type="md-cash"/>
    </div>
    <div @click="goTo('add')">
      <Icon class="side-menu-wrapper-item" size="36" type="md-add"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sideMenu',
    methods: {
      goTo(path) {
        if (path === 'manage') {
          this.$router.push('/admin/manage')
        } else if (path === 'add') {
          this.$router.push('/admin/add')
        }
      }
    }
  }
</script>

<style scoped>
  .side-menu-wrapper {
    height: 800px;
    background-color: #565f6d;
    width: 50px;

    display: flex;
    flex-direction: column;
  }

  .side-menu-wrapper-item {
    height: 50px;
    color: white;
    margin-top: 10px;
    padding: 5px;
  }
</style>
