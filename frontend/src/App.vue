<template>
  <div id="app">
    <TheHeader/>
    <MainPage/>
  </div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader';
import MainPage from '@/views/MainPage';

export default {
  name: 'App',
  components: {
    TheHeader,
    MainPage,

  },
};
</script>

<style>
#app {
  font-family: Raleway, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 500;
  letter-spacing: .1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;

}
</style>
