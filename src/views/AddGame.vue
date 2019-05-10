<template>
  <div class="add-bg">
    <div>
      <side-menu></side-menu>
    </div>
    <div class="edit-bg">
      <div class="edit-title">
        新增比赛
      </div>
      <div class="edit-form-bg">
        <Form class="edit-form" :model="formLeft" label-position="left" :label-width="100">
          <FormItem label="赛事名称">
            <Input v-model="formLeft.input1"></Input>
          </FormItem>
          <FormItem label="比赛时间">
            <Input v-model="formLeft.input2"></Input>
          </FormItem>
          <FormItem label="主队名称">
            <Input v-model="formLeft.input3"></Input>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
  import SideMenu from '../components/sideMenu'
  export default {
    name: 'AddGame',
    components: {SideMenu},
    data () {
      return {
        formLeft: {
          input1: '',
          input2: '',
          input3: ''
        }
      }
    }
  }
</script>

<style scoped>
  .add-bg {
    display: flex;
    flex-direction:row;
  }
  .edit-bg {
    background-color: #F0F2F5;
    height: 800px;
    width: 100%;
    padding: 20px;
  }

  .edit-title {
    background-color:white;
    text-align: center;
    font-size:20px;
    font-weight:500;
    color:rgba(0,0,0,0.85);
  }

  .edit-form-bg {
    margin-top: 50px;
    background-color: white;
  }
  .edit-form {
    padding: 10px;
  }

</style>
