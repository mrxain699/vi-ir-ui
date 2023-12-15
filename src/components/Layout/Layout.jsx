import { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { Modal } from "./Modal.jsx";
import { ChangePasswordModal } from "./ChangePasswordModal.jsx";
import { AuthContext } from "../../api/Auth.jsx";
const Layout = ({ children }) => {
  const { getUser, loggedInUser } = useContext(AuthContext);
  useEffect(() => {
    const getLoggedInUser = async () => {
      await getUser();
    };
    getLoggedInUser();
  }, []);
  return (
    loggedInUser.username && (
      <div className="layout-container w-full h-screen lg:min-h-screen">
        <Navbar />
        <Sidebar />
        <Modal />
        <ChangePasswordModal />
        {children}
      </div>
    )
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
