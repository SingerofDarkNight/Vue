<template>
  <div class="manage-bg">
    <div>
      <side-menu></side-menu>
    </div>
    <div class="manage-table-bg">
      <div class="manage-table-title">
        竞猜管理
      </div>
      <div class="manage-table">
        <Table :columns="manageCols" :data="manageData"></Table>
      </div>
    </div>
  </div>
</template>

<script>
  import SideMenu from '../components/sideMenu'

  export default {
    name: 'Manage',
    components: {SideMenu},
    data () {
      return {
        manageCols: [
          {
            title: '竞猜编号',
            key: 'name'
          },
          {
            title: '竞猜编号',
            key: 'age'
          },
          {
            title: '状态',
            key: 'address'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '管理'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        manageData: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .manage-bg {
    display: flex;
    flex-direction:row;
  }
  .manage-table-bg {
    background-color: #F0F2F5;
    height: 800px;
    width: 100%;
    padding: 20px;
  }

  .manage-table-title {
    background-color:white;
    text-align: center;
    font-size:20px;
    font-weight:500;
    color:rgba(0,0,0,0.85);
  }

  .manage-table {
    margin-top: 50px;
  }

</style>
