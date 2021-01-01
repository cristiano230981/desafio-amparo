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
        name:"",
        email: "",
        password: "",
      },
      error: "",
      isLoading: false,
      fullPage: true,
    };
  },
  methods: {
    create() {
      
      if (this.input.name != "" && this.input.email != "" && this.input.password != "") {

        this.isLoading = true;
        const data = {"user":{"username":this.input.name, "email":this.input.email,"password":this.input.password}};
        const response = this.signUp(data);
        
        response.then((r) => {
  
          if (r.status == null && r.response.status == 401) {
              this.error = "Não foi possível criar o usuário!";
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