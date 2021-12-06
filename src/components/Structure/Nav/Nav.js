import { useContext } from 'react';
import { useHistory } from "react-router"
import { AuthContext } from '../../../context/AuthContext';
import NavButtons from './NavButtons';
import NavProfPic from './NavProfPic';

const Nav = () => {
    const { state } = useContext(AuthContext);
    
    const history = useHistory()
    
    const handleToHome = () => {
        history.push("/")
    }

    return (
        <div className="nav relative">
            <div className="nav-container">
                <img onClick={handleToHome} src="/assets/logo-dewe.png" alt="" className="logo pointer" />
                {state.isLogin ? <NavProfPic /> : <NavButtons />}
            </div>
        </div>
    )
}

export default Nav
