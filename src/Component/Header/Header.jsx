import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider/AuthProvider";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Header = () => {
    let { user, LogOutUser } = useContext(AuthContext);
    let navigate = useNavigate();

    // Dark mode state
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load dark mode preference from local storage when the component mounts
    useEffect(() => {
        const storedMode = localStorage.getItem("darkMode");
        if (storedMode === "true") {
            setIsDarkMode(true);
            document.body.classList.add("dark");
        } else {
            setIsDarkMode(false);
            document.body.classList.remove("dark");
        }
    }, []);

    // Toggle dark mode
    const handleToggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            if (newMode) {
                document.body.classList.add("dark");
            } else {
                document.body.classList.remove("dark");
            }
            // Save the user's dark mode preference to local storage
            localStorage.setItem("darkMode", newMode);
            return newMode;
        });
    };

    let links = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/addTask">Add Task</NavLink>
            </li>
        </>
    );

    let handleLogout = () => {
        LogOutUser()
            .then(() => {
                Swal.fire({
                    text: "You successfully logged out.",
                    icon: "success",
                });
                navigate("/");
            })
            .catch((error) => error.message);
    };

    return (
        <nav>
            <div className="navbar w-11/12 mx-auto fixed top-0 z-10 px-0 border-b border-b-black bg-base-100 dark:bg-black dark:text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="text-xl font-semibold font-serif">BD IT.</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>
                <div className="navbar-end">
                    {/* Dark Mode Toggle Button */}
                    <button
                        onClick={handleToggleDarkMode}
                        className="btn btn-ghost btn-circle mx-2">
                        {isDarkMode ? (
                            <span role="img" aria-label="sun">
                                🌞
                            </span>
                        ) : (
                            <span role="img" aria-label="moon">
                                🌙
                            </span>
                        )}
                    </button>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        {user && user.displayName}
                                    </a>
                                </li>
                                <li>
                                    <a onClick={handleLogout}>
                                        Logout <FaSignOutAlt />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <Link to={'/login'} className="btn rounded-none px-4 md:px-10 btn-outline border-gray-400 dark:text-white">Login</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
