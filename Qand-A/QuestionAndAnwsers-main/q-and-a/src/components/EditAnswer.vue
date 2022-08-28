/* eslint-disable */

<template>
  <header
    class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600"
  >
    <div class="flex items-center">
      <button @click="isOpen = true" class="text-gray-500 focus:outline-none lg:hidden">
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="relative">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>

        <input
          class="w-32 pl-10 pr-4 text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>

    <div class="flex items-center">
      <button class="flex mx-4 text-gray-600 focus:outline-none">
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </header>
  <form
    @submit.prevent="AnswerEdit"
    class="px-5 flex h-screen justify-center bg-grey-100 shadow-2xl w-full p-10"
  >
    <div>
      <h3 class="text-3xl font-medium text-gray-700 mx-10 m-5">Answer</h3>

      <div class="mt-8">{{ answer.name }}</div>
      <div>
        <label for="ans" class="text-blue-700 font-bold text-lg">Edit Anseer</label>
        <input
          type="text"
          id="ans"
          name="ans"
          :placeholder="answer.name"
          v-model="name"
          @change="ansEdit"
          class="bg-white p-5 border rounded w-full"
        />
      </div>
      <div>
        <h6>Change correct state:</h6>
        <p>
          This answer was recorded as

          {{ answer.is_correct == "YES" ? "Correct" : "Wrong" }}
        </p>
        <p class="text-blue-700">Change</p>
        <select class="block p-2 mb-5 mt-4 px-3" @change="handleCorrect" name="" id="">
          <option value="No">No</option>
          <option value="YES">Yes</option>
        </select>
      </div>
      <div>
        <button class="bg-blue-700 px-10 p-2 rounded-2xl text-white" type="submit">
          edit answer
        </button>
      </div>
    </div>

    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
        ></div>
      </div>
    </div>
  </form>
</template>

<script>
// import { ref, onMounted } from "vue";
export default {
  data: () => ({
    id: "",
    name: "",
    answer: "",
    is_correct: "",
    question_id: "",
    answerId: "",
    token: "",
  }),

  // props:[]
  mounted() {
    let token = localStorage.getItem("token");
    let id = this.$route.params.id;
    this.getAnswers(id);
    this.token = token;
    this.id = id;
    if (!token) {
      return this.$router.push("/yarn.locklogin");
    }
  },

  methods: {
    handleCorrect(e) {
      console.log("this, nane", this.name);
      this.is_correct = e.target.value;
    },
    ansEdit(e) {
      this.name = e.target.value;
    },
    getAnswers(id) {
      console.log("id", id);
      fetch(`http://localhost:5000/api/choices/${id}`, {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("json", json);
          this.answer = json[0];
          this.is_correct = json[0].is_correct;
          this.name = json[0].name;
          this.question_id = json[0].question_id;
        })
        .catch((err) => console.log("err", err));
    },
    AnswerEdit() {
      console.log("i", this.name);

      fetch(`http://localhost:5000/api/choices/${this.id}`, {
        method: "put",
        body: JSON.stringify({
          is_correct: this.is_correct,
          name: this.name,
          question_id: this.question_id,
        }),
        headers: {
          Authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);

          this.$router.push("/dashboard");
        })
        .catch((err) => console.log("err", err));
    },
  },
};
</script>
