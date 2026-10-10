import {Outlet} from "react-router";


const AdminLayout = () => {
    return (
        <div className="bg-red-400">
            <Outlet/>
        </div>
    );
};

export default AdminLayout;