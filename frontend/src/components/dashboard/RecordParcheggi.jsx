import React from 'react';

function RecordParcheggi({ numero, parcheggio }) {

    const onDelete = () => {
        alert("Funzione non implementata");
    }

    const onEdit = () => {
        alert("Funzione non implementata");
    }

    return (
        <tr>
            <td>{numero}</td>
            <td>{parcheggio.nome}</td>
            <td>{parcheggio.descrizione}</td>
            <td>{parcheggio.prezzo_orario} €/h</td>
            <td>{parcheggio.lat}</td>
            <td>{parcheggio.lng}</td>
            <td><button className="btn btn-warning" onClick={onEdit}>Modifica</button></td>
            <td><button className="btn btn-error" onClick={onDelete}>Elimina</button></td>
        </tr>
    );

}

export default RecordParcheggi;