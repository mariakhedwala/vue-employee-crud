<template>
  <form
    @submit.prevent="employeeSignup"
    class="border mt-3 mb-3 w-50 m-auto p-2"
  >
    <div class="form-group mt-3 mb-3">
      <label>Employee name</label>
      <input
        type="text"
        v-model="employee.emp_name"
        class="form-control"
        placeholder="Employee name"
      />
    </div>
    <div class="form-group mt-3 mb-3">
      <label>Employee Email</label>
      <input
        type="text"
        v-model="employee.emp_email"
        class="form-control"
        placeholder="Employee Email"
      />
    </div>
    <div class="form-group mt-3 mb-3">
      <label>Employee Password</label>
      <input
        type="text"
        v-model="employee.emp_password"
        class="form-control"
        placeholder="Employee Password"
      />
    </div>
    <div class="row mt-3 mb-3">
      <div class="form-group col-md-6">
        <label>Employee Designation</label>
        <input
          type="text"
          v-model="employee.emp_designation"
          class="form-control"
          placeholder="Employee Designation"
        />
      </div>
      <div class="form-group col-md-6">
        <label>Employee Role</label>
        <input
          type="text"
          v-model="employee.emp_role"
          class="form-control"
          placeholder="Employee Role"
        />
      </div>
    </div>
    <div class="form-group mt-3 mb-3">
      <label>Employee Address</label>
      <input
        type="text"
        v-model="employee.emp_address"
        class="form-control"
        placeholder="Employee Address"
      />
    </div>

    <button type="submit" class="btn btn-primary">Add employee</button>
  </form>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

export default {
  name: "New Employee",
  data() {
    return {
      employee: {
        emp_name: "",
        emp_email: "",
        emp_password: "",
        emp_designation: "",
        emp_role: "",
        emp_address: "",
      },
    };
  },
  methods: {
    async employeeSignup() {
      try {
        await axios.post(
          "http://localhost:8000/api/employees/signup",
          this.employee
        );
        this.$emit("employeeAdded");
        $toast.success("Employee Added");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
label {
  text-align: left;
  width: 100%;
}
</style>
