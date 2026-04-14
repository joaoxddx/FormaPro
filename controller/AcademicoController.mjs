import { StorageService } from '../service/StorageService.mjs';
import { Categoria } from '../model/Categoria.mjs';
import { Curso } from '../model/Curso.mjs';

document.addEventListener('DOMContentLoaded', () => {
    initCategorias();
    initCursos();
});

// -------------- CATEGORIAS --------------
function initCategorias() {
    const formCat = document.getElementById('form-categoria');
    if (formCat) {
        formCat.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('cat-nome').value;
            const desc = document.getElementById('cat-desc').value;
            
            const novaCat = new Categoria(nome, desc);
            StorageService.insert('TbCategorias', novaCat);
            
            formCat.reset();
            renderCategorias();
            loadCategoriaOptions(); // atualiza o select de cursos
        });
    }
    renderCategorias();
}

function renderCategorias() {
    const lista = document.getElementById('lista-categorias');
    if (!lista) return;
    
    const categorias = StorageService.getAll('TbCategorias');
    lista.innerHTML = '';
    
    categorias.forEach(cat => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${cat.ID_Categoria}</td>
            <td class="fw-bold">${cat.Nome}</td>
            <td>${cat.Descricao}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="window.deletarCategoria(${cat.ID_Categoria})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        lista.appendChild(tr);
    });
}

// Tornar global para o onclick funcionar no HTML injetado
window.deletarCategoria = (id) => {
    if(confirm('Deseja excluir esta categoria?')) {
        StorageService.delete('TbCategorias', 'ID_Categoria', id);
        renderCategorias();
        loadCategoriaOptions();
    }
};

// -------------- CURSOS --------------
function initCursos() {
    loadCategoriaOptions();
    const formCurso = document.getElementById('form-curso');
    
    if (formCurso) {
        formCurso.addEventListener('submit', (e) => {
            e.preventDefault();
            const tit = document.getElementById('cur-titulo').value;
            const cat = document.getElementById('cur-cat').value;
            const niv = document.getElementById('cur-nivel').value;
            const aulas = document.getElementById('cur-aulas').value;
            const horas = document.getElementById('cur-horas').value;
            
            // Simula ID Instrutor 1
            const novoCurso = new Curso(tit, 'Descricao padrao...', 1, cat, niv, aulas, horas);
            StorageService.insert('TbCursos', novoCurso);
            
            formCurso.reset();
            renderCursos();
        });
    }
    renderCursos();
}

function loadCategoriaOptions() {
    const select = document.getElementById('cur-cat');
    if (!select) return;
    
    const categorias = StorageService.getAll('TbCategorias');
    select.innerHTML = '<option value="">Selecione...</option>';
    
    categorias.forEach(cat => {
        select.innerHTML += `<option value="${cat.ID_Categoria}">${cat.Nome}</option>`;
    });
}

function renderCursos() {
    const lista = document.getElementById('lista-cursos');
    if (!lista) return;
    
    const cursos = StorageService.getAll('TbCursos');
    const categorias = StorageService.getAll('TbCategorias');
    
    lista.innerHTML = '';
    
    cursos.forEach(cur => {
        const cat = categorias.find(c => c.ID_Categoria == cur.ID_Categoria);
        const catNome = cat ? cat.Nome : 'Sem categoria';
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="fw-bold">${cur.Titulo}</td>
            <td><span class="badge bg-secondary">${catNome}</span></td>
            <td>${cur.Nivel}</td>
            <td>
                <span class="text-muted small">${cur.TotalHoras}h / ${cur.TotalAulas} aulas</span>
            </td>
        `;
        lista.appendChild(tr);
    });
}
