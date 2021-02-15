<template>
  <div class="header__container">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <button
              class="btn-sound"
              v-b-popover.hover.top="'Отключить звуки нажатия клавиш'"
              v-if="sound"
              @click="sound = false">
            <b-icon icon="volume-up" font-scale="1.5" variant="Light"></b-icon>
          </button>
          <button
              class="btn-sound"
              v-b-popover.hover.top="'Включить звуки нажатия клавиш'"
              v-else
              @click="sound = true">
            <b-icon icon="volume-mute" font-scale="1.5" variant="Light"></b-icon>
          </button>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      sound: true,
    };
  },
};
</script>

<style scoped>
.header__container {
  padding: .2rem !important;
  box-shadow: 0 .3125rem .625rem .125rem rgba(34, 60, 80, 0.2);
}

a {
  color: #282626 !important;
}

a:hover {
  color: #282626 !important;
}

.btn-sound {
  background: none;
  border: none;
  outline: none;
  color: #494250 !important;
}
</style>
