import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { Modal } from '../../../components/Modal/Modal';

export const AbaPlanos = () => {
    const [planos, setPlanos] = useState<any[]>([]);
    
    const [showPlanoModal, setShowPlanoModal] = useState(false);
    const [planoForm, setPlanoForm] = useState({ ID_Plano: 0 as number | string, Nome: '', Descricao: '', Preco: 0, DuracaoMeses: 1 });

    useEffect(() => {
        loadDados();
    }, []);

    const loadDados = async () => {
        try {
            const response = await api.get('/planos');
            setPlanos(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Erro ao carregar planos:', error);
        }
    };

    const handleSavePlano = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            Nome: planoForm.Nome,
            Descricao: planoForm.Descricao,
            Preco: Number(planoForm.Preco),
            DuracaoMeses: Number(planoForm.DuracaoMeses)
        };

        try {
            if (planoForm.ID_Plano && planoForm.ID_Plano !== 0 && planoForm.ID_Plano !== '0') {
                await api.patch(`/planos/${planoForm.ID_Plano}`, payload);
            } else {
                await api.post('/planos', payload);
            }
            setShowPlanoModal(false);
            await loadDados();
        } catch (error) {
            console.error('Erro ao salvar plano:', error);
        }
    };

    const openEditPlano = (p: any) => {
        setPlanoForm({ ID_Plano: p.ID_Plano || p.id, Nome: p.Nome, Descricao: p.Descricao, Preco: p.Preco, DuracaoMeses: p.DuracaoMeses });
        setShowPlanoModal(true);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestão de Planos</h2>
                <button className="btn btn-primary" onClick={() => { setPlanoForm({ ID_Plano: 0, Nome: '', Descricao: '', Preco: 0, DuracaoMeses: 1 }); setShowPlanoModal(true); }}>+ Novo Plano</button>
            </div>
            <div className="card card-custom p-0 overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-dark table-hover mb-0">
                        <thead><tr><th>ID</th><th>Nome</th><th>Preço</th><th>Ações</th></tr></thead>
                        <tbody>
                            {planos.length === 0 && <tr><td colSpan={4} className="text-center">Nenhum plano cadastrado.</td></tr>}
                            {planos.map((p, index) => (
                                <tr key={p.id || `${p.ID_Plano}-${index}`}>
                                    <td>{p.ID_Plano}</td>
                                    <td>{p.Nome}</td>
                                    <td>R$ {Number(p.Preco).toFixed(2)}</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-warning" onClick={() => openEditPlano(p)}><i className="bi bi-pencil"></i> Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={showPlanoModal} onClose={() => setShowPlanoModal(false)} title={planoForm.ID_Plano && planoForm.ID_Plano !== 0 && planoForm.ID_Plano !== '0' ? 'Editar Plano' : 'Cadastrar Novo Plano'}>
                <form onSubmit={handleSavePlano}>
                    <div className="mb-3">
                        <label className="form-label">Nome do Plano</label>
                        <input type="text" className="form-control" value={planoForm.Nome} onChange={e => setPlanoForm({...planoForm, Nome: e.target.value})} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descrição</label>
                        <textarea className="form-control" value={planoForm.Descricao} onChange={e => setPlanoForm({...planoForm, Descricao: e.target.value})} required></textarea>
                    </div>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label className="form-label">Preço (R$)</label>
                            <input type="number" step="0.01" className="form-control" value={planoForm.Preco} onChange={e => setPlanoForm({...planoForm, Preco: Number(e.target.value)})} required />
                        </div>
                        <div className="col-6 mb-3">
                            <label className="form-label">Duração (Meses)</label>
                            <input type="number" className="form-control" value={planoForm.DuracaoMeses} onChange={e => setPlanoForm({...planoForm, DuracaoMeses: Number(e.target.value)})} required />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowPlanoModal(false)}>Cancelar</button>
                        <button type="submit" className="btn btn-primary">Salvar Plano</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
