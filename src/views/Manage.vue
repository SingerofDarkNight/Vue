<template>
	<div class="manage-bg">
		<div>
			<drawer></drawer>
		</div>
		<div class="manage-table-bg">
			<div class="manage-table-title">
				管理比赛
			</div>
			<div class="manage-table">
				<div class="table-col">
					<div class="table-item">竞猜编号</div>
					<div class="table-item">竞猜名称</div>
					<div class="table-item">截止时间</div>
					<div class="table-item">操作</div>
				</div>
				<div v-for="game in gamesList" class="table-data" :key="game.id">
					<div class="table-item">{{game.getId()}}</div>
					<div class="table-item">{{game.getName()}}</div>
					<div class="table-item">{{new Date(game.getEndTimeMs()).toUTCString()}}</div>
					<div class="table-item table-action">
						<Button class="table-button" type="primary">详情</Button>
						<Button class="table-button" type="error">删除</Button>
					</div>
					<div class="table-divider"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="tsx">
  import Vue, {CreateElement, VNode} from "vue";
  import Component from "vue-class-component";
  import SideDrawer from "../components/drawer.vue"
  import {ApiService} from '@/common/api.service';
  import {ListGameReply, ListGameRequest, Game} from '@/proto/bbuhot/service/game_pb'

  @Component({
    components: {
      drawer: SideDrawer,
    }
  })

  export default class Manage extends Vue {

    gamesList: Array<Game> = new Array<Game>();

    // request
    private async listGameRequest() {
      const listGameRequest = new ListGameRequest();
      listGameRequest.setGameStatus(Game.Status.PUBLISHED);
      listGameRequest.setIsAdminRequest(true);

      var listGameReply: ListGameReply = await ApiService.listGame(listGameRequest);

      if (listGameReply.hasAuthErrorCode()) {
        // TODO: deal with error.
      }

      this.gamesList = listGameReply.getGamesList();
    }

    async mounted() {
      this.listGameRequest();
    }
  }
</script>

<style scoped>
	.manage-bg {
		display: flex;
		flex-direction: row;
	}

	.manage-table-bg {
		padding: 30px;
		width: 100%;
		text-align: center;
	}

	.manage-table-title {
		background-color: white;
		text-align: center;
		font-size: 20px;
		font-weight: 500;
		color: rgba(0, 0, 0, 0.85);
	}

	.manage-table {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.table-col {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		font-size: 22px;
		font-weight: bold;
	}

	.table-data {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		background: white;
	}

	.table-item {
		flex-grow: 1;
		height: 50px;
		line-height: 50px;
		max-width: 450px;
		border-bottom: 1px solid rgba(81, 90, 110, 0.1);
	}

	.table-action {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.table-button {
		margin: 10px;
		flex-grow: 1;
	}

</style>
