import './App.css';
import { Footer } from './components/front/Footer';
import { Hero } from './components/front/Hero';
import { Navbar } from './components/front/Navbar';
import Sidebar from './components/front/Sidebar';

function App() {
    return (
        <>
            {/* <Sidebar></Sidebar> */}
            <Navbar />
            <main className='flex flex-col gap-10 relative'>
                <Hero />
                <div className='h-screen bg-green-200'>

                </div>
                <Footer />
            </main>
        </>
    );
}

export default App;
