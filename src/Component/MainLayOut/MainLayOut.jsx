import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const MainLayOut = () => {
    return (
        <div className="w-11/12 mx-auto dark:bg-black dark:text-white">
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayOut;