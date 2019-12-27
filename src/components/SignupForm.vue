<template>
  <el-row>
    <el-col>
      <h1 class="h1">Brokalys pingeris</h1>
      <p>
        Aizpildi formu un saņem paziņojumus e-pastā par jauniem nekustamā
        īpašuma sludinājumiem.
      </p>

      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="left"
        :disabled="loading"
      >
        <el-form-item label="E-pasta adrese" prop="email">
          <el-col :span="11">
            <el-input
              placeholder="demo@brokalys.com"
              suffix-icon="el-icon-message"
              v-model="form.email"
            >
            </el-input>
          </el-col>
        </el-form-item>

        <el-row>
          <el-col :span="11">
            <el-form-item label="Nekustamā īpašuma tips" prop="category">
              <el-select v-model="form.category">
                <el-option label="Dzīvoklis" value="apartment"></el-option>
                <el-option label="Māja" value="house"></el-option>
                <el-option label="Zeme" value="land"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="11" :offset="2">
            <el-form-item label="Darījuma veids" prop="type">
              <el-select v-model="form.type">
                <el-option label="Pārdod" value="sell"></el-option>
                <el-option label="Īrē" value="rent"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Cena (no, līdz)" required>
          <el-col :span="11">
            <el-form-item prop="price_min">
              <el-input v-model.number="form.price_min" auto-complete="off">
                <template slot="append">EUR</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="price_max">
              <el-input v-model.number="form.price_max" auto-complete="off">
                <template slot="append">EUR</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="Istabas (no, līdz)">
          <el-col :span="11">
            <el-form-item prop="rooms_min">
              <el-input v-model.number="form.rooms_min" auto-complete="off">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="rooms_max">
              <el-input v-model.number="form.rooms_max" auto-complete="off">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="Platība (no, līdz)">
          <el-col :span="11">
            <el-form-item prop="area_m2_min">
              <el-input v-model.number="form.area_m2_min" auto-complete="off">
                <template slot="append">m2</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="area_m2_max">
              <el-input v-model.number="form.area_m2_max" auto-complete="off">
                <template slot="append">m2</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="Reģions" required>
          <el-col>
            <gmap-map
              :center="center"
              :zoom="10"
              style="width: 100%; height: 300px"
              ref="map"
            >
              <gmap-polygon
                :paths="paths"
                :editable="true"
                @paths_changed="updateEdited($event)"
                @rightclick="handleClickForDelete"
                ref="polygon"
              >
              </gmap-polygon>
            </gmap-map>
          </el-col>
        </el-form-item>

        <el-form-item label="Komentāri" prop="comments">
          <el-col>
            <el-input
              type="textarea"
              placeholder="Ieteikumi, atsauksmes"
              suffix-icon="el-icon-message"
              v-model="form.comments"
            >
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()" :loading="loading">
            Saņemt nek.īp. paziņojumus
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import bugsnagClient from "../bugsnag";

function closeLoop(path) {
  return path.concat(path.slice(0, 1));
}

