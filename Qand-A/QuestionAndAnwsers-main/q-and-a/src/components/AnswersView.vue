<template>
  <div>
    <div v-if="answers.length > 0">
      <modal :answers="answers"> </modal>
    </div>
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

        <div class="relative mx-4 lg:mx-0">
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
        <h3>Sulayman</h3>

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

        <div class="relative">
          <button
            @click="dropdownOpen = !dropdownOpen"
            class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
          >
            <img
              class="object-cover w-full h-full"
              src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
              alt="Your avatar"
            />
          </button>

          <div
            v-show="dropdownOpen"
            @click="dropdownOpen = false"
            class="fixed inset-0 z-10 w-full h-full"
          ></div>

          <transition
            enter-active-class="transition duration-150 ease-out transform"
            enter-from-class="scale-95 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in transform"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-95 opacity-0"
          >
            <div
              v-show="dropdownOpen"
              class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
            >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                >Profile</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                >Products</a
              >
              <router-link
                to="/"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                >Log out</router-link
              >
            </div>
          </transition>
        </div>
      </div>
    </header>
    <div class="px-5">
      <h3 class="text-3xl font-medium text-gray-700 mx-10 m-5">Dashboard</h3>

      <div class="mt-4 text-right">
        <router-link to="/about">
          <button class="bg-blue-700 p-2 cursor-pointer text-white rounded-2xl px-5">
            Add New Question +
          </button>
        </router-link>
      </div>

      <div class="mt-8"></div>

      <div class="flex flex-col mt-8">
        <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div
            class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
          >
            <table class="min-w-full">
              <thead>
                <tr>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Name
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Questions
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Answers
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Accounts
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                </tr>
              </thead>

              <tbody class="bg-white">
                <p v-if="loading">Still loading..</p>
                <tr v-for="question of questions" :key="question.id">
                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <img
                          class="w-10 h-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>

                      <div class="ml-4">
                        <div class="text-sm font-medium leading-5 text-gray-900">
                          Question NO :{{ " " + question.id }}
                        </div>
                        <div class="text-sm leading-5 text-gray-500"></div>
                      </div>
                    </div>
                  </td>

                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    <div class="text-sm leading-5 text-gray-900">
                      <!-- {{ post.title }} -->
                      {{ question.question }}
                    </div>
                    <div class="text-sm leading-5 text-gray-900">
                      <!-- {{ post.title }} -->
                    </div>
                  </td>
                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    <!-- {{ u.body }} -->
                    <button type="button" class="text--600 hover:text-indigo-900">
                      <modal :id="question.id"></modal>
                    </button>
                  </td>
                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    <!-- {{ u.body }} -->
                    <button
                      type="button"
                      @click="editQuestions(question.id)"
                      class="text--600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                  </td>

                  <td
                    class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
                  >
                    <button
                      type="button"
                      @click="deleteQuestions(question.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref, onMounted } from "vue";
import Modal from "./Modal.vue";
export default {
  components: { Modal },
  data: () => ({
    questions: [],
    score: "",
    answers: [],
    isLoading: false,
  }),

  // props:[]
  mounted() {
    console.log("you mounted");
    this.loadData();
  },

  methods: {
    getAnswers(id) {
      console.log("id", id);
      fetch(`http://localhost:5000/api/questions/${id}`, {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.answers = json;
        })
        .catch((err) => console.log("err", err));
    },
    loadData() {
      fetch("http://localhost:5000/api/questions", {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("testte", json);
          this.questions = json;
        })
        .catch((err) => console.log("err", err));
    },
  },

  deleteQuestions(id) {
    fetch(`http://localhost:5000/api/questions/${id}`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("testter", json);
        window.history.go();
      })
      .catch((err) => console.log("err", err));
  },
};
</script>
