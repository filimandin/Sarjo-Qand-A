/* eslint-disable */
<template>
  <div>
    <nav class="border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-blue-800">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <router-link to="/dashboard">
          <a href="#" class="flex items-center">
            <span
              class="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white"
              >Q&A
            </span>
          </a>
        </router-link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-blue-800 md:dark:bg-blue-800 dark:border-gray-700"
          >
            <h1 v-if="user" class="-ml-10 text-md text-white font-extrabold border-b-2">
              {{ user.username }}
            </h1>

            <li>
              <router-link to="/dashboard">
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 dark:text-white"
                  aria-current="page"
                  >Dashboard</a
                >
              </router-link>
            </li>
            <li>
              <router-link to="/question">
                <a
                  href=""
                  class="block py-2 pr-4 pl-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-white"
                  >Question</a
                >
              </router-link>
            </li>
            <div>
              <li v-if="token">
                <a
                  @click="logout"
                  href="#"
                  class="block py-2 pr-4 pl-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >logout</a
                >
              </li>
              <li v-else>
                <router-link to="/login">
                  <a
                    href="#"
                    class="block py-2 pr-4 pl-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >login</a
                  >
                </router-link>
              </li>
            </div>

            <li>
              <a
                href="#"
                class="block py-2 pr-4 pl-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              ></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>
<script>
export default {
  data: () => ({
    token: "",
    loginState: false,
    user: "",
  }),

  mounted() {
    let token = localStorage.getItem("token");

    this.token = token;

    if (!token) {
      return this.$router.push("login");
    }

    let userData = localStorage.getItem("user");
    let parsedata = JSON.parse(userData);
    this.user = parsedata;
    if (parsedata.userType == "USER") {
      console.log("login");
      this.$router.push("/score");
    } else {
      this.$router.push("/dashboard");
    }
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$router.go();
      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
