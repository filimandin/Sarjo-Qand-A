/* eslint-disable */

<template>
  <div class="w-full mb-20">
    <button
      @click="open = true"
      class="px-5 py-2 overflow-hidden mt-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
    >
      View Answers
    </button>

    <div
      :class="`modal ${
        !open && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full overflow-scroll top-0 left-0 flex items-center `"
    >
      <div
        @click="open = false"
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
      ></div>

      <div
        class="z-50 w-force mx-auto overflow-y-auto bg-white rounded-lg shadow-lg modal-container md:max-w-md"
      >
        <div
          class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
        >
          <svg
            class="text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="px-6 py-4 text-left modal-content">
          <!--Title-->
          <div class="flex items-center justify-between pb-3">
            <div class="z-50 cursor-pointer modal-close" @click="open = false">
              <svg
                class="text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div>

          <!--Body-->
          <div v-if="answers.length > 0">
            <div class="bg-white">
              <ul v-for="answer of answers" :key="answer.id">
                <li class="font-bold mb-10 mt-10">
                  <p class="w-1/2">Answer text :</p>
                  <div class="w-10">
                    <p class="block text-blue-700 w-10">{{ answer.name }}</p>
                  </div>

                  <div class="flex gap-4">
                    <router-link :to="{ name: 'edit_answer', params: { id: answer.id } }">
                      <p
                        class="bg-blue-700 text-white p-1 px-4 mt-4 mb-2 rounded cursor-pointer"
                      >
                        Edit
                      </p>
                    </router-link>
                  </div>
                  <hr />
                </li>
              </ul>
            </div>
          </div>

          <!--Footer-->
          <div class="flex justify-end pt-2">
            <button
              @click="open = false"
              class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
            >
              Close
            </button>
            <!-- <button
              @click="open = false"
              class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
            >
              delete
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
    test: String,
    id: Number,
    token: String,
  },
  mounted() {
    this.getAnswers();
  },
  data: () => ({
    answers: [],
    answer: "",
    score: "",
    answerText: "",
    status: "",
    isLoading: false,
    open: ref(false),
  }),
  methods: {
    editAnswerText(ans) {
      console.log("ansss");
      if (ans.target.value) {
        this.answerText = ans.target.value;
      }
      console.log("answer one", ans.target.value);
    },
    changeStatus(status) {
      console.log("status", status);
      this.status = !status;
    },
    getAnswers() {
      console.log("this token,", this.token);
      console.log("id", this.id);
      fetch(`http://localhost:5000/api/choices`, {
        method: "get",

        headers: {
          Authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("answerssss", json);

          this.answers = json.filter((answer) => answer.question_id == this.id);
        })
        .catch((err) => console.log("err", err));
    },
  },
};
</script>

<style>
.modal {
  transition: opacity 0.25s ease;
}
</style>
