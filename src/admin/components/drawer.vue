<template>
	<div class="drawer-bg">
		<div @click="showDrawer">
			<Icon class="drawer-icon" size="24" type="ios-apps"/>
		</div>
		<Drawer title="导航栏" placement="left" :closable="false" v-model="isShowDrawer">
			<div @click="goTo('manage')">
				<div class="drawer-item">管理比赛</div>
			</div>
			<Divider />
			<div @click="goTo('create')">
				<div class="drawer-item">创建比赛</div>
			</div>
		</Drawer>
	</div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component
  export default class SideDrawer extends Vue {
    isShowDrawer: boolean = Boolean();

    private showDrawer() {
      this.isShowDrawer = !this.isShowDrawer;
    }
    private goTo(path: string) {
      if (path === 'manage') {
        this.$router.push('/admin/manage')
      } else if (path === 'create') {
        this.$router.push('/admin/create')
      }
      this.isShowDrawer = false;
    }
  }
</script>

<style scoped>
	.drawer-bg {
		height: 100%;
		background-color: #565f6d;
		width: 50px;

		display: flex;
		flex-direction: column;
	}

	.drawer-icon{
		cursor: pointer;
		height: 50px;
		color: white;
		margin-top: 10px;
		padding: 5px;
	}

	.drawer-item {
		font-size: 18px;
		padding: 5px;
		border-radius: 5px;
		text-align: center;
		cursor: pointer;
		transition: 0.2s
	}
	.drawer-item:hover {
		background: #2f8cf0;
		color: white;
	}

</style>
