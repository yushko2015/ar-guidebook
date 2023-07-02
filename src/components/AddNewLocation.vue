<template>
  <el-form
    label-position="top"
    label-width="100px"
    :model="location"
    :rules="rules"
    ref="locationForm"
  >
    <el-form-item label="Title" prop="title">
      <el-input v-model="location.title" />
    </el-form-item>
    <el-form-item label="Longitude" prop="longitude">
      <el-input v-model="location.longitude" />
    </el-form-item>
    <el-form-item label="Latitude" prop="latitude">
      <el-input v-model="location.latitude" />
    </el-form-item>
    <el-button type="prinary" @click="saveLocation" :disabled="!isValid"
      >Save</el-button
    >
  </el-form>
</template>

<script >
export default {
  data() {
    return {
      location: {
        title: "",
        latitude: 0,
        longitude: 0,
      },
      isValid: false,
      rules: {
        title: [
          { required: true, message: "Please input title", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        longitude: [
          {
            required: true,
            message: "Please input longitude",
            trigger: "change",
          },
        ],
        latitude: [
          {
            required: true,
            message: "Please input latitude",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    saveLocation() {
      console.log(this.location);
    },
  },
  watch: {
    location: {
      deep: true,
      handler() {
        this.$refs.locationForm.validate((valid) => {
          this.isValid = valid;
        });
      },
    },
  },
};
</script>