import { useState } from 'react';

function ElencoParcheggi() {

    const [el, setEl] = useState([
    {
      id: 1,
      name: 'Parcheggio 1',
      description: 'Parcheggio situato in centro città, vicino a negozi e ristoranti. Offre 50 posti auto e tariffe convenienti.',
    },
    {
      id: 2,
      name: 'Parcheggio 2',
      description: 'Parcheggio coperto con 100 posti auto, situato vicino a un centro commerciale. Offre tariffe orarie e abbonamenti mensili.',
    },
    {
      id: 3,
      name: 'Parcheggio 3',
      description: 'Parcheggio all\'aperto con 30 posti auto, situato vicino a un parco pubblico. Offre tariffe giornaliere e settimanali.',
    }
  ])

    return (<div className = "join join-vertical gap-4">
        <div className = "join join-horizontal gap-4">
            <h1 className = "join-item">P</h1>
            <h2 className = "join-item">Parcheggio</h2>
        </div>
        <div className = "join-item">
            {el.map((item) => (
                <div key={item.id} className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{item.name}</h2>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )

}
export default ElencoParcheggi;