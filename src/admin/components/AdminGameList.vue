<template>
	<div>
		<div class="manage-status-bg">
				<Button class="status-button" type="info" @click="changeGameListRequest(0)">草稿</Button>
				<Button class="status-button" type="success" @click="changeGameListRequest(1)">发布</Button>
				<Button class="status-button" type="warning" @click="changeGameListRequest(2)">结算</Button>
				<Button class="status-button" type="error" @click="changeGameListRequest(3)">流局</Button>
		</div>
		<div class="status-str">
			{{this.statusStr[this.gameStatus]}}
		</div>
		<div class="manage-table">
			<div class="table-col">
				<div class="table-item">竞猜编号</div>
				<div class="table-item">竞猜名称</div>
				<div class="table-item">截止时间</div>
				<div class="table-item">用户可见</div>
				<div class="table-item">操作</div>
			</div>
			<div v-for="game in gamesList" class="table-data" :key="game.id">
				<div class="table-item">{{game.getId()}} {{game.getStatus()}}</div>
				<div class="table-item">{{game.getName()}}</div>
				<div class="table-item">{{new Date(game.getEndTimeMs()).toLocaleDateString()}}</div>
				<div class="table-item">{{game.getNormalUserVisible()}}</div>
				<div class="table-item table-action">
					<Button v-if="gameStatus === 0" class="table-button" type="primary" @click="changeGameStatusRequest(game, 1)">发布</Button>
					<Button v-else-if="gameStatus === 1" class="table-button" type="primary" @click="editGame(game)">编辑</Button>
					<Button v-if="gameStatus === 1" class="table-button" type="success" @click="settledDrawer(game)">结算</Button>
					<Button v-if="gameStatus === 3" class="table-button" type="primary" @click="changeGameStatusRequest(game, 1)">发布</Button>
					<Button v-if="gameStatus === 1" class="table-button" type="error"  @click="changeGameStatusRequest(game, 3)">流局</Button>
				</div>
				<Drawer
						title="结算比赛"
						v-model="showSettleDrawer"
						width="720"
						:mask-closable="false"
				>
					<CheckboxGroup v-model="settleIdList">
						<div class="settle-item-bg" v-for="(opt,key) in settleGame.getBettingOptionsList()" :key="opt.id">
							<div class="edit-item-checkbox-bg">
								<Checkbox :label="key" class="settle-item-checkbox" size="large">
								</Checkbox>
							</div>
							<div class="settle-item-title">
								{{opt.getName()}} : {{opt.getOdds()}}
							</div>
						</div>
					</CheckboxGroup>
					<div class="edit-button-bg">
						<Button class="edit-button" @click="settleGameRequest"  type="success">结算</Button>
						<Button class="edit-button" @click="showSettleDrawer = !showSettleDrawer" type="error">取消</Button>
					</div>
				</Drawer>
				<!--Edit game drawer start-->
				<Drawer
						title="编辑比赛"
						v-model="showEditDrawer"
						width="720"
						:mask-closable="false"
				>
					<div class="edit-drawer-bg">
						<div class="edit-item-bg">
							<div class="edit-item-title">名称</div>
							<Input v-model="editModel.name" size="large" class="edit-item-input" placeholder="输入名称" style="width: 300px" />
						</div>
						<div class="edit-item-bg">
							<div class="edit-item-title">描述</div>
							<Input v-model="editModel.desc" size="large"  class="edit-item-input" placeholder="输入名称" style="width: 300px" />
						</div>
						<div class="edit-item-bg">
							<div class="edit-item-title">普通用户是否可见</div>
							<div class="edit-item-checkbox-bg">
								<Checkbox class="edit-item-checkbox" v-model="editModel.visible" size="large">
								</Checkbox>
							</div>
						</div>
						<div class="edit-item-bg">
							<div class="edit-item-title">比赛状态:</div>
							<div class="edit-item-str">{{editModel.statusStr}}</div>
						</div>
						<div class="edit-item-bg">
							<div class="edit-item-title">最多下注数</div>
							<Input v-model="editModel.limit" size="large"  class="edit-item-input" placeholder="输入名称" style="width: 300px" />
						</div>
						<div class="edit-item-bg">
							<div class="edit-item-title">最低金额</div>
							<Input v-model="editModel.lowest" size="large"  class="edit-item-input" placeholder="输入名称" style="width: 300px" />
						</div>
						<div class="edit-item-bg">
							<div class="edit-item-title">最高金额</div>
							<Input v-model="editModel.highest" size="large"  class="edit-item-input" placeholder="输入名称" style="width: 300px" />
						</div>
						<div class="edit-item-bg">
							<div class="edit-item-title">下注截至日期</div>
							<DatePicker  v-model="editModel.endTimeStr" class="edit-item-picker" type="date" placeholder="Select date"></DatePicker>
						</div>
						<div v-for="(option, key) in editModel.bettingOptionList" :key="option.id">
							<div class="edit-item-bg">
								<div class="edit-item-title">{{key}}</div>
								<Input v-model="editModel.bettingOptionList[key].name" size="large"  class="edit-item-input" placeholder="输入名称" style="width: 300px" />
								<Input v-model="editModel.bettingOptionList[key].odd" size="large"  class="edit-item-input" placeholder="赔率" style="width: 300px" />
							</div>
						</div>
					</div>
					<div class="edit-button-bg">
						<Button class="edit-button" @click="pushBetOption()" type="primary">添加</Button>
						<Button class="edit-button" @click="popBetOption()" type="warning">删除</Button>
					</div>
					<div class="edit-button-bg">
						<Button class="edit-button" @click="updateGameRequest(editModel)" type="success">更新</Button>
						<Button class="edit-button" @click="showEditDrawer = !showEditDrawer" type="error">取消</Button>
					</div>
				</Drawer>
				<!--Edit game drawer end-->

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
		justify-content: space-between;
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
		max-width: 20%;
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

	.edit-drawer-bg {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-content: flex-start;
		padding: 20px;
	}

	.edit-item-bg {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-content: center;
		height: 50px;
	}

	.edit-item-title {
		text-align: center;
		line-height: 36px;
	}

	.edit-item-input {
		margin-left: 10px;
		width: 300px;
	}

	.edit-item-checkbox-bg {
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 36px;
	}

	.edit-item-str {
		margin-left: 10px;
		line-height: 36px;
		font-size: 16px;
		font-weight: bold;
	}

	.edit-item-picker {
		width: 300px;
		margin-left: 10px;
	}

	.edit-button-bg {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-content: center;
	}

	.edit-button {
		flex-grow: 1;
		margin: 10px;
	}

	.settle-item-bg {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-content: center;
		height: 50px;
	}

	.settle-item-title {
		font-size: 22px;
		font-weight: bold;
	}

</style>
