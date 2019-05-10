<template>
	<div class="create-bg">
		<div>
			<drawer></drawer>
		</div>
		<div class="create-form-bg">
			<div class="create-form-title">
				创建比赛
			</div>
			<Form ref="formValidate" class="form-group-bg" :rules="ruleValidate">
				<FormItem class="form-item" label="名称" prop="name">
					<Input class="form-input" placeholder="输入名称"/>
				</FormItem>
				<FormItem class="form-item" label="描述" prop="desc">
					<Input class="form-input" placeholder="输入描述"/>
				</FormItem>
				<FormItem class="form-item" label="普通用户可见" prop="visible">
					<Select style="width:300px">
						<Option v-for="item in formValidate.visibleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem class="form-item" label="状态" prop="status">
					<Select style="width:300px">
						<Option v-for="item in formValidate.statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem class="form-item" label="最大注数" prop="limit">
					<Input class="form-input" placeholder="输入最大下注数"/>
				</FormItem>
				<FormItem class="form-item" label="最低金额" prop="lowest">
					<Input class="form-input" placeholder="输入最低下注金额"/>
				</FormItem>
				<FormItem class="form-item" label="最高金额" prop="highest">
					<Input class="form-input" placeholder="输入最高下注金额"/>
				</FormItem>
				<FormItem class="form-item" label="下注截至日期" prop="enddate">
					<DatePicker type="date" placeholder="下注截日期" style="width: 300px"></DatePicker>
				</FormItem>
				<FormItem class="form-item" label="下注截至时间" prop="endtime">
					<TimePicker type="time" placeholder="下注截时间" style="width: 300px"></TimePicker>
				</FormItem>
				<div class="form-option-bg" v-for="(option, key) in betOptionList" :key="option.id">
					<div class="form-item form-option-item">下注选项: {{key}}</div>
						<FormItem class="form-item form-option-item" label="下注名称" prop="betOptionList[key].name">
							<Input class="form-input" placeholder="输入下注选项名称"/>
						</FormItem>
						<FormItem class="form-item form-option-item" label="下注赔率" prop="betOptionList[key].odd">
							<Input class="form-input" placeholder="输入金额"/>
						</FormItem>
				</div>
			</Form>
			<div class="create-button-bg">
				<Button type="primary" @click="addBetOption">添加选项</Button>
				<Button type="success" @click="createGameRequest(formValidate)">创建比赛</Button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import SideDrawer from "../components/drawer.vue"


  @Component({
    components: {
      drawer: SideDrawer,
    }
  })
  export default class Create extends Vue {

    private formValidate: Object = new Object({
      name: String,
      desc: String,
      limit: Number,
      lowest: Number,
      highest: Number,
      enddate: Number,
      endtime: Number,
      money: Number,
      visibleList: [
        {
          value: 0,
          label: "否"
        },
        {
          value: 1,
          label: "是"
        }
      ],
      statusList: [
        {
          value: 0,
          label: "草稿"
        },
        {
          value: 1,
          label: "公开"
        }, {
          value: 2,
          label: "封盘"
        }, {
          value: 3,
          label: "取消"
        },
        /*
				 缺少   This will kick of worker to pay the rewards. optional Status status = 5
				 */
      ],
    });

    private ruleValidate: Object = new Object({
      name: [
        {required: true, message: '名称不能为空', trigger: 'blur'}
      ],
      desc: [
        {required: true, message: '描述不能为空', trigger: 'blur'}
      ],
      limit: [
        {required: true, message: '最大下注数不能为空', trigger: 'blur'}
      ],
      lowest: [
        {required: true, message: '最低下注金额不能为空', trigger: 'blur'}
      ],
      highest: [
        {required: true, message: '最高下注金额不能为空', trigger: 'blur'}
      ],
      enddate: [
        {required: true, message: '截至日期不能为空', trigger: 'blur'}
      ],
      money: [
        {required: true, message: '金额不能为空', trigger: 'blur'}
      ],
    });

    private betOptionList = [
      {
        name: '',
        odd: 1
      },
    ];

    private addBetOption() {
      this.betOptionList.push({
        name: '',
        odd: 1
      });
    }

    private createGameRequest(name: any) {
      console.log(name);
    }

    mounted() {
    }
  }
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

	.form-group-bg  {
		margin-top: 50px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}

	.form-item  {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 30%;
		min-width: 350px;
		font-weight: bold;
	}

	.form-input  {
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

	.create-button-bg  {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

</style>
