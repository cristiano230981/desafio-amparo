<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black">Criar uma conta</h3>
          <hr class="login-hr" />
          <p class="subtitle has-text-black">
            Entre com suas credenciais para seguir.
          </p>
          <div class="box has-text-left">
            <div class="field">
              <label class="label">Nome</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Nome"
                  v-model="input.name"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">E-mail</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="email"
                  placeholder="Seu melhor e-mail"
                  v-model="input.email"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Senha</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  placeholder="Senha"
                  v-model="input.password"
                />
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <a class="button is-link" v-on:click="create()">Criar conta</a>
              </div>
              <div class="control">
                <router-link to="/login" class="button is-link is-light"
                  >Cancelar</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="./Register.js"></script>
<style src="./Register.css"></style>