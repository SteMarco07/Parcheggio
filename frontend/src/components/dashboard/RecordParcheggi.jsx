import React, { useState } from 'react';
import { useStore } from "../../store";

function RecordParcheggi({ numero, parcheggio }) {

    const {deleteParcheggio, modificaParcheggio} = useStore();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [busy, setBusy] = useState(false);


    const handleConfirmDelete = async () => {
        setBusy(true);
        try {
            await deleteParcheggio(parcheggio.id);
        } finally {
            setBusy(false);
            setShowDeleteModal(false);
        }
    }

    const onEdit = () => {
        setShowEditModal(true);
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            setShowDeleteModal(false);
            setShowEditModal(false);
        }
    });

    return (
        <>
        <tr>
            <td>{numero}</td>
            <td>{parcheggio.nome}</td>
            <td>{parcheggio.descrizione}</td>
            <td>{parcheggio.prezzo_orario} €/h</td>
            <td>{parcheggio.lat}</td>
            <td>{parcheggio.lng}</td>
            <td><button className="btn btn-ghost" onClick={() => setShowEditModal(true)}><img src="src/assets/icona_modifica.svg" alt="Modifica" className='h-8 ' /></button></td>
            <td><button className="btn btn-ghost" onClick={() => setShowDeleteModal(true)}><img src="src/assets/icona_cestino.svg" alt="Elimina" className='h-8 ' /></button></td>
        </tr>


        {
        /* Modale modifica parcheggio */
        showEditModal && (
            <div className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Modifica {parcheggio.nome}</h3>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setBusy(true);
                            try {
                                const form = new FormData(e.target);
                                const payload = {
                                    nome: form.get('nome') || '',
                                    descrizione: form.get('descrizione') || '',
                                    prezzo_orario: parseFloat(form.get('prezzo_orario')) || 0,
                                    lat: parseFloat(form.get('lat')) || 0,
                                    lng: parseFloat(form.get('lng')) || 0,
                                };

                                modificaParcheggio(parcheggio.id, payload);

                                // chiudi la modale dopo il salvataggio; eventuale refresh dei dati
                                setShowEditModal(false);
                                // facoltativo: ricarica la pagina o emetti un evento per aggiornare la lista
                                // window.location.reload();
                            } catch (err) {
                                console.error('Impossibile salvare il parcheggio:', err);
                                // qui puoi mostrare una notifica di errore se vuoi
                            } finally {
                                setBusy(false);
                            }
                        }}
                    >
                        <div className="grid grid-cols-1 gap-3">
                            <label className="label">
                                <span className="label-text">Nome</span>
                            </label>
                            <input
                                name="nome"
                                type="text"
                                defaultValue={parcheggio.nome}
                                className="input input-bordered w-full"
                                required
                            />

                            <label className="label">
                                <span className="label-text">Descrizione</span>
                            </label>
                            <textarea
                                name="descrizione"
                                defaultValue={parcheggio.descrizione}
                                className="textarea textarea-bordered w-full"
                                rows={3}
                            />

                            <label className="label">
                                <span className="label-text">Prezzo orario (€)</span>
                            </label>
                            <input
                                name="prezzo_orario"
                                type="number"
                                step="0.01"
                                defaultValue={parcheggio.prezzo_orario}
                                className="input input-bordered w-full"
                                required
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="label">
                                        <span className="label-text">Latitudine</span>
                                    </label>
                                    <input
                                        name="lat"
                                        type="number"
                                        step="any"
                                        defaultValue={parcheggio.lat}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Longitudine</span>
                                    </label>
                                    <input
                                        name="lng"
                                        type="number"
                                        step="any"
                                        defaultValue={parcheggio.lng}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-action mt-4">
                            <button
                                type="button"
                                className="btn"
                                onClick={() => setShowEditModal(false)}
                                disabled={busy}
                            >
                                Annulla
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={busy}>
                                {busy ? 'Salvataggio...' : 'Salva'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
        }

        {

        /* Modale elimina parcheggio */
        showDeleteModal && (
            <div className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Conferma eliminazione</h3>
                    <p className="py-4">Sei sicuro di voler eliminare <strong>{parcheggio.nome}</strong>?</p>
                    <div className="modal-action">
                        <button className="btn" onClick={() => setShowDeleteModal(false)} disabled={busy}>Annulla</button>
                        <button className="btn btn-error" onClick={handleConfirmDelete} disabled={busy}>{busy ? 'Eliminazione...' : 'Elimina'}</button>
                    </div>
                </div>
            </div>
        )}
        </>
    );

}

export default RecordParcheggi;