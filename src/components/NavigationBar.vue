<template>
    <el-menu
    default-active="2"
    class="ar-navigation-bar"
    :collapse="true"
    mode="horizontal"
  >
    <el-menu-item index="1">
      <router-link to="/"><el-icon><location /></el-icon></router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/map"><el-icon><Compass /></el-icon></router-link>  
    </el-menu-item>
    <el-menu-item index="3">
      <router-link to="/locations"><el-icon><MessageBox /></el-icon></router-link>
    </el-menu-item>
  </el-menu>
</template>
<style>
.ar-navigation-bar {
    width: 95%!important;
    height: 200px;
    border: solid 1px var(--el-menu-border-color)!important;
    border-radius: 100px;
    justify-content: center;
}
</style>
