<template>
  <div class="hero-body">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">&nbsp;</h1>
        </div>
      </div>
    </section>

    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Atividades</h1>
          <h2 class="subtitle">Manutenção de cadastro de clientes</h2>
          <div class="navbar-end custom">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary" v-on:click="isShowPaciente = true"
                  >Novo Paciente</a
                >
                <a
                  class="button is-primary"
                  v-on:click="isShowNovaAtividade = true"
                  >Nova Atividade</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <p class="control is-expanded">
                      <input
                        name="filtroCPF"
                        class="input"
                        type="text"
                        @keyup="filter"
                        placeholder="CPF do paciente"
                      />
                    </p>
                  </div>
                  <div class="field">
                    <p
                      class="control is-expanded"
                    >
                      <span class="select">
                        <select
                          placeholder="Status"
                          v-on:change="filter"
                          name="filtroStatus"
                        >
                          <option value="all">Todas</option>
                          <option value="0">Aberto</option>
                          <option value="1">Atrasado</option>
                          <option value="2">Finalizado</option>
                        </select>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control is-expanded">
                      <input class="input"
                        type="text"
                        placeholder="Data (DD/MM/YYYY)"
                        @keyup="filter"
                        name="filtroData"
                      />
                    </p>
                  </div>
                  <p class="control">
                    <a class="button is-info" v-on:click="onChange(1)">
                      Filtrar
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="hero is-fullheight">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="fullPage"
      ></loading>

      <div id="body"></div>

      <section class="section">
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <div class="content is-medium">
              <div class="notification is-danger" v-if="error">
                <button class="delete" @click="error = ''"></button>
                {{ error }}
              </div>
              <div class="notification is-success" v-if="success">
                <button class="delete" @click="success = ''"></button>
                {{ success }}
              </div>

              <table class="table">
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>CPF</th>
                    <th>Data</th>
                    <th>Atividade</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="results.length == 0">
                    <td colspan="5">Nenhum registro cadastrado</td>
                  </tr>
                  <tr
                    v-for="(item, index) in results"
                    v-bind:key="item.id"
                    :class="{
                      even: index % 2,
                      odd: !(index % 2),
                      active: active_el == item.id,
                    }"
                    @click="activate(item.id)"
                  >
                    <td>{{ item["cliente"].nome }}</td>
                    <td>{{ item["cliente"].cpf | formatCPF }}</td>
                    <td>{{ item["vencimento"] | formatDate }}</td>
                    <td>{{ item["descricao"] | truncate(50)}}</td>
                    <td>
                      <p class="control is-expanded">
                        <span class="select">
                          <select
                            placeholder="Status"
                            v-model="item['status']"
                            @change="alteraStatusAtividade(item['id'], $event)"
                          >
                            <option value="0">Aberto</option>
                            <option value="1">Atrasado</option>
                            <option value="2">Finalizado</option>
                          </select>
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <pagination
                :current="pagination.current"
                :total="pagination.total"
                :itemsPerPage="pagination.itemsPerPage"
                :onChange="onChange"
                :step="1"
              />
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="modal" v-bind:class="{ 'is-active': isShowPaciente }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Novo Paciente</p>
          <button
            class="delete"
            aria-label="close"
            v-on:click="isShowPaciente = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Nome</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Nome"
                v-model="inputCliente.nome"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">CPF</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="CPF"
                v-model="inputCliente.cpf"
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" v-on:click="criaPaciente()">
            Salvar
          </button>
          <button class="button" v-on:click="isShowPaciente = false">
            Cancelar
          </button>
        </footer>
      </div>
    </div>

    <div class="modal" v-bind:class="{ 'is-active': isShowNovaAtividade }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Nova Atividade</p>
          <button
            class="delete"
            aria-label="close"
            v-on:click="isShowNovaAtividade = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <div
            class="container"
            style="padding-top: 10px; padding-bottom: 10px"
          >
            <div class="field is-horizontal">
              <div class="field-body">
                <autocomplete
                  :source="autoCompleteSource"
                  results-property="results"
                  :request-headers="authHeaders"
                  results-display="nome"
                  inputClass="input"
                  @selected="setPaciente"
                  placeholder="Busque p paciente por Nome ou por CPF"
                  clearButtonIcon="True"
                >
                </autocomplete>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input
                      class="input"
                      type="text"
                      v-model="inputAtividade.vencimento"
                      placeholder="Data de Vencimento"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <div
                    class="control is-expanded has-icons-left has-icons-right"
                  >
                    <div class="select is-fullwidth">
                      <select v-model="inputAtividade.status">
                        <option value="0">Aberto</option>
                        <option value="1">Atrasado</option>
                        <option value="2">Finalizado</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <textarea
                      v-model="inputAtividade.descricao"
                      class="textarea"
                      placeholder="Atividade"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" v-on:click="criaAtividade()">
            Salvar
          </button>
          <button class="button" v-on:click="isShowNovaAtividade = false">
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script src="./Atividade.js"></script>
<style src="./Atividade.css"></style>