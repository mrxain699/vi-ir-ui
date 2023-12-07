import { useState, useContext, useEffect } from "react";
import Layout from "../components/Layout/Layout.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faFilePrescription,
  faFolderTree,
  faFolderOpen,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { CounterItem } from "../components/Dashboard/CounterItem.jsx";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../api/Auth.jsx";
import { FileContext } from "../api/File.jsx";
import { title } from "../utils/Functions.jsx";
const Dashboard = () => {
  const { loggedInUser } = useContext(AuthContext);
  const {
    alert,
    getTotalFiles,
    uploadFile,
    getTotalDiectories,
    setModalVisible,
  } = useContext(FileContext);
  const [totalImages, setTotalImages] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [totalDirectories, setTotalDirectories] = useState(0);

  const getTotalFile = async (directory) => {
    try {
      const response = await getTotalFiles(directory);
      if (response) {
        if (directory === "images") {
          setTotalImages(response);
        } else {
          setTotalFiles(response);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getTotalDirectory = async () => {
    try {
      const response = await getTotalDiectories();
      if (response) {
        setTotalDirectories(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTotalFile("files");
    getTotalFile("images");
    getTotalDirectory();
  }, [uploadFile]);

  return (
    <Layout>
      <div className="w-1/3 h-screen ml-[250px] pt-[60px] max-sm:w-full max-sm:ml-0">
        <div className="main-wrapper w-full h-full pt-10 px-8 max-sm:px-6">
          {alert && (
            <div
              className={`alert w-full h-14 flex items-center px-4 ${
                alert.status === "success" ? "bg-green-100" : "bg-red-100"
              } rounded-xl ${
                alert.status === "success" ? "text-green-700" : "text-red-700"
              } font-[600]`}
            >
              {alert.message}
            </div>
          )}

          <span className="text-base text-black font-[400] block max-sm:flex max-lg:hidden lg:hidden">
            Welcome, {title(loggedInUser.username)}
          </span>
          <div className="counter w-full flex flex-wrap gap-4 mt-4">
            <CounterItem
              bgColor="bg-violet-50"
              textColor="text-violet-600"
              iconColor="text-violet-500"
              borderColor="border-violet-100"
              title="Directories"
              total={totalDirectories}
              icon={faFolderTree}
            />
            <CounterItem
              bgColor="bg-violet-50"
              textColor="text-violet-600"
              iconColor="text-violet-500"
              borderColor="border-violet-100"
              title="Images"
              total={totalImages}
              icon={faFileImage}
            />
            <CounterItem
              bgColor="bg-violet-50"
              textColor="text-violet-600"
              iconColor="text-violet-500"
              borderColor="border-violet-100"
              title="Fbx Files"
              total={totalFiles}
              icon={faFilePrescription}
            />
          </div>
          <div className="directories-divider w-full flex gap-2 flex-wrap items-center my-2 realtive">
            <h1 className="text-violet-600 text-lg ">Directories</h1>
            <div className="line grow border-y-2 border-violet-100 mt-1"></div>
            <button
              className="bg-violet-600 text-white text-basic px-4 py-2 rounded-lg flex gap-2 items-center  hover:bg-violet-500 max-sm:w-full max-sm:justify-center"
              onClick={() => setModalVisible(true)}
            >
              <FontAwesomeIcon icon={faCloudArrowUp} /> Upload File
            </button>
          </div>
          <div className="directories w-full flex flex-wrap gap-8 my-4">
            <NavLink
              to="/directory/images"
              className="directories-link hover:bg-violet-50"
            >
              <FontAwesomeIcon
                icon={faFolderOpen}
                className="text-6xl text-yellow-500 ml-1"
              />
              <span className="text-sm text-slate-600">Images</span>
            </NavLink>
            <NavLink
              to="/directory/files"
              className="directories-link hover:bg-violet-50"
            >
              <FontAwesomeIcon
                icon={faFolderOpen}
                className="text-6xl text-yellow-500 ml-1"
              />
              <span className="text-sm text-slate-600">Fbx Files</span>
            </NavLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
