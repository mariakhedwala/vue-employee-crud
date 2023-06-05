<template>
  <form
    @submit.prevent="employeeLogin"
    class="border mt-3 mb-3 w-50 m-auto p-2"
  >
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
    <button type="submit" class="btn btn-primary">LOGIN</button>
  </form>
</template>
<script>
import axios from "axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

export default {
  name: "New Employee",
  data() {
    return {
      employee: {
        emp_email: "",
        emp_password: "",
      },
    };
  },
  methods: {
    async employeeLogin() {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/employees/login",
          this.employee
        );
        this.$emit("employeeLoggedIn", response.data);
        $toast.success("Employee Logged in");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
