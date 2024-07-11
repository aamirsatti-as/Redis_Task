import React, { ReactNode } from 'react';
import Sidebar from './sidebar';
interface LayoutProps {
    children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
};

export default Layout;
