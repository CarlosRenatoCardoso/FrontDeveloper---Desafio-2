import { useState } from 'react';
import Swal from 'sweetalert2';
import './index.css';

import usuarioService from '../../service/usuario-service';

function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const logar = () => {
        if (!email || !senha) {
            Swal.fire({
                icon: 'error',
                text: 'O campo de e-mail e senha são obrigatórios',
                confirmButtonColor: '#43A047'
            })
            return;
        }
        usuarioService.autenticar(email,senha)
        .then(response => {
            usuarioService.salvarToken(response.data.token);
            usuarioService.salvarUsuario(response.data.usuario);
            Swal.fire({
                icon: 'success',
                title: 'Usuário autenticado com sucesso!',
                showConfirmButton: false,
                timer: 2500
            })
            setTimeout(() => {
                window.location = '/clientes';
            }, 2500)
        })
        .catch(erro => {
            Swal.fire({
                icon: 'error',
                title:'Usuário não cadastrado!',
                text: 'Verifique o email ou a senha',
                confirmButtonColor: '#43A047'
            })
        })
    };

    return (
        <div className="caixa-login">

            <div className="titulo-login">
                <h1>Login</h1>
            </div>

            <div className="grupo">
                <label for="email">E-mail</label> <br />
                <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="exemplo@exemplo" />
            </div>

            <div className="grupo">
                <label for="senha">Senha</label> <br />
                <input id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} type="password" placeholder="12345" />
            </div>

            <div className="esqueci-minha-senha">
                <a href="#">Esqueci minha senha</a>
            </div>

            <button id="btn-entrar" onClick={logar}>Entrar</button>

        </div>


    )
}

export default Login;