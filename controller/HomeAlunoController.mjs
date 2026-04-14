import { StorageService } from '../service/StorageService.mjs';
import { Avaliacao } from '../model/Avaliacao.mjs';
import { Matricula } from '../model/Matricula.mjs';

document.addEventListener('DOMContentLoaded', () => {
    // Auth Guard
    const userJson = sessionStorage.getItem('usuarioLogado');
    if(!userJson) {
        window.location.href = 'login.html';
        return;
    }
    const user = JSON.parse(userJson);
    
    // Header Info
    const nomeSpan = document.getElementById('nome-usuario-logado');
    if(nomeSpan) nomeSpan.textContent = `Olá, ${user.NomeCompleto}`;

    // Logout
    const btnLogout = document.getElementById('btn-logout');
    if(btnLogout) {
        btnLogout.addEventListener('click', () => {
            sessionStorage.removeItem('usuarioLogado');
            window.location.href = 'login.html';
        });
    }

    if(!localStorage.getItem('TbAvaliacoes')) {
        StorageService.saveAll('TbAvaliacoes', []);
    }

    renderExplorarCursos();
    renderMeusCursos();
    initModalComentarios();
});

// Tornar métodos globais para onClick no HTML
window.matricularAluno = (idCurso) => {
    const user = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    const matricula = new Matricula(user.ID_Usuario, idCurso);
    StorageService.insert('TbMatriculas', matricula);
    alert('Matriculado com sucesso!');
    renderExplorarCursos();
    renderMeusCursos();
};

window.abrirSalaAula = (idCurso, titulo) => {
    document.getElementById('modalSalaAulaTitle').textContent = `Assistindo: ${titulo}`;
    const lista = document.getElementById('lista-conteudo-curso');
    lista.innerHTML = '';
    
    // Na nossa base (TbAulas, TbModulos) está vazia no mock default, mas caso o prof/admin insira:
    const aulas = StorageService.getAll('TbAulas').filter(a => a.ID_Curso == idCurso || true); // simplificado
    
    if (aulas.length === 0) {
        lista.innerHTML = '<div class="p-3 text-muted text-center">Nenhuma aula cadastrada pelo Admin ainda.</div>';
    } else {
        aulas.forEach(a => {
            lista.innerHTML += `
                <button class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" onclick="window.tocarAula('${a.Titulo}')">
                    <i class="bi bi-play-circle me-2"></i> ${a.Titulo}
                    <span class="badge bg-primary rounded-pill">${a.DuracaoMinutos}m</span>
                </button>
            `;
        });
    }
    
    const bsModal = new bootstrap.Modal(document.getElementById('modalSalaAula'));
    bsModal.show();
};

window.tocarAula = (titulo) => {
    document.getElementById('player-container').innerHTML = `
        <div class="ratio ratio-16x9 bg-dark">
            <div class="d-flex align-items-center justify-content-center text-white flex-column h-100">
                <i class="bi bi-play-btn fs-1 mb-2 text-primary"></i>
                <h5>Reproduzindo: ${titulo}</h5>
                <small class="text-muted">Simulação de Vídeo</small>
            </div>
        </div>
    `;
};

// Aba: Explorar Cursos
function renderExplorarCursos() {
    const vitrine = document.getElementById('vitrine-cursos');
    if (!vitrine) return;

    const user = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    const cursos = StorageService.getAll('TbCursos');
    const categorias = StorageService.getAll('TbCategorias');
    const matriculas = StorageService.getAll('TbMatriculas');
    
    vitrine.innerHTML = '';
    
    cursos.forEach(cur => {
        const cat = categorias.find(c => c.ID_Categoria == cur.ID_Categoria) || { Nome: 'Geral' };
        
        // Verifica se o usuário já tem matrícula
        const isMatriculado = matriculas.some(m => m.ID_Usuario == user.ID_Usuario && m.ID_Curso == cur.ID_Curso);
        
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0 course-card">
                <div class="card-body p-4">
                    <span class="badge bg-primary mb-2">${cat.Nome}</span>
                    <h5 class="fw-bold text-dark">${cur.Titulo}</h5>
                    <p class="text-muted small mb-3">${cur.Descricao}</p>
                    <ul class="list-unstyled mb-3 small">
                        <li><i class="bi bi-bar-chart-fill text-warning"></i> Nível: ${cur.Nivel}</li>
                        <li><i class="bi bi-clock-fill text-info"></i> Horas: ${cur.TotalHoras}h</li>
                        <li><i class="bi bi-journal-text text-success"></i> Aulas: ${cur.TotalAulas}</li>
                    </ul>
                    <hr>
                    <div class="d-flex gx-2">
                        ${isMatriculado 
                            ? `<button class="btn btn-secondary w-100 fw-bold me-2" disabled>Já Matriculado</button>` 
                            : `<button class="btn btn-success w-100 fw-bold me-2" onclick="window.matricularAluno(${cur.ID_Curso})">Matricular-se</button>`
                        }
                        <button class="btn btn-outline-dark fw-bold btn-avaliacoes" data-id="${cur.ID_Curso}" data-titulo="${cur.Titulo}">
                            <i class="bi bi-chat-left-text"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        vitrine.appendChild(col);
    });

    document.querySelectorAll('.btn-avaliacoes').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('button').dataset.id;
            const titulo = e.target.closest('button').dataset.titulo;
            abrirAvaliacoes(id, titulo);
        });
    });
}

