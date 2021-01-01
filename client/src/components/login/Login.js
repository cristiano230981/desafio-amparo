import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { requestsMixin } from "../../mixins/requestsMixin";

export default {
  name: "Login",
  components: {Loading },
  mixins: [requestsMixin],
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
      error: "",
      isLoading: false,
      fullPage: true,
    };
  },
  methods: {
    login() {
      
      if (this.input.username != "" && this.input.password != "") {

        this.isLoading = true;
        const data = {"user":{"email":this.input.username,"password":this.input.password}};
        const response = this.logIn(data);
        
        response.then((r) => {
  
          if (r.status == null && r.response.status == 401) {
              this.error = "Nome de usuário ou senha inválidos!";
          }else{
            sessionStorage.setItem("token", r.data.user.token);
            sessionStorage.setItem("username", r.data.user.username);
            sessionStorage.setItem("email", r.data.user.email);

            this.$emit("authenticated", true);
            this.$router.replace({ name: "atividade" });
          }
          this.isLoading = false;
        }).catch((err) => {
          if(err.response == undefined){
              this.error = "Não foi possível estabelecer uma conexão com o servidor de aplicação!"
          }else{
            this.error = err;
          }
          this.isLoading = false;
        });


      } else {
        this.error = "Você deve entrar com suas credenciais!";
      }
    },
  },
};