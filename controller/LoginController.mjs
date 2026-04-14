import { StorageService } from '../service/StorageService.mjs';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar o banco para garantir que temos o Admin e o Aluno Teste criados
    StorageService.initDb();

    const formLogin = document.getElementById('form-login');
    const erroMsg = document.getElementById('login-error');

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;

            const usuarios = StorageService.getAll('TbUsuarios');
            const user = usuarios.find(u => u.Email === email && u.SenhaHash === senha);

            if (user) {
                // Guarda o usuário logado na sessão local
                sessionStorage.setItem('usuarioLogado', JSON.stringify(user));
                
                // Redirecionamento baseado no Papel ou E-mail
                if (user.Papel === 'Admin' || user.Email === 'admin@formapro.com') {
                    window.location.href = 'index.html';
                } else {
                    window.location.href = 'home_aluno.html';
                }
            } else {
                erroMsg.classList.remove('d-none');
            }
        });
    }
});
