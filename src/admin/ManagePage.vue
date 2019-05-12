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
		height: 100%;
	}

	.manage-table-bg {
		padding: 30px;
		width: 100%;
		text-align: center;
	}

	.manage-table-title {
		display: flex;
		padding: 5px;
		font-size: 20px;
		font-weight: 500;
		color: rgba(0, 0, 0, 0.85);
	}

</style>
