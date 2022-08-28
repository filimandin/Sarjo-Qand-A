/* eslint-disable */
<template>
  <div>
    <h1 class="text-center mt-10">Question</h1>
    <div class="mx-auto max-w-lg m-auto w-screen mb-20">
      <div v-if="questions">
        <div class="bold text-blue-700 font-bold">Question number : {{ count + 1 }}</div>
        <div class="font-extrabold text-center text-xl">{{ questions.question }}</div>
        <h1 class="bold text-center">Choose your answer</h1>
        <hr />

        <div class="w-full px-4 py-16">
          <div class="mx-auto w-full max-w-md">
            <RadioGroup v-model="selected">
              <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
              <div class="space-y-2">
                <RadioGroupOption
                  as="template"
                  v-for="answer in answers"
                  :key="answer.id"
                  :value="answer"
                  v-slot="{ active, checked }"
                >
                  <div
                    :class="[
                      active
                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                        : '',
                      checked ? 'bg-sky-900 bg-opacity-75 text-white ' : 'bg-white ',
                    ]"
                    class="relative bg-gray-900 text-white flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
                  >
                    <div class="flex w-full items-center justify-between">
                      <div class="flex items-center">
                        <div class="text-sm">
                          <RadioGroupLabel
                            as="p"
                            :class="checked ? 'text-white' : 'text-gray-200'"
                            class="font-medium"
                          >
                            {{ answer.name }}
                          </RadioGroupLabel>
                        </div>
                      </div>
                      <div v-show="checked" class="shrink-0 text-white">
                        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.2" />
                          <path
                            d="M7 13l3 3 7-7"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>
          </div>
          <p v-if="error" class="text-red-500 font-bold">
            {{ error }}
          </p>
        </div>
        <div class="p-2">
          <button
            type="button"
            @click="nextQuestion"
            class="bg-black -mt-10 text-white py-4 rounded px-10 tex-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { ref } from "vue";
import { isProxy, toRaw } from "vue";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
export default {
  components: { RadioGroup, RadioGroupLabel, RadioGroupOption },
  data: () => ({
    count: 0,
    isQuestionAdded: false,
    questions: [],
    answers: [],
    error: "",
    questionCount: 0,
    correctAnswerCount: 0,
    questionLength: 0,
    questionId: 0,
    allQuestions: [],
    allAnswers: [],
    token: "",

    selected: "",
  }),

  mounted() {
    console.log("you mounted");
    this.loadQuestions();
    let token = localStorage.getItem("token");

    this.token = token;
    if (!token) {
      return this.$router.push("/login");
    }
  },

  methods: {
    // go to next question
    nextQuestion() {
      //  converting the selected data to raw data beacuse vue how vue js make it
      let selected = toRaw(this.selected);
      if (!selected) {
        this.error = "You most select an answer";
        return;
      } else {
        this.error = "";

        if (selected.is_correct == "YES") {
          this.correctAnswerCount += 1;
        }
        this.count = this.count + 1;

        let rawQuestions;
        let rawAnswers;
        // checking if the object has been change to vue proxy object
        if (isProxy(this.allQuestions)) {
          rawQuestions = toRaw(this.allQuestions);
          rawAnswers = toRaw(this.allAnswers);
          console.log("question count", this.count);
          console.log("length count", rawQuestions.length);
          console.log("length answerss", rawQuestions);
          //  checking if the question is equals to our minimum question ot max then got to scoreboard
          if (rawQuestions.length === this.count) {
            localStorage.setItem("score", this.correctAnswerCount);
            this.$router.push("score");
          }

          this.questions = rawQuestions[this.count];
          if (rawQuestions[this.count]) {
            this.questionId = rawQuestions[this.count].id
              ? rawQuestions[this.count].id
              : rawQuestions[this.count].id;

            this.answers = rawAnswers.filter(
              (answer) => answer.question_id == this.questionId
            );
          } else {
            console.log("nod ide");
          }
        }
      }
    },
    async loadAnnswers(id) {
      console.log("id", id);
      fetch(`http://localhost:5000/api/choices`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("testte answers", json);
          this.allAnswers = json;
          this.answers = json.filter((answer) => answer.question_id == this.questionId);

          console.log(
            "json answers filter",
            this.questionId,
            "and",

            json.filter((answer) => answer.question_id == this.questionId)
          );
        })
        .catch((err) => console.log("err", err));
    },
    async loadQuestions() {
      fetch("http://localhost:5000/api/questions/", {
        method: "get",

        headers: {
          Authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.questions = json;
          this.allQuestions = json;
          console.log("this all", this.allQuestions);
          this.questions = json[this.count];
          this.questionId = json[this.count].id;
          localStorage.setItem("questionLength", json.length);
          this.loadAnnswers();
        })
        .catch((err) => console.log("err", err));
    },
  },
};
</script>
