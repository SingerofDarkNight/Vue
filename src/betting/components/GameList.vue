<template>
    <div class="game-bg">
        <div class="game-id" style="font-size: 20px">比赛编号: {{game.getId()}}</div>
        <div class="game-name">{{game.getName()}}</div>
		<div>{{ game.getBetAmountLowest() }}</div>
        <div class="game-deadline">
			下注截至日期:<br> <span class="warning-font">{{new Date(game.getEndTimeMs()).toLocaleDateString()}}</span>
		</div>
        <Button type="error" class="game-button" ghost @click="showDrawer = true">查看详情</Button>
		<Drawer v-model="showDrawer">
			<div class="bet-bg" v-for="(option, key) in game.getBettingOptionsList()" :key="key" :label="key">
				<div>
					<span class="bet-opt-name">
						{{option.getName()}}
					</span>
				</div>
				<div>
					<span class="bet-opt-odd">
						赔率: {{option.getOdds() / 1000000}}
					</span>
					<Input class="bet-money" v-model="moneyList[key]" placeholder="输入金额"/>
				</div>
			</div>
			<div class="bet-bg">
				<Button type="error" style="width:100%;" @click="updateBets()">下注</Button>
			</div>
		</Drawer>
    </div>
</template>

<script lang="ts">
import GameList from './game-list'

export default GameList;
</script>

<style>
.game-bg {
	width: 1200px;
	height: 170px;
	background: #fff;
	margin-bottom: 16px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 20px;
}

.game-id {
	flex-grow: 1;
	max-width: 150px;
}

.game-name {
	font-size: 36px;
	font-weight: 600;
	color: rgb(80, 80, 80);
	text-align: center;
	max-width: 400px;
	flex-grow: 2;
}

.warning-font {
	color: rgba(203, 64, 66, 1);
}

.game-deadline {
	width: 300px;
	height: 68px;
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	font-size: 16px;
	font-weight: 600;
	color: rgba(85, 85, 85, 1);
	text-align: center;
	/* max-width: 450px; */
	/* flex-grow: 1; */
}

.game-button {
	flex-grow: 1;
	max-width: 150px;
	margin-top: 20px;
}

.bet-opt-name {
	font-size: 20px;
	font-weight: bold;
}
.bet-opt-odd {
	color: orangered;
	font-size: 13px;
}

.bet-money {
	margin-top: 10px;
}

.bet-bg {
	width: 100%;
	margin-top: 25px;
	display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>


