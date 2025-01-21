import { Outlet } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';

const MainLayout = () => {
    return (
        <div className='bg-gray-200 min-h-screen'>
            <Navbar />
            <Outlet/>
        </div>
    );
};

export default MainLayout;