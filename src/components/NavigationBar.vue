<template>
    <el-menu
    default-active="2"
    class="ar-navigation-bar"
    :collapse="true"
    mode="horizontal"
  >
    <el-menu-item index="1">
      <router-link to="/">
        <el-icon >
          <location style="width: 5rem; height: 5rem;" />
        </el-icon>
      </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/map">
        <el-icon>
          <Compass style="width: 5rem; height: 5rem;" />
        </el-icon>
      </router-link>  
    </el-menu-item>
    <el-menu-item index="3">
      <router-link to="/locations">
        <el-icon>
          <MessageBox style="width: 5rem; height: 5rem;" />
        </el-icon>
      </router-link>
    </el-menu-item>
  </el-menu>
</template>
<style>
.ar-navigation-bar {
    width: 90vw!important;
    height: 10vh;
    border: solid 1px var(--el-menu-border-color)!important;
    border-radius: 100px;
    justify-content: center;
}
.navigation-bar .el-menu-item {
  width: 20vw;
}
.navigation-bar .el-menu-item .el-icon {
  display: flex;
  width: 100%!important;
  height: 100%;
}
.navigation-bar .el-menu-item a {
  width: 100%;
  height: 100%;
}
</style>
