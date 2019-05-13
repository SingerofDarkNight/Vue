<template>
  <div>
    <div class="content-bg">
      <div class="content-pic-font"></div>
      <stat-card></stat-card>
    </div>
    <div>
      <stat-table></stat-table>
    </div>
  </div>
</template>

<script lang="ts">
  import StatPage from "./stat-page"

  export default StatPage;
</script>

<style scoped>

  .content-bg {
    width: 100%;
    height: 400px;
    background: url('../../assets/imgs/bg.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
  }

  .content-pic-font {
    width: 600px;
    height: 160px;
    background: url('../../assets/imgs/banner.png');
    background-size: 100% 100%;
  }
</style>
