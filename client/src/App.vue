<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link :to="{name: 'home'}"  class="navbar-item" ><img
            class="logo"
            src="https://amparosaude.com.br/wp-content/uploads/2020/12/logo.png"
          /></router-link>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasic"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasic" class="navbar-menu">
        <div class="navbar-end">
         <div class="navbar-item"> 
            <div class="buttons">
              <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace  class="button is-default">Sair</router-link>
            </div>
          </div>   

        </div>
      </div>
    </nav>

    <router-view @authenticated="setAuthenticated" />

    <div class="hero-foot">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Desafio Amparo</strong> por
            <a href="http://github.com/cristiano230981">Cristiano Moura</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./components/main/App.js"></script>
<style src="./components/main/App.css"></style>