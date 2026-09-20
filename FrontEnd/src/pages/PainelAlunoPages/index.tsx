import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

export const PainelAlunoPages = () => {
    const navigate = useNavigate();
    const [usuarioLogado, setUsuarioLogado] = useState<any>(null);
    
    // Dados do usuário
    const [matriculas, setMatriculas] = useState<any[]>([]);
    const [minhasTrilhas, setMinhasTrilhas] = useState<any[]>([]);
    const [minhasCarreiras, setMinhasCarreiras] = useState<any[]>([]);
    const [assinatura, setAssinatura] = useState<any>(null);
    
    // Catálogo
    const [cursosDisponiveis, setCursosDisponiveis] = useState<any[]>([]);
    const [trilhasDisponiveis, setTrilhasDisponiveis] = useState<any[]>([]);
    const [carreirasDisponiveis, setCarreirasDisponiveis] = useState<any[]>([]);

    const [activeTab, setActiveTab] = useState('meus-cursos');
    const [showModal, setShowModal] = useState(false);
    const [modalTab, setModalTab] = useState('cursos');
    const [trilhaAtiva, setTrilhaAtiva] = useState<any>(null);
    const [carreiraAtiva, setCarreiraAtiva] = useState<any>(null);

    const changeTab = (tab: string) => {
        setActiveTab(tab);
        setTrilhaAtiva(null);
        setCarreiraAtiva(null);
    };

    const getLocalList = (key: string): any[] => {
        try {
            const raw = localStorage.getItem(`local_${key}`);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    };

    const addLocalItem = (key: string, item: any) => {
        const list = getLocalList(key);
        list.push(item);
        localStorage.setItem(`local_${key}`, JSON.stringify(list));
    };

    useEffect(() => {
        const userJson = localStorage.getItem('usuarioLogado');
        if (!userJson) {
            navigate('/login');
            return;
        }
        const user = JSON.parse(userJson);
        setUsuarioLogado(user);

        loadData(user.ID_Usuario || user.id);
    }, [navigate]);

    // Função de progresso simulado
    const getProgressoCurso = (idCurso: number, idUsuario: number) => {
        return ((idCurso * 37) + (idUsuario * 13)) % 100;
    };

    const loadData = async (userId: number) => {
        try {
            const [matsRes, cursosRes, trilhasRes, carreirasRes, tcRes, ctRes, assinsRes, planosRes] = await Promise.all([
                api.get('/matriculas').catch(() => ({ data: [] })),
                api.get('/cursos').catch(() => ({ data: [] })),
                api.get('/trilhas').catch(() => ({ data: [] })),
                api.get('/carreiras').catch(() => ({ data: [] })),
                api.get('/trilha-cursos').catch(() => ({ data: [] })),
                api.get('/carreira-trilhas').catch(() => ({ data: [] })),
                api.get('/assinaturas').catch(() => ({ data: [] })),
                api.get('/planos').catch(() => ({ data: [] }))
            ]);

            const allMats = Array.isArray(matsRes.data) ? matsRes.data : [];
            const mats = allMats.filter((m: any) => String(m.ID_Usuario) === String(userId));
            const todosCursos = Array.isArray(cursosRes.data) ? cursosRes.data : [];
            const todasTrilhas = Array.isArray(trilhasRes.data) ? trilhasRes.data : [];
            const todasCarreiras = Array.isArray(carreirasRes.data) ? carreirasRes.data : [];
            const trilhaCursos = Array.isArray(tcRes.data) ? tcRes.data : [];
            const carreiraTrilhas = Array.isArray(ctRes.data) ? ctRes.data : [];
            const allAssins = Array.isArray(assinsRes.data) ? assinsRes.data : [];
            const allPlanos = Array.isArray(planosRes.data) ? planosRes.data : [];

            const cursosJaMatriculadosIds = mats.map((m: any) => m.ID_Curso);

            // 1. Mapear Meus Cursos com Progresso
            const matriculasDetalhes = mats.map((m: any) => {
                const curso = todosCursos.find((c: any) => c.ID_Curso === m.ID_Curso);
                const prog = getProgressoCurso(m.ID_Curso, userId);
                return { ...m, Curso: curso, Progresso: prog };
            });
            setMatriculas(matriculasDetalhes);

            const matsTrilhasRaw = getLocalList('matriculas_trilhas').filter((m: any) => String(m.ID_Usuario) === String(userId));
            const matsTrilhas = matsTrilhasRaw.map((m: any) => m.ID_Trilha);

            const matsCarreirasRaw = getLocalList('matriculas_carreiras').filter((m: any) => String(m.ID_Usuario) === String(userId));
            const matsCarreiras = matsCarreirasRaw.map((m: any) => m.ID_Carreira);

            // 2. Mapear Minhas Trilhas
            const alunoTrilhas: any[] = [];
            const trilhasRestantes: any[] = [];

            todasTrilhas.forEach((trilha: any) => {
                if (matsTrilhas.includes(trilha.ID_Trilha)) {
                    const cursosDaTrilhaRaw = trilhaCursos.filter((tc: any) => String(tc.ID_Trilha) === String(trilha.ID_Trilha)).map((tc: any) => tc.ID_Curso);
                    const cursosDaTrilha = Array.from(new Set(cursosDaTrilhaRaw));

                    let progressoTrilha = 0;
                    let cursosDetalhados: any[] = [];
                    if (cursosDaTrilha.length > 0) {
                        let somaProgresso = 0;
                        cursosDaTrilha.forEach((cId: any) => {
                            const parsedId = Number(cId);
                            const prog = getProgressoCurso(parsedId, userId);
                            if (cursosJaMatriculadosIds.includes(parsedId)) somaProgresso += prog;
                            
                            const cur = todosCursos.find((c: any) => String(c.ID_Curso) === String(cId));
                            if (cur) cursosDetalhados.push({ ...cur, Progresso: cursosJaMatriculadosIds.includes(parsedId) ? prog : 0 });
                        });
                        progressoTrilha = Math.floor(somaProgresso / cursosDaTrilha.length);
                    }
                    alunoTrilhas.push({ ...trilha, Progresso: progressoTrilha, Cursos: cursosDetalhados });
                } else {
                    trilhasRestantes.push(trilha);
                }
            });
            setMinhasTrilhas(alunoTrilhas);
            setTrilhasDisponiveis(trilhasRestantes);

            // 3. Mapear Minhas Carreiras
            const alunoCarreiras: any[] = [];
            const carreirasRestantes: any[] = [];

            todasCarreiras.forEach((carreira: any) => {
                if (matsCarreiras.includes(carreira.ID_Carreira)) {
                    const trilhasDaCarreiraRaw = carreiraTrilhas.filter((ct: any) => String(ct.ID_Carreira) === String(carreira.ID_Carreira)).map((ct: any) => ct.ID_Trilha);
                    const trilhasDaCarreira = Array.from(new Set(trilhasDaCarreiraRaw));

                    let progressoCarreira = 0;
                    let trilhasDetalhadas: any[] = [];
                    if (trilhasDaCarreira.length > 0) {
                        let somaProgresso = 0;
                        trilhasDaCarreira.forEach((tId: any) => {
                            const tInscrita = alunoTrilhas.find(at => String(at.ID_Trilha) === String(tId));
                            if (tInscrita) {
                                somaProgresso += tInscrita.Progresso;
                                trilhasDetalhadas.push(tInscrita);
                            } else {
                                const tNaoInscrita = todasTrilhas.find((t: any) => String(t.ID_Trilha) === String(tId));
                                if (tNaoInscrita) trilhasDetalhadas.push({ ...tNaoInscrita, Progresso: 0, Cursos: [] });
                            }
                        });
                        progressoCarreira = Math.floor(somaProgresso / trilhasDaCarreira.length);
                    }
                    alunoCarreiras.push({ ...carreira, Progresso: progressoCarreira, Trilhas: trilhasDetalhadas });
                } else {
                    carreirasRestantes.push(carreira);
                }
            });
            setMinhasCarreiras(alunoCarreiras);
            setCarreirasDisponiveis(carreirasRestantes);

            // Cursos não matriculados
            setCursosDisponiveis(todosCursos.filter((c: any) => !cursosJaMatriculadosIds.includes(c.ID_Curso)));

            // Assinatura
            const userAssins = allAssins.filter((a: any) => String(a.ID_Usuario) === String(userId));
            if (userAssins.length > 0) {
                const planoId = userAssins[0].ID_Plano;
                const plan = allPlanos.find((p: any) => String(p.ID_Plano || p.id) === String(planoId));
                setAssinatura({ ...userAssins[0], Plano: plan });
            }
        } catch (error) {
            console.error('Erro ao carregar dados do aluno:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('token');
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    const simularMatriculaCurso = async (idCurso: number) => {
        if (!usuarioLogado) return;
        try {
            const matsRes = await api.get('/matriculas');
            const mats = Array.isArray(matsRes.data) ? matsRes.data : [];
            const jaMatriculado = mats.some((m: any) => 
                String(m.ID_Usuario) === String(usuarioLogado.ID_Usuario || usuarioLogado.id) &&
                String(m.ID_Curso) === String(idCurso)
            );
            if (!jaMatriculado) {
                await api.post('/matriculas', {
                    ID_Usuario: Number(usuarioLogado.ID_Usuario || usuarioLogado.id),
                    ID_Curso: Number(idCurso)
                });
            }
        } catch (e) {
            console.error('Erro ao matricular em curso:', e);
        }
    };

    const inscreverCurso = async (idCurso: number) => {
        await simularMatriculaCurso(idCurso);
        await loadData(usuarioLogado.ID_Usuario || usuarioLogado.id);
        setShowModal(false);
    };

    const inscreverTrilha = async (idTrilha: number) => {
        if (!usuarioLogado) return;
        
        const uId = usuarioLogado.ID_Usuario || usuarioLogado.id;
        const matsTrilha = getLocalList('matriculas_trilhas');
        if (!matsTrilha.some((m: any) => String(m.ID_Usuario) === String(uId) && m.ID_Trilha === idTrilha)) {
            addLocalItem('matriculas_trilhas', { ID_Usuario: uId, ID_Trilha: idTrilha });
        }

        try {
            const tcRes = await api.get('/trilha-cursos');
            const allTc = Array.isArray(tcRes.data) ? tcRes.data : [];
            const cursosDaTrilha = allTc.filter((tc: any) => String(tc.ID_Trilha) === String(idTrilha)).map((tc: any) => tc.ID_Curso);
            
            if (cursosDaTrilha.length === 0) {
                alert('Esta trilha ainda não possui cursos vinculados pelo Administrador.');
            } else {
                for (const idCurso of cursosDaTrilha) {
                    await simularMatriculaCurso(idCurso);
                }
            }
        } catch (e) {
            console.error('Erro ao inscrever na trilha:', e);
        }
        
        await loadData(uId);
        setShowModal(false);
    };

    const inscreverCarreira = async (idCarreira: number) => {
        if (!usuarioLogado) return;

        const uId = usuarioLogado.ID_Usuario || usuarioLogado.id;
        const matsCarreira = getLocalList('matriculas_carreiras');
        if (!matsCarreira.some((m: any) => String(m.ID_Usuario) === String(uId) && m.ID_Carreira === idCarreira)) {
            addLocalItem('matriculas_carreiras', { ID_Usuario: uId, ID_Carreira: idCarreira });
        }

        try {
            const ctRes = await api.get('/carreira-trilhas');
            const allCt = Array.isArray(ctRes.data) ? ctRes.data : [];
            const trilhasDaCarreira = allCt.filter((ct: any) => String(ct.ID_Carreira) === String(idCarreira)).map((ct: any) => ct.ID_Trilha);
            
            if (trilhasDaCarreira.length === 0) {
                alert('Esta carreira ainda não possui trilhas vinculadas pelo Administrador.');
            } else {
                const tcRes = await api.get('/trilha-cursos');
                const allTc = Array.isArray(tcRes.data) ? tcRes.data : [];
                let encontrouCursos = false;

                for (const idTrilha of trilhasDaCarreira) {
                    const cursosDaTrilha = allTc.filter((tc: any) => String(tc.ID_Trilha) === String(idTrilha)).map((tc: any) => tc.ID_Curso);
                    if (cursosDaTrilha.length > 0) encontrouCursos = true;
                    
                    const matsTrilha = getLocalList('matriculas_trilhas');
                    if (!matsTrilha.some((m: any) => String(m.ID_Usuario) === String(uId) && m.ID_Trilha === idTrilha)) {
                        addLocalItem('matriculas_trilhas', { ID_Usuario: uId, ID_Trilha: idTrilha });
                    }
                    for (const idCurso of cursosDaTrilha) {
                        await simularMatriculaCurso(idCurso);
                    }
                }

                if (!encontrouCursos) {
                    alert('As trilhas desta carreira ainda não possuem cursos vinculados.');
                }
            }
        } catch (e) {
            console.error('Erro ao inscrever na carreira:', e);
        }

        await loadData(uId);
        setShowModal(false);
    };

    const cancelarMatriculaCurso = async (idCurso: number) => {
        if (!usuarioLogado) return;
        if (window.confirm('Deseja realmente cancelar a inscrição neste curso?')) {
            try {
                const matsRes = await api.get('/matriculas');
                const mats = Array.isArray(matsRes.data) ? matsRes.data : [];
                const mat = mats.find((m: any) => 
                    String(m.ID_Usuario) === String(usuarioLogado.ID_Usuario || usuarioLogado.id) &&
                    String(m.ID_Curso) === String(idCurso)
                );
                if (mat) {
                    await api.delete(`/matriculas/${mat.ID_Matricula || mat.id}`);
                    await loadData(usuarioLogado.ID_Usuario || usuarioLogado.id);
                }
            } catch (e) {
                console.error('Erro ao cancelar matrícula:', e);
            }
        }
    };

    const cancelarMatriculaTrilha = async (idTrilha: number) => {
        if (!usuarioLogado) return;
        if (window.confirm('Deseja cancelar a inscrição nesta trilha?')) {
            const uId = usuarioLogado.ID_Usuario || usuarioLogado.id;
            const mats = getLocalList('matriculas_trilhas');
            const filtered = mats.filter((m: any) => !(String(m.ID_Usuario) === String(uId) && m.ID_Trilha === idTrilha));
            localStorage.setItem('local_matriculas_trilhas', JSON.stringify(filtered));
            await loadData(uId);
        }
    };

    const cancelarMatriculaCarreira = async (idCarreira: number) => {
        if (!usuarioLogado) return;
        if (window.confirm('Deseja cancelar a inscrição nesta carreira?')) {
            const uId = usuarioLogado.ID_Usuario || usuarioLogado.id;
            const mats = getLocalList('matriculas_carreiras');
            const filtered = mats.filter((m: any) => !(String(m.ID_Usuario) === String(uId) && m.ID_Carreira === idCarreira));
            localStorage.setItem('local_matriculas_carreiras', JSON.stringify(filtered));
            await loadData(uId);
        }
    };

    const ProgressBar = ({ progress }: { progress: number }) => (
        <div className="mt-3">
            <div className="d-flex justify-content-between mb-1">
                <small className="text-muted fw-bold">Progresso</small>
                <small className="text-success fw-bold">{progress}%</small>
            </div>
            <div className="progress" style={{ height: '8px', backgroundColor: 'var(--border-color)' }}>
                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}></div>
            </div>
        </div>
    );

    return (
        <div style={{ backgroundColor: 'var(--dark-bg)', minHeight: '100vh' }}>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top" style={{ backgroundColor: 'var(--dark-card)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container pb-2 pt-2">
                    <Link className="navbar-brand" to="/">Forma<span>Pro</span></Link>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#alunoNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="alunoNavbar">
                        <ul className="navbar-nav mx-auto gap-2 text-center mt-3 mt-lg-0">
                            <li className="nav-item">
                                <button className={`nav-link bg-transparent border-0 fw-bold ${activeTab === 'meus-cursos' ? 'active text-primary border-bottom border-primary border-3' : 'text-white'}`} onClick={() => changeTab('meus-cursos')}>Cursos Individuais</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link bg-transparent border-0 fw-bold ${activeTab === 'minhas-trilhas' ? 'active text-primary border-bottom border-primary border-3' : 'text-white'}`} onClick={() => changeTab('minhas-trilhas')}>Minhas Trilhas</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link bg-transparent border-0 fw-bold ${activeTab === 'minhas-carreiras' ? 'active text-primary border-bottom border-primary border-3' : 'text-white'}`} onClick={() => changeTab('minhas-carreiras')}>Minhas Carreiras</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link bg-transparent border-0 fw-bold ${activeTab === 'meu-plano' ? 'active text-primary border-bottom border-primary border-3' : 'text-white'}`} onClick={() => changeTab('meu-plano')}>Meu Plano</button>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center justify-content-center mt-3 mt-lg-0">
                            <span className="text-white me-3 d-none d-xl-inline" id="user-greeting">
                                Olá, {usuarioLogado?.NomeCompleto || 'Aluno'}
                            </span>
                            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Sair</button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">

                <div className="row mb-5">
                    <div className="col-12">
                        <div className="card card-custom p-4 bg-primary-custom text-white border-0" style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%)' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h2 className="fw-bold">Continue Seu Aprendizado</h2>
                                    <p className="mb-0 text-white-50">Confira abaixo suas trilhas, carreiras e cursos. Acompanhe seu progresso!</p>
                                </div>
                                <button className="btn btn-light fw-bold px-4 py-2" onClick={() => setShowModal(true)}>
                                    <i className="bi bi-plus-circle me-2"></i> Adicionar Cursos/Trilhas
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tab-content">
                    {/* Cursos */}
                    {activeTab === 'meus-cursos' && (
                        <div className="tab-pane fade show active">
                            <h4 className="mb-4" style={{ color: 'var(--text-main)' }}>Meus Cursos</h4>
                            <div className="row g-4">
                                {matriculas.length === 0 ? (
                                    <div className="col-12 text-center text-muted py-5"><p>Você ainda não está matriculado em nenhum curso.</p></div>
                                ) : (
                                    matriculas.map(mat => (
                                        <div className="col-md-4" key={mat.ID_Matricula}>
                                            <div className="card card-custom h-100">
                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title fw-bold text-primary-custom">{mat.Curso?.Titulo}</h5>
                                                    <ProgressBar progress={mat.Progresso} />
                                                    <div className="mt-auto pt-3 d-flex gap-2">
                                                        <Link to={`/sala_aula?curso=${mat.ID_Curso}`} className="btn btn-primary flex-grow-1">Acessar</Link>
                                                        <button className="btn btn-outline-danger px-3 fw-bold" title="Cancelar Inscrição" onClick={() => cancelarMatriculaCurso(mat.ID_Curso)}>
                                                            X
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* Trilhas */}
                    {activeTab === 'minhas-trilhas' && (
                        <div className="tab-pane fade show active">
                            {trilhaAtiva ? (
                                <div>
                                    <button className="btn btn-outline-secondary mb-4" onClick={() => setTrilhaAtiva(null)}>
                                        <i className="bi bi-arrow-left"></i> Voltar para Trilhas
                                    </button>
                                    <h4 className="mb-2" style={{ color: 'var(--text-main)' }}>{trilhaAtiva.Titulo}</h4>
                                    <p className="text-muted mb-4">{trilhaAtiva.Descricao}</p>
                                    <ProgressBar progress={trilhaAtiva.Progresso} />
                                    
                                    <h5 className="mt-5 mb-4" style={{ color: 'var(--text-main)' }}>Cursos desta Trilha</h5>
                                    <div className="row g-4">
                                        {trilhaAtiva.Cursos?.length === 0 ? (
                                            <div className="col-12 text-muted">Nenhum curso vinculado a esta trilha.</div>
                                        ) : (
                                            trilhaAtiva.Cursos?.map((c: any) => (
                                                <div className="col-md-4" key={c.ID_Curso}>
                                                    <div className="card card-custom h-100">
                                                        <div className="card-body d-flex flex-column">
                                                            <h5 className="card-title fw-bold text-primary-custom">{c.Titulo}</h5>
                                                            <ProgressBar progress={c.Progresso} />
                                                            <div className="mt-auto pt-3 d-flex gap-2">
                                                                <Link to={`/sala_aula?curso=${c.ID_Curso}`} className="btn btn-primary flex-grow-1">Acessar Curso</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h4 className="mb-4" style={{ color: 'var(--text-main)' }}>Trilhas em Andamento</h4>
                                    <div className="row g-4">
                                        {minhasTrilhas.length === 0 ? (
                                            <div className="col-12 text-center text-muted py-5"><p>Você ainda não iniciou nenhuma trilha.</p></div>
                                        ) : (
                                            minhasTrilhas.map(t => (
                                                <div className="col-md-4" key={t.ID_Trilha}>
                                                    <div className="card card-custom h-100">
                                                        <div className="card-body">
                                                            <h5 className="card-title fw-bold">{t.Titulo}</h5>
                                                            <p className="small text-muted">{t.Descricao}</p>
                                                            <ProgressBar progress={t.Progresso} />
                                                            <div className="mt-3 d-flex gap-2 justify-content-end">
                                                                <button className="btn btn-sm btn-primary" onClick={() => setTrilhaAtiva(t)}>Acessar Trilha</button>
                                                                <button className="btn btn-sm btn-outline-danger" onClick={() => cancelarMatriculaTrilha(t.ID_Trilha)}>
                                                                    <i className="bi bi-x-circle d-md-none"></i> <span className="d-none d-md-inline">Sair da Trilha</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Carreiras */}
                    {activeTab === 'minhas-carreiras' && (
                        <div className="tab-pane fade show active">
                            {carreiraAtiva ? (
                                <div>
                                    <button className="btn btn-outline-secondary mb-4" onClick={() => setCarreiraAtiva(null)}>
                                        <i className="bi bi-arrow-left"></i> Voltar para Carreiras
                                    </button>
                                    <h4 className="mb-2" style={{ color: 'var(--warning-color, #ffc107)' }}>{carreiraAtiva.Titulo}</h4>
                                    <p className="text-muted mb-4">{carreiraAtiva.Descricao}</p>
                                    <ProgressBar progress={carreiraAtiva.Progresso} />
                                    
                                    <h5 className="mt-5 mb-4" style={{ color: 'var(--text-main)' }}>Trilhas desta Carreira</h5>
                                    <div className="row g-4">
                                        {carreiraAtiva.Trilhas?.length === 0 ? (
                                            <div className="col-12 text-muted">Nenhuma trilha vinculada a esta carreira.</div>
                                        ) : (
                                            carreiraAtiva.Trilhas?.map((t: any) => (
                                                <div className="col-md-4" key={t.ID_Trilha}>
                                                    <div className="card card-custom h-100 border-primary">
                                                        <div className="card-body d-flex flex-column">
                                                            <h5 className="card-title fw-bold">{t.Titulo}</h5>
                                                            <p className="small text-muted mb-4">{t.Descricao}</p>
                                                            <div className="mt-auto">
                                                                <ProgressBar progress={t.Progresso} />
                                                                <div className="mt-3 d-flex gap-2 justify-content-end">
                                                                    <button className="btn btn-sm btn-primary w-100" onClick={() => { changeTab('minhas-trilhas'); setTrilhaAtiva(t); }}>
                                                                        Acessar Trilha
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h4 className="mb-4" style={{ color: 'var(--text-main)' }}>Suas Carreiras</h4>
                                    <div className="row g-4">
                                        {minhasCarreiras.length === 0 ? (
                                            <div className="col-12 text-center text-muted py-5"><p>Você ainda não iniciou nenhuma carreira.</p></div>
                                        ) : (
                                            minhasCarreiras.map(c => (
                                                <div className="col-md-4" key={c.ID_Carreira}>
                                                    <div className="card card-custom h-100 border-primary">
                                                        <div className="card-body">
                                                            <h5 className="card-title fw-bold text-warning">{c.Titulo}</h5>
                                                            <p className="small text-muted">{c.Descricao}</p>
                                                            <ProgressBar progress={c.Progresso} />
                                                            <div className="mt-3 d-flex gap-2 justify-content-end">
                                                                <button className="btn btn-sm btn-primary" onClick={() => setCarreiraAtiva(c)}>Acessar Carreira</button>
                                                                <button className="btn btn-sm btn-outline-danger" onClick={() => cancelarMatriculaCarreira(c.ID_Carreira)}>
                                                                    <i className="bi bi-x-circle d-md-none"></i> <span className="d-none d-md-inline">Sair da Carreira</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Meu Plano */}
                    {activeTab === 'meu-plano' && (
                        <div className="tab-pane fade show active">
                            <h4 className="mb-4" style={{ color: 'var(--text-main)' }}>Minha Assinatura</h4>
                            {assinatura ? (
                                <div className="card card-custom p-4 border-success border-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="text-success fw-bold mb-1">{assinatura.Plano?.Nome}</h5>
                                            <p className="text-muted mb-0">Ativo desde: {new Date(assinatura.DataInicio).toLocaleDateString()}</p>
                                        </div>
                                        <span className="badge bg-success py-2 px-3">Plano Ativo</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted">Você ainda não possui um plano ativo. <Link to="/#planos">Assine agora</Link>.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Matricular */}
            {showModal && (
                <div className="modal d-block bg-dark bg-opacity-75" tabIndex={-1}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content" style={{ backgroundColor: 'var(--dark-card)' }}>
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title fw-bold" style={{ color: 'var(--text-main)' }}>Catálogo de Inscrições</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body border-secondary p-0">
                                
                                <ul className="nav nav-pills p-3 border-bottom border-secondary" style={{ gap: '10px' }}>
                                    <li className="nav-item"><button className={`nav-link ${modalTab === 'cursos' ? 'active bg-primary' : 'text-muted'}`} onClick={() => setModalTab('cursos')}>Cursos</button></li>
                                    <li className="nav-item"><button className={`nav-link ${modalTab === 'trilhas' ? 'active bg-primary' : 'text-muted'}`} onClick={() => setModalTab('trilhas')}>Trilhas</button></li>
                                    <li className="nav-item"><button className={`nav-link ${modalTab === 'carreiras' ? 'active bg-primary' : 'text-muted'}`} onClick={() => setModalTab('carreiras')}>Carreiras</button></li>
                                </ul>

                                <div className="p-3" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                                    
                                    {modalTab === 'cursos' && (
                                        <div className="list-group">
                                            {cursosDisponiveis.length === 0 ? <p className="text-muted text-center py-3">Nenhum curso disponível para matrícula.</p> : cursosDisponiveis.map(curso => (
                                                <div className="list-group-item list-group-item-action bg-transparent border-secondary d-flex justify-content-between align-items-center mb-2" key={curso.ID_Curso} style={{ borderRadius: '8px', color: 'var(--text-main)' }}>
                                                    <div>
                                                        <h6 className="mb-1 fw-bold">{curso.Titulo}</h6>
                                                        <small className="text-muted">{curso.Nivel}</small>
                                                    </div>
                                                    <button className="btn btn-sm btn-outline-success fw-bold px-3" onClick={() => inscreverCurso(curso.ID_Curso)}>Inscrever-se</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {modalTab === 'trilhas' && (
                                        <div className="list-group">
                                            {trilhasDisponiveis.length === 0 ? <p className="text-muted text-center py-3">Nenhuma trilha disponível para matrícula.</p> : trilhasDisponiveis.map(trilha => (
                                                <div className="list-group-item list-group-item-action bg-transparent border-secondary d-flex justify-content-between align-items-center mb-2" key={trilha.ID_Trilha} style={{ borderRadius: '8px', color: 'var(--text-main)' }}>
                                                    <div>
                                                        <h6 className="mb-1 fw-bold text-primary-custom">{trilha.Titulo}</h6>
                                                        <small className="text-muted">{trilha.Descricao}</small>
                                                    </div>
                                                    <button className="btn btn-sm btn-outline-success fw-bold px-3" onClick={() => inscreverTrilha(trilha.ID_Trilha)}>Iniciar Trilha</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {modalTab === 'carreiras' && (
                                        <div className="list-group">
                                            {carreirasDisponiveis.length === 0 ? <p className="text-muted text-center py-3">Nenhuma carreira disponível para matrícula.</p> : carreirasDisponiveis.map(carreira => (
                                                <div className="list-group-item list-group-item-action bg-transparent border-secondary d-flex justify-content-between align-items-center mb-2" key={carreira.ID_Carreira} style={{ borderRadius: '8px', color: 'var(--text-main)' }}>
                                                    <div>
                                                        <h6 className="mb-1 fw-bold text-warning">{carreira.Titulo}</h6>
                                                        <small className="text-muted">{carreira.Descricao}</small>
                                                    </div>
                                                    <button className="btn btn-sm btn-outline-success fw-bold px-3" onClick={() => inscreverCarreira(carreira.ID_Carreira)}>Iniciar Carreira</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
