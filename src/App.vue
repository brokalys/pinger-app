<template>
  <el-container>
    <el-main>
      <SignupForm />
    </el-main>
  </el-container>
</template>

<script>
import SignupForm from "./components/SignupForm";

export default {
  name: "App",
  components: {
    SignupForm
  }
};
</script>

<style>
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 0;
  background: #543093;
}
.el-container {
  border-radius: 5px;
  max-width: 600px;
  background-color: #fff;
  margin: 50px auto;
}
.line {
  text-align: center;
}
</style>
