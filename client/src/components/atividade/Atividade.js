
import Pagination from "../Pagination.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { requestsMixin } from "../../mixins/requestsMixin";
import Autocomplete from 'vuejs-auto-complete';
import moment from 'moment';
import Vue from 'vue';

let pagination = {
    current: 1, // página atual
    total: 0, // total itens
    itemsPerPage: 5, // Itens por página
};

Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
    }
});

Vue.filter('formatCPF', function (value) {
    if (value) {
        return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
});



export default {
    name: "atividades",
    components: { Pagination, Loading, Autocomplete },
    mixins: [requestsMixin],
    data() {
        return {
            data: [],
            results: [],
            pagination: pagination,
            error: "",
            isLoading: false,
            fullPage: true,
            isShowPaciente: false,
            isShowNovaAtividade: false,
            active_el: 0, 
            success: "",
            inputAtividade: {
                paciente: { id: '', nome: '', cpf: ''},
                vencimento: '',
                status: 0,
                descricao: ''
            },
            inputCliente: {
                nome: '',
                cpf: ''
            },
            checkin: '',
            autoCompleteSource: process.env.APIURL +  '/clientes?nome='
        };
    },
    computed: {
        authHeaders() {
            return {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        },
    },
    methods: {
        setPaciente(result) {
            this.inputAtividade.paciente = { "id": result.value, "nome": result.selectedObject.nome, "cpf": result.selectedObject.cpf };
        },
        criaPaciente() { 
            this.isLoading = true;

            const data = {
                "cliente": {
                    "nome": this.inputCliente.nome,
                    "cpf": this.inputCliente.cpf,
                }
            };

            const response = this.clientesInsert(data);

            response
                .then((r) => {
                    console.log('cadastro de clientes', r);
                    if (r.status == 201) {
                        this.success = 'Cliente cadastrado com sucesso!';
                    }
                    this.isLoading = false;
                })
                .catch((err) => {
                    this.error = err;
                    this.isLoading = false;
                });

            setTimeout(function () {
                this.success = '';
            }, 3000);

            this.isShowPaciente = false;
        },
        criaAtividade() { 
            this.isLoading = true;

            const data = {
                "atividade": {
                    "status": this.inputAtividade.status,
                    "descricao": this.inputAtividade.descricao,
                    "vencimento": this.inputAtividade.vencimento,
                    "cliente": { "id": this.inputAtividade.paciente.id, "nome": this.inputAtividade.paciente.nome, "cpf": this.inputAtividade.paciente.cpf }
                }
            };

            const response = this.atividadesInsert(data);

            response
                .then((r) => {
                    if (r.status == 201) {  
                        this.results.splice(0, 0, r.data);
                        this.success = 'Atividade cadastrada com sucesso!';
                    }
                    this.isLoading = false;
                })
                .catch((err) => {
                    this.error = err;
                    this.isLoading = false;
                });

            setTimeout(function () {
                this.success = '';
            }, 3000);

            this.isShowNovaAtividade = false;
        },
        alteraStatusAtividade(id, status) { 
            this.isLoading = true;
            
            const data = { "atividade": { "status": status.target.value } };

            const response = this.atividadesUpdate(id, data);

            response
                .then((r) => {
                    if (r.status == 200) {
                        console.log(r);
                        this.success = 'Atividade atualizada com sucesso!';
                    }
                    this.isLoading = false;
                })
                .catch((err) => {
                    this.error = err;
                });
            
            setTimeout(function() {
                this.success = '';
                console.log("teste", this.success);
            }, 3000);
        },
        onChange(page) {
            this.isLoading = true;
            
            const response = this.atividades(this.pagination.itemsPerPage, (page - 1) * this.pagination.itemsPerPage);
            response
                .then((r) => {
                    if (r.status == 200) {
                        this.results = r.data.results;
                        this.pagination.current = page;
                    }
                    this.isLoading = false;
                })
                .catch((err) => {
                    this.error = err;
                });
            
        },
        activate: function (el) {
            this.active_el = el;
        },
        filter: function (evt) {
            var val = evt.target.value;
            
            if (this.data.length == 0)
                this.data = this.results;
            
            if (val == 'all') {
                this.results = this.data;
            } else {
                switch (evt.target.name) {
                    case 'filtroCPF':
                        this.results = this.data.filter(function (e) { return e.cliente.cpf.indexOf(val) > -1; })        
                        break;
                    case 'filtroData':
                        this.results = this.data.filter(function (e) { return e.vencimento.indexOf(val) > -1; })
                        break;
                    default:
                        this.results = this.data.filter(function (e) { return e.status == val; })
                        break;
                }
                
            }
        }

    },
    filters: { 
        truncate: function(string, value) {
            return string.substring(0, value) + '...';
        }
      },
    created() {
        this.isLoading = true;
        const response = this.atividades(this.pagination.itemsPerPage, 0);
        response
            .then((r) => {
                if (r.status == 200) {
                    this.results = r.data.results;
                    this.pagination.total = r.data.resultCount;
                }
                this.isLoading = false;
            })
            .catch((err) => {
                this.error = err;
            });
        
    },
};