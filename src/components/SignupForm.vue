<template>
  <el-row>
    <el-col :span="12" :offset="6" class="text-center">
      <img src="../assets/logo.png" alt="Brokalys Logo" class="logo" />

      <el-form ref="form" :model="form" :rules="rules" label-position="left">
        <el-form-item label="E-pasta adrese" prop="email">
          <el-input
            placeholder="demo@brokalys.com"
            suffix-icon="el-icon-message"
            v-model="form.email">
          </el-input>
        </el-form-item>

        <el-form-item label="Nekustamā īpašuma tips" prop="category">
          <el-select v-model="form.category">
            <el-option label="Dzīvoklis" value="apartment"></el-option>
            <el-option label="Māja" value="house"></el-option>
            <el-option label="Zeme" value="land"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Darījuma veids" prop="type">
          <el-select v-model="form.type">
            <el-option label="Pārdod" value="sell"></el-option>
            <el-option label="Īrē" value="rent"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Cena (no, līdz)" required>
          <el-col :span="11">
            <el-form-item prop="price_min">
              <el-input v-model.number="form.price_min" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="price_max">
              <el-input v-model.number="form.price_max" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">Izveidot</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SignupForm',

  data() {
    const checkPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Šis lauciņš ir obligāti aizpildāms.'));
      }

      if (this.form.price_min >= value) {
        return callback(new Error('Cenai /līdz/ ir jābūt mazākai par cenu /no/.'));
      }

      return callback();
    };

    return {
      form: {
        email: '',
        category: 'apartment',
        type: 'sell',
      },
      rules: {
        email: [
          { required: true, message: 'Šis lauciņš ir obligāti aizpildāms.', trigger: 'blur' },
          { type: 'email', message: 'Pārbaudi e-pasta adresi.', trigger: 'blur' },
        ],
        category: [
          { required: true, message: 'Šis lauciņš ir obligāti aizpildāms.', trigger: 'blur' },
        ],
        type: [
          { required: true, message: 'Šis lauciņš ir obligāti aizpildāms.', trigger: 'blur' },
        ],
        price_min: [
          { required: true, message: 'Šis lauciņš ir obligāti aizpildāms.', trigger: 'blur' },
          { type: 'number', message: 'Šajā lauciņā var ievadīt tikai skaitļus.', trigger: 'blur' },
        ],
        price_max: [
          { required: true, message: 'Šis lauciņš ir obligāti aizpildāms.', trigger: 'blur' },
          { type: 'number', message: 'Šajā lauciņā var ievadīt tikai skaitļus.', trigger: 'blur' },
          { validator: checkPrice, trigger: 'blur' },
        ],
      },
    };
  },

  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!');
          return;
        }

        console.log('error submit!!');
      });
    },
  },
};
</script>

<style>
.text-center {
  text-align: center;
}

.logo {
  margin-bottom: 30px;
  max-width: 100px;
}

.el-select,
.el-form-item__label {
  width: 100%;
}
</style>
