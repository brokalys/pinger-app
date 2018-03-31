<template>
  <el-container>
    <el-main>
      <SignupForm/>
    </el-main>
    <el-aside width="40%">Aside</el-aside>
  </el-container>
</template>

<script>
import SignupForm from './components/SignupForm';

export default {
  name: 'App',
  components: {
    SignupForm,
  },
};
</script>

<style>
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
