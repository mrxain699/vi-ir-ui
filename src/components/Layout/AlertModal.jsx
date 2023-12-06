import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FileContext } from "../../api/File";
import Loader from "./Loader";
export const AlertModal = ({ directory, id }) => {
  const { alertModalVisible, setAlertModalVisible, deleteFile, loader } =
    useContext(FileContext);
  const handleDelete = async () => {
    await deleteFile(directory, id)
      .then(() => {
        setAlertModalVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (!alertModalVisible) return null;
  return (
    <div className="modal fixed top-0 left-0 z-20 w-full h-screen inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white h-fit-content w-[400px] rounded-lg pb-4">
        <div className="modal-header w-full h-16 flex justify-between items-center px-4 border-b-2 border-slate-50">
          <h1 className="font-[500] text-xl text-red-600">Delete File</h1>
          <button
            type="button"
            className="h-full flex justify-center items-center text-black text-2xl"
            onClick={() => {
              setAlertModalVisible(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="modal-body w-full px-4 py-2 text-center">
          <span className="text-xl  text-black font-[600] text-center">
            Are you sure?
          </span>
          <br />
          <p className="text-base text-slate-600 font-[400] mt-2">
            You want to delete this file.
          </p>
          <div className="modal-button flex gap-3 justify-center items-center mt-4">
            <button
              type="button"
              className="px-8 py-2 text-lg font-[500] text-black bg-slate-300 rounded-lg hover:bg-slate-200"
              onClick={() => {
                setAlertModalVisible(false);
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-8 py-2 text-lg font-[500] text-white bg-red-600 hover:bg-red-500 rounded-lg disabled:bg-violet-50 "
              onClick={handleDelete}
              disabled={loader}
            >
              {loader ? <Loader /> : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
