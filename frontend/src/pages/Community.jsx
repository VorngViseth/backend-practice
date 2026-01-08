import '../css/index.css';
import Addplace from '../components/Addplace';

function Community() {
  return (
    <section className="w-full">
        <main className='w-full md:max-w-4xl md:mx-auto'>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-10">DerLgJmuyKnea</h1>        
            <div>
                <article id="cardContainer" ></article>
            </div>
        </main>

        <button id="addplaceBtn" className="fixed bottom-6 right-6 z-50">
            ADD PLACE
        </button>

        <div id="addplaceModal" className='w-full bg-white rounded-lg shadow-lg' ><Addplace /></div>
    </section>
  );
}

export default Community;