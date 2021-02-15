<template>
  <div class="main-page__container">
    <section class="text__container">
      {{ text }}
    </section>
    <section class="keyboard__container">
      <div class="keyboard">
        <div class="keyboard__keys">
          <button
              v-for="keyValue in keyboard.keysEn"
              :key="keyValue"
              class="keyboard__key"
          >
            {{ keyValue }}
          </button>
        </div>
      </div>
    </section>
    <b-button v-b-toggle.sidebar-right>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-right" title="Sidebar" right shadow no-enforce-focus no-close-on-route-change no-close-on-esc
               no-close-on-backdrop>
      <div class="px-3 py-2">
        <p>
          hello
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import {HTTPS} from '@/main';

export default {
  name: 'MainPage',
  data() {
    return {
      text: [],
      sidebar: {
        speed: null,
        accuracy: 100,
      },
      reset: false,
      keyboard: {
        keysRu: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
          'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/',
          'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'enter',
          'done', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'э', '?',
          'volume', 'space', ',', '.', 'language', 'shift'],
        keysEn: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
          '*', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '/',
          'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
          'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
          'volume', 'space', 'language', 'shift'],
        shiftKeysRu: [
          '!', '\'', '№', ';', '%', ':', '_', '*', '(', ')', 'backspace',
          'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/',
          'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'enter',
          'done', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'э', '?',
          'volume', 'space', '-', '=', 'language', 'shift'],
        shiftKeysEn: [
          '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', 'backspace',
          '+', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '/',
          'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
          'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?',
          'volume', 'space', 'language', 'shift'],
      },
      errors: [],
    };
  },
  methods: {
    async getText() {
      try {
        let response = await HTTPS.get(`/?type=all-meat&paras=1&format=text/`);
        this.text = response.data.join();
      } catch (error) {
        this.errors.push(error);
      }
    },
    checkSymbol() {

    },
    setSidebarInfo() {

    },
  },
  created() {
    this.getText();
  },
};
</script>

<style scoped>
.main-page__container {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  padding: 2rem;
}

.text__container {
  display: block;
  width: 90%;
  min-height: 15.75rem;
  height: calc(100vh - 42.75rem);

  margin: 1rem auto;
  padding: .625rem;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%) !important;
  font-size: 20px;
}

.keyboard {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  background: #233162;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  user-select: none;
  transition: bottom 0.4s;
}

.keyboard__keys {
  text-align: center;
}

.keyboard__key {
  height: 45px;
  width: 6%;
  max-width: 90px;
  margin: 3px;
  border-radius: 4px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 1.05rem;
  outline: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  position: relative;
}

.keyboard__key:hover {
  background: rgba(255, 255, 255, 0.35);
  cursor: pointer;
}

.keyboard__key:active {
  background: rgba(255, 255, 255, 0.12);
  cursor: pointer;
}
</style>
