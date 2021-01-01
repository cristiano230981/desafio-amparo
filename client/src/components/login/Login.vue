<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>

          <div class="notification is-danger" v-if="error">
            <button class="delete" @click="error = ''"></button>
            {{ error }}
          </div>

          <h3 class="title has-text-black">Login</h3>
          <hr class="login-hr" />
          <p class="subtitle has-text-black">
            Entre com suas credenciais para seguir.
          </p>
          <div class="box">
            <form>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="email"
                    name="username"
                    v-model="input.username"
                    placeholder="E-mail"
                    autofocus=""
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="password"
                    name="password"
                    v-model="input.password"
                    placeholder="Senha"
                  />
                </div>
              </div>

              <a
                class="button is-block is-info is-large is-fullwidth"
                v-on:click="login()"
              >
                Entrar <i class="fa fa-sign-in" aria-hidden="true"></i>
              </a>
            </form>
          </div>
          <div class="has-text-centered">
            <router-link to="/register">Criar uma conta!</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="./Login.js"></script>
<style src="./Login.css"></style>