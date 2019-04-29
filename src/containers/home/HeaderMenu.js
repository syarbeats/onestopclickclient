import React from 'react';

class HeaderMenu extends React.Component{
    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">
                                    <button type="button" className="btn btn-primary">Home</button><span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/adminpanel/dashboard">
                                    <button type="button" className="btn btn-secondary">Register User</button></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/user/list">
                                    <button type="button" className="btn btn-success">Show User List</button></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default HeaderMenu;
