import { Link, useNavigate } from "react-router-dom"

const NavBar = ({isLogged, logout}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact</Link>
                {
                    isLogged ? 
                    <>
                    <button onClick={handleLogout}>Logout</button>
                    <Link to='/login'>Login</Link>
                    </>
                    :
                <Link to='/profile'>Profile</Link>
                }
            </nav>
        </>
    )
}

export default NavBar