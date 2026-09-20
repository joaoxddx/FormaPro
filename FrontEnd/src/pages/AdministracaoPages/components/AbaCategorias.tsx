import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { Modal } from '../../../components/Modal/Modal';

export const AbaCategorias = () => {
    const [categorias, setCategorias] = useState<any[]>([]);
    const [showCategoriaModal, setShowCategoriaModal] = useState(false);
    const [categoriaForm, setCategoriaForm] = useState({ ID_Categoria: 0 as number | string, Nome: '', Descricao: '' });

    useEffect(() => {
        loadDados();
    }, []);

    const loadDados = async () => {
        try {
            const response = await api.get('/categoria');
            setCategorias(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    const handleSaveCategoria = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            Nome: categoriaForm.Nome,
            Descricao: categoriaForm.Descricao,
        };

        try {
            if (categoriaForm.ID_Categoria && categoriaForm.ID_Categoria !== 0 && categoriaForm.ID_Categoria !== '0') {
                await api.patch(`/categoria/${categoriaForm.ID_Categoria}`, payload);
            } else {
                await api.post('/categoria', payload);
            }
            setShowCategoriaModal(false);
            await loadDados();
            setCategoriaForm({ ID_Categoria: 0, Nome: '', Descricao: '' });
        } catch (error) {
            console.error('Erro ao salvar categoria:', error);
        }
    };

    const openEditCategoria = (c: any) => {
        setCategoriaForm({ ID_Categoria: c.ID_Categoria || c.id, Nome: c.Nome, Descricao: c.Descricao });
        setShowCategoriaModal(true);
    };

    const handleDeleteCategoria = async (id: number) => {
        if (window.confirm('Deseja excluir esta categoria?')) {
            try {
                await api.delete(`/categoria/${id}`);
                await loadDados();
            } catch (error) {
                console.error('Erro ao excluir categoria:', error);
            }
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Categorias de Curso</h2>
                <button className="btn btn-primary" onClick={() => { setCategoriaForm({ ID_Categoria: 0, Nome: '', Descricao: '' }); setShowCategoriaModal(true); }}>+ Nova Categoria</button>
            </div>
            <div className="card card-custom p-0 overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-dark table-hover mb-0">
                        <thead><tr><th>ID</th><th>Nome</th><th>Descrição</th><th>Ações</th></tr></thead>
                        <tbody>
                            {categorias.length === 0 && <tr><td colSpan={4} className="text-center">Nenhuma categoria cadastrada.</td></tr>}
                            {categorias.map((c, index) => (
                                <tr key={c.id || `${c.ID_Categoria}-${index}`}>
                                    <td>{c.ID_Categoria}</td>
                                    <td>{c.Nome}</td>
                                    <td>{c.Descricao}</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-warning me-2" onClick={() => openEditCategoria(c)}><i className="bi bi-pencil"></i> Editar</button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteCategoria(c.ID_Categoria)}><i className="bi bi-trash"></i> Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={showCategoriaModal} onClose={() => setShowCategoriaModal(false)} title={categoriaForm.ID_Categoria && categoriaForm.ID_Categoria !== 0 && categoriaForm.ID_Categoria !== '0' ? 'Editar Categoria' : 'Cadastrar Nova Categoria'}>
                <form onSubmit={handleSaveCategoria}>
                    <div className="mb-3">
                        <label className="form-label">Nome da Categoria</label>
                        <input type="text" className="form-control" value={categoriaForm.Nome} onChange={e => setCategoriaForm({...categoriaForm, Nome: e.target.value})} required />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Descrição</label>
                        <textarea className="form-control" value={categoriaForm.Descricao} onChange={e => setCategoriaForm({...categoriaForm, Descricao: e.target.value})} required></textarea>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowCategoriaModal(false)}>Cancelar</button>
                        <button type="submit" className="btn btn-primary">Salvar Categoria</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
