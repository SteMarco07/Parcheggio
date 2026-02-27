function ParcheggioCard({ parcheggio }) {
  return (
    <div>
      <h3>{parcheggio.nome}</h3>
      <p>Indirizzo: {parcheggio.indirizzo || "Indirizzo"}</p>
      <p>Posti disponibili: {parcheggio.postiDisponibili || 0}</p>
      <p>Descrizione: {parcheggio.descrizione || "Descrizione"}</p>
    </div>
  );
}

export default ParcheggioCard;