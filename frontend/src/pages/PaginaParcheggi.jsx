import ElencoParcheggi from '../components/ElencoParcheggi.jsx';
import Mappa from '../components/Mappa.jsx';

function PaginaParcheggi() {

    return (
        <>
            {/* Area Main: Occupa tutto lo spazio restante (100vh - 64px) */}
            < div className="h-[calc(100vh-64px)] w-full px-6 py-7 flex justify-center" >

                {/* stack on small screens, side-by-side on md+ */}
                < div className="flex flex-col md:flex-row w-full max-w-[1750px] h-full gap-4 items-stretch" >

                    {/* Mappa: full width on mobile with set height, desktop uses full height */}
                    < div className="w-full md:w-[70%] h-[50vh] md:h-full rounded-xl overflow-hidden shadow-lg border border-gray-200" >
                        <Mappa />
                    </div >

                    {/* Elenco: full width on mobile, desktop uses 30% and scrolls */}
                    < div className="w-full md:w-[30%] h-auto md:h-full bg-white overflow-hidden" >
                        <ElencoParcheggi />
                    </div >

                </div >
            </div >
        </>
    )

}

export default PaginaParcheggi;