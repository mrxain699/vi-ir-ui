import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faFilePrescription,
  faLock,
  faArrowRightFromBracket,
  faGauge,
  faCircleArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../api/Auth";
import { FileContext } from "../../api/File";
import { useNavigate } from "react-router-dom";
export const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const {
    setModalVisible,
    setPasswordModalVisible,
    toggleSidebar,
    setToggleSidebar,
  } = useContext(FileContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout()
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div
      className={`sidebar w-[250px] h-screen fixed top-0 left-0  border border-slate-100  bg-white   ${
        toggleSidebar ? "max-sm:left-0 z-10" : "max-sm:left-[-100%]"
      }`}
    >
      <div
        className={`flex flex-col justify-between w-full h-full ${
          toggleSidebar ? "pt-6" : "pt-24"
        }`}
      >
        <div className="w-full flex flex-col">
          <h4 className=" text-slate-400 text-[14px] font-light ml-4 mb-4">
            Manage Directories
          </h4>
          <NavLink
            to="/dashboard"
            className="links"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            <FontAwesomeIcon icon={faGauge} className="icon" /> Dashboard
          </NavLink>
          <button
            className="links"
            onClick={() => {
              setModalVisible(true);
              setToggleSidebar(!toggleSidebar);
            }}
          >
            <FontAwesomeIcon icon={faCircleArrowUp} className="icon" /> Upload
            File
          </button>
          <NavLink
            to="/directory/files"
            className="links"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            <FontAwesomeIcon icon={faFilePrescription} className="icon" /> Fbx
            Directory
          </NavLink>
          <NavLink
            to="/directory/images"
            className="links"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            <FontAwesomeIcon icon={faFileImage} className="icon" /> Image
            Directory
          </NavLink>
          <button
            className="links"
            onClick={() => setPasswordModalVisible(true)}
          >
            <FontAwesomeIcon icon={faLock} className="icon" /> Change Password
          </button>
        </div>
        <button type="button" className="links mb-0.5" onClick={handleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="icon" />
          Logout
        </button>
      </div>
    </div>
  );
};
