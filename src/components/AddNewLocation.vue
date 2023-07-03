<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="Save location"
    fullscreen
    @close="onCloseClick"
  >
    <el-form
      class="add-location-form"
      label-position="top"
      label-width="100px"
      :model="location"
      :rules="rules"
      ref="locationForm"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="location.name" />
      </el-form-item>
      <el-form-item label="Longitude" prop="longitude">
        <el-input v-model="location.longitude" disabled />
      </el-form-item>
      <el-form-item label="Latitude" prop="latitude">
        <el-input v-model="location.latitude" disabled />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancelClick()">Cancel</el-button>
        <el-button type="primary" @click="onSaveClick()" :disabled="!isValid">
          Save
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script >
import axios from "axios";

export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    locationData: {
      type: Object,
    },
  },
  emits: ["update:isVisible", 'saved'],
  data() {
    return {
      location: {
        name: "",
        latitude: 0,
        longitude: 0,
      },
      isValid: false,
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: "Please input title", trigger: "blur" },
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
    onCancelClick() {
      this.closeForm();
    },
    onSaveClick() {
      axios({ url: "/api/save", data: this.location, method: "POST" })
        .then((resp) => {
          if (resp.data?._id) {
            this.closeForm();
            this.$emit("saved", resp.data)
            ElMessage({
              message: 'Congrats, location saved successfull!',
              type: 'success',
            })
          }
        })
        .catch(() => {
          this.closeForm();
          ElMessage({
              message: 'Error happened while saving location!',
              type: 'error',
            })
        });
    },
    closeForm() {
      this.dialogFormVisible = false;
      this.$emit("update:isVisible", false);
    },
    onCloseClick() {
      this.closeForm();
    },
  },
  watch: {
    location: {
      deep: true,
      handler() {
        if (this.$refs.locationForm) {
          this.$refs.locationForm.validate((valid) => {
            this.isValid = valid;
          });
        }
      },
    },
    isVisible(value) {
      this.dialogFormVisible = value;
    },
    locationData: {
      deep: true,
      immediate: true,
      handler(value) {
        this.location = {
          ...this.location,
          latitude: value?.lat || 0,
          longitude: value?.lng || 0,
        };
      },
    },
  },
};
</script>
<style>
.el-overlay {
  z-index: 999999999 !important;
}
.el-dialog__close {
  font-size: 2rem !important;
}
.add-location-form .el-form-item__error {
  font-size: 1.3rem;
}
.add-location-form .el-form-item {
  margin-bottom: 3vh;
}
.add-location-form .el-input__inner {
  height: 5vh;
  font-size: 1.5rem;
}
.add-location-form .el-form-item__label {
  font-size: 1.5rem;
}
.dialog-footer .el-button {
  font-size: 1.5rem;
  width: 20vw;
  height: 5vh;
}
.el-dialog__title {
  font-size: 2rem !important;
  text-align: left;
}
</style>