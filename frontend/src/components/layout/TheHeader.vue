<template>
  <div class="header__container">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="https://github.com/r144yh"
                    v-b-popover.hover.bottom="'https://github.com/r144yh'">r144yh</b-nav-item>
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
  color: #477347 !important;
}

.btn-sound {
  background: none;
  border: none;
  outline: none;
  color: #494250 !important;
}
</style>