export default {
  name: "SignupForm",

  data() {
    const greaterThan = field => (rule, value, callback) => {
      if (!value) {
        return callback();
      }

      if (this.form[field] >= value) {
        return callback(
          new Error("Lauciņam /no/ ir jābūt lielākam par lauciņu /līdz/.")
        );
      }

      return callback();
    };

    return {
      center: {
        lat: 56.98,
        lng: 24.105078
      },
      paths: [
        [
          { lng: 24.1366192486729, lat: 56.9922942350075 },
          { lng: 23.995789971634395, lat: 56.976393666616254 },
          { lng: 24.005336060806712, lat: 56.92490408641493 },
          { lng: 24.108466782852588, lat: 56.889287904181955 },
          { lng: 24.291935029312526, lat: 56.93221057479092 },
          { lng: 24.24517618684422, lat: 56.99650208638349 }
        ]
      ],
      mvcPaths: null,
      loading: false,

      form: {
        email: "",
        category: "apartment",
        type: "sell",
        price_min: "",
        price_max: "",
        rooms_min: null,
        rooms_max: null,
        area_m2_min: null,
        area_m2_max: null,
        optin: false
      },
      rules: {
        email: [
          {
            required: true,
            message: "Šis lauciņš ir obligāti aizpildāms.",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Pārbaudi e-pasta adresi.",
            trigger: "blur"
          }
        ],
        category: [
          {
            required: true,
            message: "Šis lauciņš ir obligāti aizpildāms.",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "Šis lauciņš ir obligāti aizpildāms.",
            trigger: "blur"
          }
        ],
        price_min: [
          {
            required: true,
            message: "Šis lauciņš ir obligāti aizpildāms.",
            trigger: "blur"
          },
          {
            type: "integer",
            message: "Šajā lauciņā var ievadīt tikai skaitļus.",
            trigger: "blur"
          }
        ],
        price_max: [
          {
            required: true,
            message: "Šis lauciņš ir obligāti aizpildāms.",
            trigger: "blur"
          },
          {
            type: "integer",
            message: "Šajā lauciņā var ievadīt tikai skaitļus.",
            trigger: "blur"
          },
          { validator: greaterThan("price_min"), trigger: "blur" }
        ],
        rooms_min: [
          {
            type: "integer",
            message: "Šajā lauciņā var ievadīt tikai skaitļus.",
            trigger: "blur"
          }
        ],
        rooms_max: [
          {
            type: "integer",
            message: "Šajā lauciņā var ievadīt tikai skaitļus.",
            trigger: "blur"
          },
          { validator: greaterThan("rooms_min"), trigger: "blur" }
        ],
        area_m2_min: [
          {
            type: "integer",
            message: "Šajā lauciņā var ievadīt tikai skaitļus.",
            trigger: "blur"
          }
        ],
        area_m2_max: [
          {
            type: "integer",
            message: "Šajā lauciņā var ievadīt tikai skaitļus līdz 100.",
            trigger: "blur",
            max: 100
          },
          { validator: greaterThan("area_m2_min"), trigger: "blur" }
        ]
      }
    };
  },

  watch: {
    polygonPaths: function(paths) {
      if (paths) {
        this.paths = paths;
        this.polygonGeojson = JSON.stringify(
          {
            type: "Polygon",
            coordinates: this.paths.map(path =>
              closeLoop(path.map(({ lat, lng }) => [lng, lat]))
            )
          },
          null,
          2
        );
      }
    }
  },

  computed: {
    polygonPaths: function() {
      if (!this.mvcPaths) return null;
      let paths = [];
      for (let i = 0; i < this.mvcPaths.getLength(); i++) {
        let path = [];
        for (let j = 0; j < this.mvcPaths.getAt(i).getLength(); j++) {
          let point = this.mvcPaths.getAt(i).getAt(j);
          path.push({ lat: point.lat(), lng: point.lng() });
        }
        paths.push(path);
      }
      return paths;
    }
  },

  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid === false) {
          return;
        }

        const parts = this.paths[0];
        const region = parts.map(
          row => `${row.lat.toFixed(6)} ${row.lng.toFixed(6)}`
        );

        this.loading = true;
        this.$http
          .post("https://api.brokalys.com/", {
            query: `mutation {
              createPinger(
                email: "${this.form.email}",
                category: ${this.form.category.toUpperCase()},
                type: ${this.form.type.toUpperCase()},
                price_min: ${this.form.price_min},
                price_max: ${this.form.price_max},
                ${
                  this.form.rooms_min
                    ? `rooms_min: ${this.form.rooms_min},`
                    : ""
                }
                ${
                  this.form.rooms_max
                    ? `rooms_max: ${this.form.rooms_max},`
                    : ""
                }
                ${
                  this.form.area_m2_min
                    ? `area_m2_min: ${this.form.area_m2_min},`
                    : ""
                }
                ${
                  this.form.area_m2_max
                    ? `area_m2_max: ${this.form.area_m2_max},`
                    : ""
                }
                ${
                  this.form.comments
                    ? `comments: ${JSON.stringify(this.form.comments)},`
                    : ""
                }
                region: "${region.join(", ")}"
              )
            }`
          })
          .then(response => {
            if (response.body.errors) {
              throw response;
            }

            this.loading = false;
            this.$message({
              message:
                "Turpmāk e-pastā saņemsi NĪ paziņojumus, kas atbilst tevis izvēlētajiem kritērijiem.",
              type: "success",
              duration: 20000
            });
          })
          .catch(response => {
            this.loading = false;

            const { errors } = response.data;

            if (
              errors.length > 0 &&
              errors[0].extensions.exception &&
              errors[0].extensions.exception.maxPingers
            ) {
              const maxPingers = errors[0].extensions.exception.maxPingers;
              this.$message({
                message: `Diemžēl, vienai e-pasta adresei var pievienot tikai ${maxPingers} NĪ paziņojumus.`,
                type: "error",
                duration: 20000
              });
              return;
            }

            this.$message({
              message:
                "Oops, kaut kas nogāja greizi. Centīsimies atrisināt problēmu tuvākajā laikā.",
              type: "error",
              duration: 20000
            });

            bugsnagClient.metaData = { response };
            bugsnagClient.notify(
              "Unexpected error occurred when creating a new pinger."
            );
          });
      });
    },

    updateEdited(mvcPaths) {
      this.mvcPaths = mvcPaths;
    },

    handleClickForDelete($event) {
      if ($event.vertex) {
        this.$refs.polygon.$polygonObject
          .getPaths()
          .getAt($event.path)
          .removeAt($event.vertex);
      }
    }
  }
};
</script>

<style>
.el-select,
.el-form-item__label {
  width: 100%;
}
</style>
