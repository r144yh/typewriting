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
    <div>
      <b-modal id="modalLang" content-class="shadow" hide-header hide-footer centered>
        <p class="my-4">Необходимо сменить раскладку языка</p>
        <b-button class="mt-3" variant="outline-success" block @click="$bvModal.hide('modalLang')">Okay</b-button>
      </b-modal>
    </div>
    <div>
      <b-modal id="modalResult" content-class="shadow" hide-header hide-footer centered>
        <p class="my-4">Поздравляем!</p>
        <p class="my-4">Ваша скорость: {{ speed }}</p>
        <p class="my-4">Ваша точность: {{ accuracy }}</p>
        <b-button class="mt-3" variant="outline-success" block @click="resetResult">Thanks</b-button>
      </b-modal>
    </div>
    <p>{{ formattedElapsedTime }}</p>
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

      speed: 0,               /* Скорость печати */
      accuracy: 100,          /* Точность печати */
      errorsCounter: 0,       /* Счетчик ошибок */
      bestSpeed: 0,           /* Лучший результат пользователя */

      start: false,           /* Начало тренажера */
      reset: false,           /* Смена исходного текста */
      timer: null,            /* Отсчёт времени */
      speedTimer: null,       /* Отсчёт скорости */
      elapsedTime: 0,         /* Прошедшее время */
      lastSpeed: 0,           /* Последняя скорость до минут */
      lastIndex: 0,           /* Последний индекс до минут */

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
      return utc.substr(utc.indexOf(':') - 2, 8);
    },
  },
  methods: {
    async getText() {
      try {
        let response = await HTTPS.get(`/?type=all-meat&paras=1&format=text/`);
        this.text = response.data.join();
        this.text = this.text.split('');

        for (let i = 0; i < this.text.length; i++) {
          if (this.text[i] === ' ' && this.text[i - 1] === ' ') {
            this.text.splice(i, 1);
          }
        }
      } catch (error) {
        this.errors.push(error);
      }
    },

    checkSymbol(elem) {
      let reg = elem.key.match(
          /^((?!Enter|Escape|Tab|Delete|Backspace|Insert|PageUp|PageDown|ArrowLeft|ArrowRight|ArrowUp|ArrowDown|End|Home|Shift|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12).)*$/i);
      if (reg === null) return;

      let lang = elem.key.match(/[а-яё]/ig);
      if (lang !== null) {
        this.$bvModal.show('modalLang');
        return;
      }

      if (this.start === false) {
        this.timer = setInterval(() => {
          this.elapsedTime += 1000;
        }, 1000);
        this.start = true;
        this.calculateSpeed();
      }

      if (this.currentIndex < this.text.length && elem.key !== 'CapsLock') {
        if (elem.key === this.text[this.currentIndex]) {
          this.correctAnswer = true;
          this.currentIndex++;
          this.nextKey = true;
          this.calculateAccuracy();

          if ((this.currentIndex) === this.text.length) {
            if (Number(this.speed) > Number(this.bestSpeed)) {
              this.bestSpeed = this.speed;
              localStorage.setItem('bestSpeed', this.bestSpeed);
            }
            clearInterval(this.timer);
            clearInterval(this.speedTimer);
            this.$bvModal.show('modalResult');
          }
        } else {
          this.nextKey = false;
          this.wrongAnswer = true;
          this.errorsCounter++;
          this.calculateAccuracy();
        }
      }
    },

    calculateSpeed() {
      this.speedTimer = setInterval(() => {
        if (this.elapsedTime % 60000 === 0) {
          this.lastSpeed = Number(this.speed);
          this.lastIndex = this.currentIndex;
          return;
        }
        if (Math.trunc(this.elapsedTime / 60000) > 0) {
          this.speed = (((((this.currentIndex - this.lastIndex) / (this.elapsedTime % 60000)) * 60000) + this.lastSpeed) / (Math.trunc(this.elapsedTime / 60000) + 1)).toFixed(0);
        }
        else {
          this.speed = ((this.currentIndex / (this.elapsedTime % 60000)) * 60000).toFixed(0);
        }
      }, 1000);
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
      clearInterval(this.speedTimer);

      this.$bvModal.hide('modalResult');
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
