import Home from '../components/Home.vue';
import Login from '../components/login/Login.vue';
import Register from '../components/register/Register.vue';
import Atividade from '../components/atividade/Atividade.vue';

const routes = [
    { path: '/', component: Home, name: 'home'  },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/atividade', component: Atividade, name: 'atividade' },
];

export default routes;