<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="top-bar">
            <div class="logo-top-left"></div>
            <div>
              <MenuItem>
                <router-link to="/">主页</router-link>
              </MenuItem>
              <MenuItem>
                <router-link to="/about">赛事</router-link>
              </MenuItem>
              <MenuItem>韦恩大厦</MenuItem>
            </div>
          </div>
        </Menu>
      </Header>
      <Content>
        <router-view/>
      </Content>
    </Layout>
  </div>
</template>

<style>
html,
body,
.ivu-layout {
  width: 100%;
  height: 100%;
}

.ivu-layout-content {
  overflow: auto;
}

.ivu-layout-header,
.ivu-menu-dark {
  background: #001529;
}

.ivu-menu-horizontal {
  height: 100%!important;
}

.layout{
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.logo-top-left {
  float: left;
  width: 100px;
  height: 30px;
  background: url('./assets/imgs/logo-top.png');
  background-size: 100% 100%;
}

.home {
  width: 100%;
  height: 100%;
}
</style>
