<template>
  <el-container>
    <el-main>
      <SignupForm/>
    </el-main>
    <el-aside width="40%">
      <SideMenu />
    </el-aside>
  </el-container>
</template>

<script>
import SignupForm from './components/SignupForm';
import SideMenu from './components/SideMenu';

export default {
  name: 'App',
  components: {
    SignupForm,
    SideMenu,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  background: url(https://images.unsplash.com/photo-1522054541898-adc6abd570e5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9c41140ab28eb3856991eac6c9ccfaa3&auto=format&fit=crop&w=1567&q=80);
  background-size: cover;
}
.el-container {
  margin: 100px 200px;
  background-color: #fff;
}
.el-aside {
  background: #39285c;
  color: #fff;
}
</style>
