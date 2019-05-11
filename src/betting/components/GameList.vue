<template>
    <div class="game-bg">
        <div class="game-id" style="font-size: 20px">比赛编号: {{game.getId()}}</div>
        <div class="game-name">{{game.getName()}}</div>
        <div class="game-deadline">
			下注截至日期:<br> {{new Date(game.getEndTimeMs()).toLocaleDateString()}}
		</div>
        <Button class="game-button" @click="showDrawer = true">查看详情</Button>
		<Drawer v-model="showDrawer">
			<div size="large" class="bet-bg" v-for="(option, key) in game.getBettingOptionsList()" :key="key" :label="key">
				<span class="bet-opt-name">
					{{option.getName()}}
				</span>
				<br>
				<span class="bet-opt-odd">
					赔率: {{option.getOdds() / 1000000}}
				</span>
				<Input class="bet-money" v-model="moneyList[key]" placeholder="输入金额"/>
			</div>
			<Button class="game-button" @click="updateBets()">下注</Button>
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
	font-size: 48px;
	font-weight: 600;
	color: rgba(245, 51, 19, 1);
	text-align: left;
	max-width: 400px;
	flex-grow: 2;
}

.game-deadline {
	width: 400px;
	height: 68px;
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	font-size: 16px;
	font-weight: 600;
	color: rgba(85, 85, 85, 1);
	text-align: center;
	max-width: 450px;
	flex-grow: 1;
}

.game-button {
	flex-grow: 1;
	max-width: 150px;
}

.bet-opt-name {
	font-size: 20px;
	font-weight: bold;
}
.bet-opt-odd {
	color: orangered;
}

.bet-money {
	max-width: 150px;
}
</style>


