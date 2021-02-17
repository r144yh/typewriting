<template>
  <div class="main-page__container">
    <section class="score__container">
      <div>
        <b-icon icon="lightning" font-scale="1.2" variant="Light" animation="throb" shift-v=".5"></b-icon>
        <span>Скорость: </span>
        <span>{{ speed }} зн./мин</span>
      </div>
      <div>
        <b-icon icon="check2-all" font-scale="1.2" variant="Light"></b-icon>
        <span> Точность: </span>
        <span>{{ accuracy }}%</span>
      </div>
    </section>
    <section class="text__container">
      <span v-for="(symbol, index) in text" :key="index"
            :class='{nextSymbol: nextKey && index === currentIndex,
                     correctSymbol: correctAnswer && index < currentIndex,
                     wrongSymbol: wrongAnswer && index === currentIndex}'>{{ symbol }}</span>
      <div class="btn-reset__container">
        <button class="btn-reset"
                @click="resetResult"
                v-b-popover.hover.bottom="'Начать заново'">
          <b-icon icon="arrow-clockwise" font-scale="1.5" variant="Light"></b-icon>
        </button>
      </div>
    </section>
    <!--    <section class="keyboard__container">
          <div class="keyboard">
            <div class="keyboard__keys">
              <button
                  v-for="keyValue in keyboard.keysEn"
                  :key="keyValue"
                  class="keyboard__key">
                {{ keyValue }}
              </button>
            </div>
          </div>
        </section>-->
  </div>
</template>

<script>
import {HTTPS} from '@/main';

export default {
  name: 'MainPage',
  data() {
    return {
      text: [],               /* Исходный текст */
      speed: 0,               /* Скорость печати */
      accuracy: 100,          /* Точность печати */
      reset: false,           /* Смена исходного текста */
      keyboard: {
        /*        keysRu: [
                  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
                  'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/',
                  'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'enter',
                  'done', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'э', '?',
                  'volume', 'space', ',', '.', 'language', 'shift'],*/
        keysEn: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
          '*', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '/',
          'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
          'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
          'volume', 'space', 'language', 'shift'],
        /*        shiftKeysRu: [
                  '!', '\'', '№', ';', '%', ':', '_', '*', '(', ')', 'backspace',
                  'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/',
                  'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'enter',
                  'done', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'э', '?',
                  'volume', 'space', '-', '=', 'language', 'shift'],*/
        shiftKeysEn: [
          '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', 'backspace',
          '+', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '/',
          'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
          'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?',
          'volume', 'space', 'language', 'shift'],
      },
      errors: [],             /* Отлов ошибок с сервера */
      currentKey: null,       /* Текущий символ с клавиатуры пользователя */
      correctAnswer: false,   /* Смена класса для правильного ответа */
      wrongAnswer: false,     /* Смена класса для неправильного ответа */
      nextKey: true,         /* Смена класса для следующего вводимого символа */
      start: false,           /* Начало тренажера */
      currentIndex: 0,        /* Индекс символа из текста */
    };
  },
  methods: {
    async getText() {
      try {
        let response = await HTTPS.get(`/?type=all-meat&paras=1&format=text/`);
        this.text = response.data.join();
        this.text = this.text.split('');
      } catch (error) {
        this.errors.push(error);
      }
    },
    checkSymbol(elem) {
      let test = elem.key.match(
          /^((?!Enter|Escape|Tab|Delete|Backspace|Insert|PageUp|PageDown|ArrowLeft|ArrowRight|ArrowUp|ArrowDown|End|Home|Shift|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12).)*$/i);
      console.log(test);
      if (test === null) return;

      if (this.start === false) {
        this.setResult();
        this.start = true;
      }

      if (this.currentIndex < this.text.length) {
        if (elem.key === this.text[this.currentIndex]) {
          this.correctAnswer = true;
          this.currentIndex++;
        } else {
          this.nextKey = false;
          this.wrongAnswer = true;
        }
        /* else {
          while (elem.key !== this.text[this.currentIndex]){
            this.nextKey = false;
            this.wrongAnswer = true;
          }
          this.wrongAnswer = false;
          this.nextKey = true;
          this.correctAnswer = true;
          this.currentIndex++;
        }*/
      }

      console.log(elem.key);
    },
    setResult() {

    },
    resetResult() {
      // TODO: обнулить скорость и точность
      this.getText();
      this.start = false;
      this.currentIndex = 0;
    },
  },
  created() {
    document.addEventListener('keydown', this.checkSymbol);
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

.score__container, .text__container {
  display: block;
  width: 90%;

  margin: 1rem auto;
  padding: .625rem;
  font-size: 20px;
  border-radius: 1rem;
}

.score__container {
  min-height: 5.75rem;
  height: calc(100vh - 62rem);
  background-image: linear-gradient(120deg, #ebedee 0%, #fdfbfb 100%) !important;
}

.text__container {
  min-height: 15.75rem;
  height: calc(100vh - 42.75rem);
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%) !important;
  opacity: .9;
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

.correctSymbol {
  background: #6df1a8;
}

.wrongSymbol {
  background: #f16d6d;
  -webkit-animation: blink 2s ease-in infinite both;
  animation: blink 2s ease-in infinite both;
}

.nextSymbol {
  background: #d5d1ef;
  color: #2c3e50;
  -webkit-animation: blink 2s ease-in infinite both;
  animation: blink 2s ease-in infinite both;
}

@-webkit-keyframes blink {
  0% {
    background: #d5d1ef;
    color: #2c3e50;
  }
  50% {
    background: #8a83b7;
    color: #e7eaec;
  }
  100% {
    background: #d5d1ef;
    color: #2c3e50;
  }
}

@keyframes blink {
  0% {
    background: #d5d1ef;
    color: #2c3e50;
  }
  50% {
    background: #8a83b7;
    color: #e7eaec;
  }
  100% {
    background: #d5d1ef;
    color: #2c3e50;
  }
}

.btn-reset__container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.btn-reset {
  background: none;
  outline: none;
  border: none;

  padding: .5rem;
  margin-top: 1rem;
  display: flex;

  border-radius: 10rem;
  color: #494250 !important;
  box-shadow: 0 .3125rem .625rem .125rem rgba(34, 60, 80, 0.2);
}

.btn-reset:hover {
  color: #d5d1ef !important;
  background: #494250 !important;
  box-shadow: 0 .3125rem .625rem .125rem rgba(34, 60, 80, 0.2);
}
</style>
