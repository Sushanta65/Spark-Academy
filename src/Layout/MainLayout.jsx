import { Outlet } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';
import Footer from '../components/Shared/Footer';

const MainLayout = () => {
    return (
        <div className='bg-gray-100 min-h-screen'>
            <Navbar />
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;