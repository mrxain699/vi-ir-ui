import { useContext, useEffect } from "react";
import Layout from "../components/Layout/Layout.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Table } from "../components/Layout/Table";
import { title } from "../utils/Functions.jsx";
import { FileContext } from "../api/File.jsx";
const Dashboard = () => {
  const { alert, getFiles } = useContext(FileContext);
  const { name } = useParams();

  useEffect(() => {
    const getAllFiles = async (name) => {
      await getFiles(name);
    };
    getAllFiles(name);
  }, [name]);

  return (
    <Layout>
      <div className="w-1/3 h-screen ml-[250px] pt-[60px] max-sm:w-full max-sm:ml-0">
        <div className="main-wrapper w-full h-full pt-8 px-8">
          <div className="directories-divider w-full flex gap-2 items-center ">
            <h1 className="text-slate-600 text-lg flex gap-2 items-center">
              <FontAwesomeIcon
                icon={faFolderOpen}
                className="text-yellow-500"
              />
              {title(name)} Directory
            </h1>
            <div className="line grow border-y-2 border-violet-100 mt-1"></div>
          </div>
          {alert && (
            <div
              className={`alert w-full h-14 flex items-center px-4 ${
                alert.status === "success" ? "bg-green-100" : "bg-red-100"
              } rounded-xl ${
                alert.status === "success" ? "text-green-700" : "text-red-700"
              } font-[600] mt-3`}
            >
              {alert.message}
            </div>
          )}
          <Table directory={name} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
