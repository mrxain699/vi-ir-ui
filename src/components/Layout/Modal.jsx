import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCloudArrowUp,
  faFilePrescription,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { FileContext } from "../../api/File";
import Loader from "./Loader";
export const Modal = () => {
  const { uploadFile, loader, modalVisible, setModalVisible } =
    useContext(FileContext);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setType("images");
      const reader = new FileReader();
      reader.onload = () => {
        setFile(droppedFile);
        setImage(reader.result);
      };
      reader.readAsDataURL(droppedFile);
    } else {
      setFile(droppedFile);
      setType("files");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      await uploadFile(formData, type);
      setModalVisible(false);
      setFile(null);
      setImage(null);
      setError(null);
    } else {
      setError("Image is required");
    }
  };

  if (!modalVisible) return null;
  return (
    <div className="modal fixed top-0 left-0 z-20 w-full h-screen inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white h-fit-content w-[400px] rounded-lg pb-4">
        <div className="modal-header w-full h-16 flex justify-between items-center px-4 border-b-2 border-slate-50">
          <h1 className="font-[500] text-xl text-violet-600">Upload File</h1>
          <button
            type="button"
            className="h-full flex justify-center items-center text-violet-600 text-2xl"
            onClick={() => {
              setModalVisible(false);
              setFile(null);
              setImage(null);
              setError(null);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="modal-body w-full px-4 py-2">
          {error && (
            <div className="bg-red-100 rounded-lg w-full px-3 py-3 mt-2 ">
              <p className="text-base text-red-500 font-[500]">{error}</p>
            </div>
          )}
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div
              onClick={() => inputRef.current.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="w-full h-[200px] border-4 border-dotted border-violet-200 relative z-10 cursor-pointer mt-2"
            >
              {file && (
                <div className="absolute w-full h-full flex flex-col justify-center items-center z-20 bg-white">
                  <div className="w-16 h-16 overflow-hidden m-2">
                    {file.type.startsWith("image/") ? (
                      <img
                        src={image}
                        alt="image"
                        className="w-full h-full object-fill object-center"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faFilePrescription}
                        className="text-6xl w-full h-full object-cover object-center text-violet-600"
                      />
                    )}
                  </div>
                  <p className="text-violet-600 font-[600]">{file.name}</p>
                </div>
              )}
              <div className="w-full h-full flex justify-center items-center text-slate-400 text-sm z-0">
                Drop file here or click to upload
              </div>
            </div>
            <input
              type="file"
              name="file"
              hidden
              accept="image/*, .fbx, .zip, .rar"
              ref={inputRef}
            />

            <button
              type="submit"
              className="bg-violet-600 text-white text-lg w-full flex gap-2 justify-center items-center px-4 py-2 mt-5 rounded-lg disabled:cursor-not-allowed disabled:bg-violet-400"
              disabled={loader}
            >
              {!loader ? (
                <div className="flex items-center justify-center gap-2 ">
                  <FontAwesomeIcon icon={faCloudArrowUp} />
                  Upload File
                </div>
              ) : (
                <Loader />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
