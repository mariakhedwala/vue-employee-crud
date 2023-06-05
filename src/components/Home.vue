<template>
  <div>
    <div class="row">
      <button
        class="mb-3 col-sm-6"
        @click="showEmployeeSignup = !showEmployeeSignup"
      >
        signup
      </button>
      <button
        v-if="!isEmpLoggedIn"
        @click="showEmployeeLogin = !showEmployeeLogin"
        class="col-sm-6 mb-3"
      >
        LOGIN
      </button>
      <button v-else class="col-sm-6 mb-3" @click="logoutHandler">
        LOGOUT
      </button>
    </div>
    <div v-if="loginData.name">
      <p class="capitalize">Hi {{ loginData.name }}</p>
      <p>You have {{ loginData.role }} roles</p>
    </div>

    <NewEmployee v-if="showEmployeeSignup" @employeeAdded="updateEmployees" />
    <EmployeeLogin
      v-if="showEmployeeLogin"
      @employeeLoggedIn="updateLoggedInEmp"
    />
    <UpdateEmployee
      v-if="showUpdateForm"
      @updateEmp="updateHandler"
      :employeeUpdateData="empUpdateData"
    />

    <h2>All Employees</h2>
    <div class="wrap">
      <ul class="row mt-4 pb-2 border-bottom">
        <li class="col-sm-3">Name</li>
        <li class="col-sm-3">Email</li>
        <li class="col-sm-2">Role</li>
        <li v-if="loginData.role === 'admin'" class="col-sm-2">Edit</li>
        <li v-if="loginData.role === 'admin'" class="col-sm-2">Delete</li>
      </ul>
      <ul v-for="emp in employees" :key="emp.id" class="row">
        <li class="col-sm-3">{{ emp.emp_name }}</li>
        <li class="col-sm-3">{{ emp.emp_email }}</li>
        <li class="col-sm-2">{{ emp.emp_role }}</li>
        <li
          v-if="loginData.role === 'admin'"
          class="col-sm-2"
          @click="employeeUpdateData(emp.id), (showUpdateForm = true)"
        >
          EDIT
        </li>
        <li v-if="loginData.role === 'admin'" class="col-sm-2">
          <button @click="deleteHandler(emp.id)">DELETE</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewEmployee from "./NewEmployee.vue";
import EmployeeLogin from "./EmployeeLogin.vue";
import UpdateEmployee from "./UpdateEmployee.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();
export default {
  name: "Home",
  components: {
    NewEmployee,
    EmployeeLogin,
    UpdateEmployee,
  },
  data() {
    return {
      employees: [],
      message: "",
      showEmployeeSignup: false,
      showEmployeeLogin: false,
      showUpdateForm: false,
      isEmpLoggedIn: false,
      empUpdateData: {},
      loginData: {},
    };
  },
  computed: {},

  methods: {
    async init() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/employees/"
        );
        this.employees = JSON.parse(JSON.stringify(response.data.employees));
      } catch (error) {
        console.log(error);
      }
    },
    async deleteHandler(eid) {
      try {
        if (this.loginData.role !== "") {
          $toast.error("You can not delete the employee");
          return;
        }
        const response = await axios.delete(
          `http://localhost:8000/api/employees/${eid}`,
          {
            headers: {
              Authorization: "Bearer " + this.loginData.token,
            },
          }
        );
        this.init();
        $toast.success("Employee Deleted");
      } catch (e) {
        console.log(e);
      }
    },
    async logoutHandler() {
      try {
        await axios.post("http://localhost:8000/api/employees/logout");
        $toast.success("Employee Logged out");
        this.loginData = {};
        this.isEmpLoggedIn = false;
      } catch (e) {
        console.log(e);
      }
    },
    updateEmployees() {
      this.init();
      showEmployeeSignup = false;
    },
    updateLoggedInEmp(data) {
      console.log(data);
      this.loginData = data;
      this.isEmpLoggedIn = true;
      this.showEmployeeLogin = false;
    },
    employeeUpdateData(eid) {
      console.log(eid, JSON.parse(JSON.stringify(this.employees)), "eid");
      let emps = JSON.parse(JSON.stringify(this.employees));
      this.empUpdateData = emps.find((emp) => emp._id === eid);
      console.log(this.empUpdateData, "this.empUpdateData in home");
    },
    async updateHandler(emp) {
      try {
        await axios.patch(
          `http://localhost:8000/api/employees/${emp.id}`,
          {
            emp_name: emp.emp_name,
            emp_email: emp.emp_email,
            emp_designation: emp.emp_designation,
            emp_role: emp.emp_role,
            emp_address: emp.emp_address,
          },
          {
            headers: {
              Authorization: "Bearer " + this.loginData.token,
            },
          }
        );
        $toast.success("Employee Updated");
        this.init();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
li {
  list-style: none;
  text-align: left;
}
.capitalize {
  text-transform: capitalize;
}
</style>
