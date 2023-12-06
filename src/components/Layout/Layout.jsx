import PropTypes from "prop-types";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { Modal } from "./Modal.jsx";
import { ChangePasswordModal } from "./ChangePasswordModal.jsx";
const Layout = ({ children }) => {
  return (
    <div className="layout-container w-full h-screen lg:min-h-screen">
      <Navbar />
      <Sidebar />
      <Modal />
      <ChangePasswordModal />
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
