<template>
  <div class="main-page__container">
    <section class="score__container">
      <div>
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
      </div>
      <div>
        <div>
          <b-icon icon="bug" font-scale="1.2" variant="Light"></b-icon>
          <span> Количество ошибок: </span>
          <span>{{ errorsCounter }}</span>
        </div>
        <div>
          <b-icon icon="emoji-sunglasses" font-scale="1.2" variant="Light"></b-icon>
          <span> Лучший результат: </span>
          <span>{{ bestSpeed }} зн./мин</span>
        </div>
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
    <p>{{formattedElapsedTime}}</p>
  </div>
</template>

<script>
import {HTTPS} from '@/main';

export default {
  name: 'MainPage',
  data() {
    return {
      text: [],               /* Исходный текст */
      currentIndex: 0,        /* Индекс символа из текста */
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

      speed: 0,               /* Скорость печати */
      accuracy: 100,          /* Точность печати */
      errorsCounter: 0,       /* Счетчик ошибок */
      bestSpeed: 0,           /* Лучший результат пользователя */

      start: false,           /* Начало тренажера */
      reset: false,           /* Смена исходного текста */
      timer: null,            /* Отсчёт времени */
      elapsedTime: 0,         /* Прошедшее время */

      correctAnswer: false,   /* Смена класса для правильного ответа */
      wrongAnswer: false,     /* Смена класса для неправильного ответа */
      nextKey: true,          /* Смена класса для следующего вводимого символа */

      errors: [],             /* Отлов ошибок с сервера */
    };
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    }
  },
  methods: {
    async getText() {
      /*      this.text = ['a', 'b', 'c'];*/
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
        this.timer = setInterval(() => {
          this.elapsedTime += 1000;
        }, 1000);
        this.changeTimer(1);
        this.start = true;
      }

      if (this.currentIndex < this.text.length && elem.key !== 'CapsLock') {
        if (elem.key === this.text[this.currentIndex]) {
          this.correctAnswer = true;
          this.currentIndex++;
          this.nextKey = true;
          this.calculateAccuracy();

          if ((this.currentIndex + 1) === this.text.length) {
            this.changeTimer(0);
            if (this.speed > this.bestSpeed) {
              this.bestSpeed = this.speed;
              localStorage.setItem('bestSpeed', this.bestSpeed);
            }
            clearInterval(this.timer);
          }
        } else {
          this.nextKey = false;
          this.wrongAnswer = true;
          this.errorsCounter++;
          this.calculateAccuracy();
        }
      }

      console.log(elem.key);
    },
    changeTimer(num) {
      if (num === 1) {
        console.log(num);
      }
    },
    calculateAccuracy() {
      if (this.errorsCounter !== 0) {
        this.accuracy = Math.abs(((this.errorsCounter - this.text.length) / this.text.length) * 100).toFixed(1);
      }
    },
    resetResult() {
      this.getText();
      this.currentIndex = 0;

      this.speed = 0;
      this.accuracy = 100;
      this.errorsCounter = 0;

      this.start = false;

      this.correctAnswer = false;
      this.wrongAnswer = false;
      this.nextKey = true;

      this.elapsedTime = 0;

      clearInterval(this.timer);
    },
  },
  created() {
    document.addEventListener('keydown', this.checkSymbol);
    this.getText();
    this.bestSpeed = localStorage.getItem('bestSpeed');
    if (this.bestSpeed === null) {
      this.bestSpeed = 0;
      localStorage.setItem('bestSpeed', this.bestSpeed);
    }
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
  width: 80%;

  margin: 1rem auto;
  padding: 2rem;
  font-size: 20px;
  border-radius: 1rem;
}

.score__container {
  background-image: linear-gradient(120deg, #ebedee 0%, #fdfbfb 100%) !important;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.text__container {
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%) !important;
  opacity: .9;
}

.keyboard {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  user-select: none;

  padding: 5px 0;

  background: #233162;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);

  transition: bottom 0.4s;
}

.keyboard__keys {
  text-align: center;
}

.keyboard__key {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  position: relative;
  height: 45px;
  width: 6%;
  max-width: 90px;

  margin: 3px;
  padding: 0;

  border-radius: 4px;
  border: none;

  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;

  font-size: 1.05rem;
  outline: none;
  cursor: pointer;

  vertical-align: top;
  -webkit-tap-highlight-color: transparent;

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
  color: #2c3e50;
  -webkit-animation: blink2 2s ease-in infinite both;
  animation: blink2 2s ease-in infinite both;
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

@-webkit-keyframes blink2 {
  0% {
    background: #f16d6d;
    color: #2c3e50;
  }
  50% {
    background: #d40101;
    color: #e7eaec;
  }
  100% {
    background: #f16d6d;
    color: #2c3e50;
  }
}

@keyframes blink2 {
  0% {
    background: #f16d6d;
    color: #2c3e50;
  }
  50% {
    background: #d40101;
    color: #e7eaec;
  }
  100% {
    background: #f16d6d;
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
