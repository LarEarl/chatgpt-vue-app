<template>
  <div class="app">
    <div class="content">
      <div class="icon"></div>
      <h2>Hi there!</h2>
      <h1>What would you like to know?</h1>
      <p class="subtitle">
        Use one of the most common prompts below<br />
        or ask your own question
      </p>
    </div>
    <div class="input-wrapper">
      <div class="mic"></div>
      <input
        v-model="userInput"
        :disabled="loading"
        type="text"
        placeholder="Ask whatever you want"
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage" :disabled="loading">></button>
    </div>

    <div v-if="error" class="message error">{{ error }}</div>
    <div v-if="reply" class="message reply">Ответ: {{ reply }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userInput: "",
      reply: "",
      loading: false,
      error: null,
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;
      this.loading = true;
      this.error = null;
      this.reply = "";

      try {
        const res = await axios.post("http://localhost:3000/api/message", {
          message: this.userInput,
        });
        this.reply = res.data.reply;
      } catch (err) {
        this.error = "Ошибка при получении ответа от сервера.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.app {
  background-color: #072d6b;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 7rem 7rem 4rem 7rem;
}

.content {
  width: 100%;
  text-align: left;
}

.icon {
  background: #1d4c9a;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(./assets/speech-balloon_1f4ac.png);
  background-size: 22px 22px;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 40px;
}

h1 {
  width: 100%;
  font-size: 60px;
  margin-bottom: 1rem;
}

h2 {
  width: 100%;
  font-size: 50px;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 30px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  line-height: 1.5;
}

.input-wrapper {
  width: 65%;
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  padding: 0.5rem 1rem;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
}

input {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  padding: 0.6rem;
  outline: none;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.input-wrapper > input {
  font-size: 30px;
  padding-right: 81px;
}

.mic {
  width: 65px;
  height: 65px;
  background-image: url(./assets/Corodata-Icon-Blue-HaveTheTalk.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

button {
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  background: #1d4c9a;
  border: none;
  color: white;
  font-size: 1.2rem;
  border-radius: 28px;
  width: 81px;
  height: 100%;
  cursor: pointer;
  font-size: 30px;
}

button:hover {
  background: rgba(255, 255, 255, 0.25);
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.message {
  margin-top: 2rem;
  font-size: 1rem;
  line-height: 1.5;
  padding: 1rem;
  border-radius: 12px;
}

.reply {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.error {
  background-color: rgba(255, 0, 0, 0.2);
  color: #ffcccc;
}
</style>
