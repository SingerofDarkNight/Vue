<template>
  <div class="stat-table-bg">
    <div class="stat-button-bg">
      <Button class="stat-button" type="success" :ghost="ghost[0]" @click="switchData(0)">未结算</Button>
      <Button class="stat-button" type="error" :ghost="ghost[1]" @click="switchData(1)">已结算</Button>
    </div>
    <div class="stat-table">
      <Table :columns="cols"></Table>
    </div>
    <div class="stat-pagination-bg">
      <Page :total="100"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({})
  export default class statTable extends Vue {
    ghost = [true, false];
    cols = [

      {
        title: '下注编号',
        key: 'key1'
      },
      {
        title: '菠菜编号',
        key: 'key2'
      },
      {
        title: '菠菜名称',
        key: 'address'
      },
      {
        title: '下注名称',
        key: 'address'
      },
      {
        title: '下注时间',
        key: 'key2'
      },
      {
        title: '结算时间',
        key: 'key2'
      },
      {
        title: '胜负状态',
        key: 'key2'
      },
      {
        title: '下注金额',
        key: 'key2'
      },
      {
        title: '获得金额',
        key: 'key2'
      },
    ];

    switchData(idx: number) {
      this.ghost = [true, true];
      this.ghost[idx] = false
    }
  }
</script>

<style scoped>
  .stat-table-bg {
    padding: 20px;
    margin: 20px;
  }

  .stat-button-bg {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .stat-button {
    width: 10%;
    margin-left: 10px;
    margin-right: 10px;
  }

  .stat-table {
    margin-top: 20px;
    background-color: white;
  }

  .stat-pagination-bg {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
