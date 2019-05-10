<template>
	<div class="create-bg">
		<div>
			<drawer></drawer>
		</div>
		<div class="create-form-bg">
			<div class="create-form-title">
				创建比赛
			</div>
			<Form ref="formValidate" :model="formValidate" class="form-group-bg" :rules="ruleValidate">
				<FormItem class="form-item" label="名称" prop="name">
					<Input class="form-input" placeholder="输入名称" v-model="formValidate.name"/>
				</FormItem>
				<FormItem class="form-item" label="描述" prop="desc">
					<Input class="form-input" placeholder="输入描述" v-model="formValidate.desc"/>
				</FormItem>
				<FormItem class="form-item" label="最大注数" prop="limit">
					<Input class="form-input" placeholder="输入最大下注数" v-model="formValidate.limit"/>
				</FormItem>
				<FormItem class="form-item" label="最低金额" prop="lowest">
					<Input class="form-input" placeholder="输入最低下注金额" v-model="formValidate.lowest"/>
				</FormItem>
				<FormItem class="form-item" label="最高金额" prop="highest">
					<Input class="form-input" placeholder="输入最高下注金额" v-model="formValidate.highest"/>
				</FormItem>
				<FormItem class="form-item" label="下注截至日期" prop="enddate">
					<DatePicker type="date" placeholder="下注截日期" style="width: 300px" v-model="formValidate.enddate"></DatePicker>
				</FormItem>
				<!--<FormItem class="form-item" label="下注截至时间" prop="endtime">-->
				<!--<TimePicker type="time" placeholder="下注截时间" style="width: 300px" v-model="formValidate.endtime"></TimePicker>-->
				<!--</FormItem>-->
				<div class="form-option-bg" v-for="(option, key) in formValidate.betOptionList" :key="option.id">
					<div class="form-item form-option-item">下注选项: {{key}}</div>
					<FormItem class="form-item form-option-item" label="下注名称" :prop="option.name">
						<Input class="form-input" placeholder="输入下注选项名称" v-model="formValidate.betOptionList[key].name"/>
					</FormItem>
					<FormItem class="form-item form-option-item" label="下注赔率" :prop="option.odd">
						<Input class="form-input" placeholder="输入金额" v-model="formValidate.betOptionList[key].odd"/>
					</FormItem>
				</div>
			</Form>
			<div class="create-button-bg">
				<Button type="primary" @click="pushBetOption">添加选项</Button>
				<Button type="warning" @click="popBetOption">删除选项</Button>
				<Button type="success" @click="createGameRequest(formValidate)">创建比赛</Button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
  import Create from "./create-page"

  export default Create;
</script>

<style scoped>
	.create-bg {
		display: flex;
		flex-direction: row;
	}

	.create-form-bg {
		padding: 30px;
		width: 100%;
	}

	.create-form-title {
		background-color: white;
		text-align: center;
		font-size: 20px;
		font-weight: 500;
		color: rgba(0, 0, 0, 0.85);
	}

	.form-group-bg {
		margin-top: 50px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}

	.form-item {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 30%;
		font-weight: bold;
	}

	.form-input {
		width: 300px;
	}

	.form-option-bg {
		width: 30%;
		min-width: 350px;
	}

	.form-option-item {
		width: 500px;
		height: 50px;
		line-height: 50px;
	}

	.create-button-bg {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

</style>
