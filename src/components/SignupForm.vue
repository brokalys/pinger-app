<template>
  <el-row>
    <el-col>
      <h1 class="h1">Brokalys pingeris</h1>
      <p>Aizpildi vienkāršu formu un saņem paziņojumus e-pastā par jauniem nekustamā īpašuma sludinājumiem.</p>

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

        <el-form-item label="Lokācija" required>
          <gmap-map :center="center" :zoom="10" style="width: 100%; height: 300px" ref="map">
            <gmap-polygon
              :paths="paths"
              :editable="true"
              @paths_changed="updateEdited($event)"
              @rightclick="handleClickForDelete"
              ref="polygon">
            </gmap-polygon>
          </gmap-map>
        </el-form-item>

        <el-form-item prop="optin">
          <el-checkbox v-model="form.optin">Es piekrītu privātuma politikai</el-checkbox>
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

    const requiredTrue = (rule, value, callback) => {
      if (value !== true) {
        return callback(new Error('Šis lauciņš ir obligāti aizpildāms.'));
      }

      return callback();
    };

    return {
      center: {
        lat: 56.98,
        lng: 24.105078,
      },
      paths: [
        [
          { lng: 24.1366192486729, lat: 56.9922942350075 },
          { lng: 23.995789971634395, lat: 56.976393666616254 },
          { lng: 24.005336060806712, lat: 56.92490408641493 },
          { lng: 24.108466782852588, lat: 56.889287904181955 },
          { lng: 24.291935029312526, lat: 56.93221057479092 },
          { lng: 24.24517618684422, lat: 56.99650208638349 },
          { lng: 24.1366192486729, lat: 56.9922942350075 },
        ],
      ],
      mvcPaths: null,

      form: {
        email: '',
        category: 'apartment',
        type: 'sell',
        price_min: '',
        price_max: '',
        optin: false,
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
        optin: [
          { validator: requiredTrue, trigger: 'blur' },
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

    updateEdited(mvcPaths) {
      this.mvcPaths = mvcPaths;
    },

    handleClickForDelete($event) {
      if ($event.vertex) {
        this.$refs.polygon.$polygonObject.getPaths()
          .getAt($event.path)
          .removeAt($event.vertex);
      }
    },
  },
};
</script>

<style>
.el-select,
.el-form-item__label {
  width: 100%;
}
</style>
