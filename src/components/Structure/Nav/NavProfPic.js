import { useContext } from "react";
import { AuthContext } from '../../../context/AuthContext';
import AdminDropdown from "../../Dropdown/AdminDropdown"
import UserDropdown from "../../Dropdown/UserDropdown"

const NavProfPic = () => {
    const { state } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-brokenwhite">
            <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            {state.user.status === 'admin' ? <AdminDropdown /> : <UserDropdown />}
            </div>
            </div>
        </nav>
    )
}

export default NavProfPic
