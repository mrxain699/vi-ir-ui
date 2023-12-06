import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../api/Auth.jsx";
import { FileContext } from "../../api/File.jsx";
import { title } from "../../utils/Functions.jsx";
export const Navbar = () => {
  const { loggedInUser } = useContext(AuthContext);
  const { toggleSidebar, setToggleSidebar } = useContext(FileContext);
  return (
    <div className="navbar w-full h-[60px] flex justify-between items-center shadow px-14 max-sm:px-8 bg-white z-10 fixed top-0 left-0">
      <div className="w-fit logo h-full flex justify-center items-center">
        <NavLink to="/dashboard" className="font-bold text-2xl text-violet-600">
          VI-IR
        </NavLink>
      </div>
      <div className="profile w-fit h-full flex justify-center items-center">
        <span className="text-base text-black font-[400] block max-sm:hidden">
          Welcome, {title(loggedInUser.username)}
        </span>
        <button
          type="button"
          className="w-fit h-fit hidden justify-center items-center text-2xl text-violet-600  ml-3  max-sm:flex"
          onClick={() => {
            setToggleSidebar(!toggleSidebar);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </div>
  );
};
