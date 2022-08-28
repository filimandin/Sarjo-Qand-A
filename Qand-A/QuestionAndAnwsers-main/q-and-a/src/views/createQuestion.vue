/* eslint-disable */
<template>
  <div>
    <div class="flex justify-center items-center h-screen w-full" v-if="isLoading">
      <h1 class="text-blue-600 text-center">Loading.....</h1>
    </div>
    <div>
      <h1 class="text-center mt-10">Question</h1>
      <div class="mx-auto max-w-lg m-auto w-screen mb-20">
        <div v-if="!isQuestionAdded">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >Add Question</label
          >

          <form @submit.prevent="hanldeSubmitQuestion">
            <textarea
              id="message"
              v-model="question"
              rows="2"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
            ></textarea>

            <div class="py-5">
              <button class="bg-blue-700 px-10 p-2 rounded-2xl text-white" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div v-if="isQuestionAdded">
          <form @submit.prevent="hanldeSubmitAnswer">
            <div id="options" class="mt-10">
              <div>
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >Option
                </label>
                <textarea
                  id="message"
                  v-model="answer"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your answer..."
                ></textarea>
                <p class="font-semibold text-gray-800 mb-2 mt-2">
                  Is this answer correct?
                </p>
                <select
                  class="block p-2 mb-5 mt-4 px-3"
                  @change="handleCorrect"
                  name=""
                  id=""
                >
                  <option value="No">No</option>
                  <option value="YES">Yes</option>
                </select>
                <div
                  v-if="count == 4 || count == 5"
                  @click="goToScoreBoard"
                  class="mb-10"
                >
                  <button
                    class="bg-blue-700 px-14 p-2 mb-2 rounded-2xl text-white"
                    type="submit"
                  >
                    submit
                  </button>
                  <p class="text-xl mt-4 text-gray-900 px-5">OR</p>
                </div>

                <div>
                  <button
                    class="bg-blue-700 px-10 p-2 rounded-2xl text-white"
                    type="submit"
                  >
                    Add answer
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Form from "vform";

// import { ref, onMounted } from "vue";
export default {
  data: () => ({
    form: new Form({
      // is_correct: "NO",
    }),

    question: "",
    questionId: "",
    answer: "",
    is_correct: "NO",
    isLoading: false,
    count: 0,
    minimum: false,
    token: "",
    isQuestionAdded: false,
    questions: [],

    // isLoading: false,
  }),

  mounted() {
    console.log("you mounted");
    let token = localStorage.getItem("token");

    this.token = token;
    if (!token) {
      return this.$router.push("/login");
    }
  },

  updated() {
    console.log("tester................my good");
    if (this.count == 2) {
      console.log("count react", this.count);
    }
  },

  methods: {
    handleCorrect(e) {
      console.log("on change", e.target.value);
      this.is_correct = e.target.value;
    },

    async loadQuestions() {
      this.isLoading = true;
      console.log("this token token", this.token);
      fetch("http://localhost:5000/api/questions/", {
        method: "get",

        headers: {
          Authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("questions data... new", json);
          this.questions = json;
          console.log("json......", json);
          let q = json.filter((q) => q.question == this.question);

          this.questionId = q[0].id;
          this.isLoading = false;
        })
        .catch((err) => {
          alert("fail to fetch question");
          this.isLoading = false;
          console.log("my err", err);
        });
    },
    async hanldeSubmitQuestion() {
      if (this.question == "") return;
      this.isLoading = true;
      console.log("this is question", this.question);
      fetch("http://localhost:5000/api//questions/create", {
        method: "post",
        body: JSON.stringify({
          question: this.question,
        }),

        headers: {
          Authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          // this.questions = json;
          this.isQuestionAdded = true;
          this.loadQuestions();
          console.log("questions data....", json);
          this.isLoading = false;

          this.form.clear();
        })
        .catch((err) => {
          this.isLoading = false;
          alert("fail to create question, check your internet");
          console.log(err);
        });
    },

    async goToScoreBoard() {
      this.minimum = true;
    },

    async hanldeSubmitAnswer() {
      if (this.answer == "" && this.minimum == false) return;
      this.isLoading = false;
      // checking if we reach the minimum question if yes we can choose to submit the answers;
      if (this.minimum) {
        return this.$router.push("/dashboard");
      } else {
        fetch("http://localhost:5000/api//choices/create", {
          method: "post",
          body: JSON.stringify({
            question_id: this.questionId,
            is_correct: this.is_correct,
            name: this.answer,
          }),

          headers: {
            Authorization: `Bearer ${this.token}`,
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((json) => {
            console.log("testte", json);
            // this.questions = json;
            this.isQuestionAdded = true;
            this.is_correct = "NO";
            this.answer = "";

            this.count = this.count + 1;
            if (this.count == 6 || this.minimum) {
              this.$router.push("/dashboard");
            }

            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
            alert("fail to create answer check your internet", err);
          });
      }
    },
  },
};
</script>