// Aba: Meus Cursos
function renderMeusCursos() {
    const lista = document.getElementById('lista-meus-cursos');
    if (!lista) return;

    const user = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    const cursos = StorageService.getAll('TbCursos');
    const categorias = StorageService.getAll('TbCategorias');
    const matriculas = StorageService.getAll('TbMatriculas');
    
    lista.innerHTML = '';
    
    const minhasDocs = matriculas.filter(m => m.ID_Usuario == user.ID_Usuario);
    
    if(minhasDocs.length === 0) {
        lista.innerHTML = '<div class="col-12"><div class="alert alert-warning">Você ainda não está matriculado em nenhum curso. Vá para "Explorar Cursos" para começar!</div></div>';
        return;
    }

    minhasDocs.forEach(m => {
        const cur = cursos.find(c => c.ID_Curso == m.ID_Curso);
        if(!cur) return;
        const cat = categorias.find(c => c.ID_Categoria == cur.ID_Categoria) || { Nome: 'Geral' };
        
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = `
            <div class="card h-100 shadow border-success course-card border-2">
                <div class="card-body p-4 text-center">
                    <span class="badge bg-success mb-2">Matrícula Ativa</span>
                    <h5 class="fw-bold text-dark mt-2">${cur.Titulo}</h5>
                    <p class="text-muted small">${cur.Descricao}</p>
                    
                    <div class="progress mb-3" style="height: 10px;">
                        <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    
                    <button class="btn btn-primary w-100 fw-bold mt-2 rounded-pill" onclick="window.abrirSalaAula(${cur.ID_Curso}, '${cur.Titulo}')">
                        <i class="bi bi-play-fill fs-5"></i> Assistir Aulas
                    </button>
                </div>
            </div>
        `;
        lista.appendChild(col);
    });
}

function abrirAvaliacoes(idCurso, tituloCurso) {
    document.getElementById('modalComentariosTitle').textContent = `Avaliações: ${tituloCurso}`;
    document.getElementById('com-curso-id').value = idCurso;
    renderAvaliacoesLista(idCurso);
    const bsModal = new bootstrap.Modal(document.getElementById('modalComentarios'));
    bsModal.show();
}

function renderAvaliacoesLista(idCurso) {
    const container = document.getElementById('lista-avaliacoes');
    const avaliacoes = StorageService.getAll('TbAvaliacoes').filter(a => a.ID_Curso == idCurso);
    const usuarios = StorageService.getAll('TbUsuarios');

    if(avaliacoes.length === 0) {
        container.innerHTML = '<div class="alert alert-info">Ainda não há avaliações para este curso. Seja o primeiro!</div>';
        return;
    }

    container.innerHTML = '';
    avaliacoes.reverse().forEach(av => {
        const u = usuarios.find(usr => usr.ID_Usuario == av.ID_Usuario) || { NomeCompleto: 'Usuário Desconhecido' };
        let stars = '';
        for(let i=0; i<5; i++) {
            stars += `<i class="bi bi-star${i < av.Nota ? '-fill text-warning' : ' text-muted'}"></i>`;
        }

        container.innerHTML += `
            <div class="card mb-2 border-0 shadow-sm">
                <div class="card-body py-2">
                    <div class="d-flex justify-content-between">
                        <strong class="small">${u.NomeCompleto}</strong>
                        <span>${stars}</span>
                    </div>
                    <p class="mb-0 text-muted small mt-1">"${av.Comentario}"</p>
                </div>
            </div>
        `;
    });
}

function initModalComentarios() {
    const form = document.getElementById('form-comentario');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const idCurso = document.getElementById('com-curso-id').value;
            const nota = document.getElementById('com-nota').value;
            const texto = document.getElementById('com-texto').value;
            const user = JSON.parse(sessionStorage.getItem('usuarioLogado'));

            const avaliacao = new Avaliacao(user.ID_Usuario, idCurso, nota, texto);
            StorageService.insert('TbAvaliacoes', avaliacao);

            form.reset();
            renderAvaliacoesLista(idCurso);
        });
    }
}
