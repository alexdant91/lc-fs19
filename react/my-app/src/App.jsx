import { Route, Routes } from 'react-router-dom'
import Home from './components/router/pages/home'
import About from './components/router/pages/About'
import Contact from './components/router/pages/Contact'
import NavBar from './components/router/components/NavBar'
import Login from './components/router/pages/Login'
import Profile from './components/router/pages/Profile'
import { useState } from 'react'

//il sistema di login/logout qui presente da vedere solo a scopo didattico, si usa ridax per questo!!

const App = () => {
    const [isLogged, setIsLogged] = useState(false)

    const login = () => {
        setIsLogged(true)
    }

    const logout = () => {
        setIsLogged(false)
    }

    return (
        <>
            <NavBar logout={logout} isLogged={isLogged} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/login' element={<Login login={login} />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </>
    )
}

export default App