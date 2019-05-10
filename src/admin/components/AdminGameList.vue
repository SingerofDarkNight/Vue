<template>
	<div>
		<div class="manage-status-bg">
				<Button class="status-button" type="info" @click="changeGameStatus(0)">草稿</Button>
				<Button class="status-button" type="success" @click="changeGameStatus(1)">公开</Button>
				<Button class="status-button" type="warning" @click="changeGameStatus(2)">已结算</Button>
				<Button class="status-button" type="error" @click="changeGameStatus(3)">已取消</Button>
		</div>
		<div class="status-str">
			{{this.statusStr[this.gameStatus]}}
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
</template>

<script lang="ts">
import AdminGameList from "./admin-game-list"

export default AdminGameList;
</script>

<style scoped>

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

	.manage-status-bg {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-content: center;
		margin: 20px;
	}

	.status-str {
		background: white;
		font-size: 26px;
		font-weight: bold;
	}

	.status-button {
		flex-grow: 1;
		max-width: 200px;
		min-width: 100px;
	}
</style>
