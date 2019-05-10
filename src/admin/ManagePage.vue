<template>
	<div class="manage-bg">
		<div>
			<admin-drawer></admin-drawer>
		</div>
		<div class="manage-table-bg">
			<div class="manage-table-title">
				管理比赛
			</div>
			<admin-game-list></admin-game-list>
		</div>
	</div>
</template>

<script lang="tsx">
import Manage from "./manage-page"

export default Manage;
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
