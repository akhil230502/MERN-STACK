import React from 'react'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";

const Header = () => {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={"/home"} >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={"/book"}>Books</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={"/user"}> Profile <CgProfile/></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
