import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEye } from "@fortawesome/free-solid-svg-icons";
import { FileContext } from "../../api/File.jsx";
import Loader from "./Loader.jsx";
import { formatDate } from "../../utils/Functions.jsx";
import { NavLink } from "react-router-dom";
import { AlertModal } from "./AlertModal.jsx";
export const Table = ({ directory }) => {
  const { files, loader, setAlertModalVisible, errorMessage } =
    useContext(FileContext);
  const [fileId, setFileId] = useState(null);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6 w-full">
      <AlertModal directory={directory} id={fileId} />
      {files.length > 0 ? (
        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
          <thead className="text-xs text-violet-700 uppercase bg-violet-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Uploaded On
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                View
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Delete
              </th>
            </tr>
          </thead>

          <tbody>
            {files.map((file, i) => (
              <tr className="bg-white border-b hover:bg-violet-50" key={i * 5}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {file.file_org_name}
                </th>
                <td className="px-6 py-4">{formatDate(file.created_at)}</td>
                <td className="px-6 py-4 text-center">
                  <NavLink
                    to={file.file_url}
                    target="_blank"
                    className="text-xs font-[500] text-white inline-block px-2 py-1.5 bg-green-700 rounded-lg mx-auto"
                  >
                    <FontAwesomeIcon icon={faEye} />{" "}
                    <span className="ml-1">View</span>
                  </NavLink>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    className="text-xs font-[500] text-white flex gap-2 justify-center items-center px-2 py-1.5 bg-red-600 rounded-lg mx-auto"
                    onClick={() => {
                      setAlertModalVisible(true);
                      setFileId(file._id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashCan} /> <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : loader ? (
        <div className="w-full h-16 flex justify-center items-center bg-violet-50">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-16 flex justify-center items-center bg-violet-50 text-violet-600 font-[600] text-lg">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
