<template>
  <div class="about">
    <div>
      <div class="content-bg">
        <div class="content-pic-font"></div>
        <headPic></headPic>
      </div>
      <div class="content-game-title">
        <div class="coming-game"></div>
      </div>
      <div class="game-content">
        <gameList></gameList>
      </div>
    </div>
  </div>
</template>

<script>

import headPic from '../components/headPic.vue';
import gameList from '../components/gameList.vue';

export default {
  components: {
    headPic,
    gameList
  },
  name: 'home',
  data() {
    return {
    }
  },
}
</script>

<style>
.content-bg {
  width: 100%;
  height: 400px;
  background: url('../assets/imgs/bg.png');
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
}

.content-pic-font {
  width: 600px;
  height: 160px;
  background: url('../assets/imgs/banner.png');
  background-size: 100% 100%;
}

.coming-game {
  width: 221px;
  height: 66px;
  background: url('../assets/imgs/logo.png');
  background-size: 100% 100%;
}

.content-game-title {
  padding: 50px;
}

.game-content {
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>

