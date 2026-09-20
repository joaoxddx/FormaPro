import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';

export const LoginPages = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginSenha, setLoginSenha] = useState('');
    const [regNome, setRegNome] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regSenha, setRegSenha] = useState('');
    const [regRole, setRegRole] = useState('student');
    const [activeTab, setActiveTab] = useState('login');
    const [alertMsg, setAlertMsg] = useState<{type: string, msg: string} | null>(null);

    const navigate = useNavigate();

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', {
                email: loginEmail,
                senha: loginSenha
            });

            const { access_token, user } = response.data;
            if (access_token) {
                localStorage.setItem('token', access_token);
                localStorage.setItem('access_token', access_token);
            }

            const usuarioNormalizado = {
                ...user,
                ID_Usuario: user?.id ?? user?.ID_Usuario,
                NomeCompleto: user?.nome ?? user?.NomeCompleto,
                Email: user?.email ?? user?.Email,
                Role: user?.role ?? user?.Role,
            };

            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioNormalizado));

            if (usuarioNormalizado.Role === 'admin') {
                navigate('/administracao');
            } else {
                navigate('/painel_aluno');
            }
        } catch (error: any) {
            const msg = error.response?.data?.message || 'Email ou senha incorretos!';
            setAlertMsg({ type: 'danger', msg: msg });
        }
    };

    const registro = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/users', {
                Email: regEmail,
                NomeCompleto: regNome,
                SenhaHash: regSenha,
                Role: regRole
            });
            if (response.status === 201 || response.status === 200) {
                setAlertMsg({ type: 'success', msg: 'Cadastro realizado com sucesso! Faça o login.' });
                setActiveTab('login');
            } else {
                setAlertMsg({ type: 'danger', msg: 'Ocorreu um erro ao cadastrar!' });
            }
        } catch (error: any) {
            const msg = error.response?.data?.message || 'Erro ao realizar cadastro.';
            setAlertMsg({ type: 'danger', msg: msg });
        }
    };

    return (
        <div className="auth-container p-3" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--dark-bg) 0%, #1e1b4b 100%)' }}>
            <div className="auth-card d-flex flex-column flex-md-row" style={{ maxWidth: '900px', width: '100%', backgroundColor: 'var(--dark-card)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', border: '1px solid var(--border-color)' }}>
                
                {/* Left Branding Side */}
                <div className="p-5 d-flex flex-column justify-content-center text-center bg-primary-custom text-white w-100" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                    
                    <h1 className="fw-bolder mb-3" style={{ fontSize: '3rem', letterSpacing: '-1px', position: 'relative', zIndex: 1 }}>FormaPro</h1>
                    <p className="lead position-relative z-1 mb-4">A excelência acadêmica e a inovação tecnológica no alcance das suas mãos.</p>
                    <Link to="/" className="btn btn-outline-light d-inline-block align-self-center position-relative z-1" style={{ borderRadius: '20px' }}>Voltar à Home</Link>
                </div>

                {/* Right Forms Side */}
                <div className="p-5 w-100" style={{ flex: 1 }}>
                    
                    {alertMsg && (
                        <div className={`alert alert-${alertMsg.type} alert-dismissible fade show`} role="alert">
                            {alertMsg.msg}
                            <button type="button" className="btn-close" onClick={() => setAlertMsg(null)}></button>
                        </div>
                    )}

                    <ul className="nav nav-pills nav-justified mb-4" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link w-100 ${activeTab === 'login' ? 'active bg-primary-custom text-white' : 'text-muted'}`} onClick={() => { setActiveTab('login'); setAlertMsg(null); }} type="button" style={{ borderRadius: '8px' }}>Entrar</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link w-100 ${activeTab === 'register' ? 'active bg-primary-custom text-white' : 'text-muted'}`} onClick={() => { setActiveTab('register'); setAlertMsg(null); }} type="button" style={{ borderRadius: '8px' }}>Cadastrar</button>
                        </li>
                    </ul>
                    
                    <div className="tab-content">
                        
                        {/* LOGIN FORM */}
                        {activeTab === 'login' && (
                            <div className="tab-pane fade show active">
                                <div className="text-center mb-4">
                                    <h3 className="fw-bold" style={{ color: 'var(--text-main)' }}>Bem-vindo(a) de volta!</h3>
                                    <p className="small" style={{ color: 'var(--text-muted)' }}>Acesse minicurso de demonstração padrão como `admin@formapro.com`(admin123) ou `aluno@formapro.com`(aluno123).</p>
                                </div>
                                <form onSubmit={login}>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Senha</label>
                                        <input type="password" className="form-control" value={loginSenha} onChange={(e) => setLoginSenha(e.target.value)} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 py-2">Acessar Plataforma</button>
                                </form>
                            </div>
                        )}

                        {/* REGISTRO FORM */}
                        {activeTab === 'register' && (
                            <div className="tab-pane fade show active">
                                <div className="text-center mb-4">
                                    <h3 className="fw-bold" style={{ color: 'var(--text-main)' }}>Crie sua Conta</h3>
                                    <p className="small" style={{ color: 'var(--text-muted)' }}>Preencha os dados e escolha seu perfil</p>
                                </div>
                                <form onSubmit={registro}>
                                    <div className="mb-3">
                                        <label className="form-label">Nome Completo</label>
                                        <input type="text" className="form-control" value={regNome} onChange={(e) => setRegNome(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Senha</label>
                                        <input type="password" className="form-control" value={regSenha} onChange={(e) => setRegSenha(e.target.value)} required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Você é:</label>
                                        <select className="form-select" value={regRole} onChange={(e) => setRegRole(e.target.value)} required>
                                            <option value="student">Estudante (Fazer Cursos)</option>
                                            <option value="admin">Administrador (Gerir Plataforma)</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-secondary w-100 py-2">Realizar Cadastro</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};