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
				<Table :columns="tableCols" :data="tableData"></Table>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import SideDrawer from "../components/drawer.vue"
  import {ApiService} from '@/common/api.service';
  import {ListGameReply, ListGameRequest, Game} from '@/proto/bbuhot/service/game_pb'

    class TableCols {
    public title: string;
    public key: string;
    public render: any;

    constructor(title: string, key: string, render?: any) {
      this.title = title;
      this.key = key;
      this.render = render;
    }
  }

  class TableData {
    public id:number;
    public name: string;
    public endTime: string;

    constructor(id: number, name: string, endTimeTs: number) {
      this.id = id;
      this.name = name;
      this.endTime = new Date(endTimeTs).toUTCString();
    }
  }

  @Component({
    components: {
      drawer: SideDrawer,
    }
  })

  export default class Manage extends Vue {

    gamesList: Array<Game> = new Array<Game>();

    tableCols: Array<TableCols> = new Array<TableCols>();

    tableData: Array<TableData> = new Array<TableData>();

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

      this.gamesList.forEach(game => {
        console.log('manage list', game);
        var data: TableData = new TableData(
            game.getId()!,
            game.getName()!,
            game.getEndTimeMs()!
        );
        this.tableData.push(data);
      });
    }

    private initTable() {
      var col1: TableCols = new TableCols('竞猜编号', 'id');
      var col2: TableCols = new TableCols('竞猜名称', 'name');
      var col3: TableCols = new TableCols('截止时间', 'endTime');
      // var col4: TableCols = new TableCols('操作', 'action');
      this.tableCols.push(col1);
      this.tableCols.push(col2);
      this.tableCols.push(col3);
    }


    async mounted() {
      this.initTable();
      this.listGameRequest();
    }
  }
</script>

<style scoped>
	.manage-bg {
		display: flex;
		flex-direction:row;
	}

	.manage-table-bg {
		padding: 30px;
	}

	.manage-table-title {
		background-color:white;
		text-align: center;
		font-size:20px;
		font-weight:500;
		color:rgba(0,0,0,0.85);
	}

	.manage-table {
		margin-top: 50px;
	}

</style>
