import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FileContext } from "../../api/File";
import { AuthContext } from "../../api/Auth";
import Loader from "./Loader";
const Initialize_Field = {
  password: "",
  confirm_password: "",
};
export const ChangePasswordModal = () => {
  const { loader, paswordModalVisible, setPasswordModalVisible } =
    useContext(FileContext);
  const { change_password, errorMessage } = useContext(AuthContext);
  const [formData, setFormData] = useState(Initialize_Field);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await change_password(formData);
    if (formData.password === formData.confirm_password) {
      setFormData(Initialize_Field);
      setPasswordModalVisible(false);
    }
  };

  if (!paswordModalVisible) return null;
  return (
    <div className="modal fixed top-0 left-0 z-20 w-full h-screen inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white h-fit-content w-[400px] rounded-lg pb-4">
        <div className="modal-header w-full h-16 flex justify-between items-center px-4 border-b-2 border-slate-50">
          <h1 className="font-[500] text-xl text-violet-600">
            Change Password
          </h1>
          <button
            type="button"
            className="h-full flex justify-center items-center text-violet-600 text-2xl"
            onClick={() => {
              setPasswordModalVisible(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="modal-body w-full px-4 py-2">
          {errorMessage && (
            <div className="bg-red-100 rounded-lg w-full px-3 py-3 mt-3">
              <p className="text-base text-red-500 font-[500]">
                {errorMessage}
              </p>
            </div>
          )}
          <form method="post" onSubmit={handleSubmit}>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              required
              className="input placeholder:text-sm"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              required
              className="input placeholder:text-sm"
              value={formData.confirm_password}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="bg-violet-600 text-white text-base w-full flex gap-2 justify-center items-center px-4 py-2 mt-5 rounded-lg disabled:cursor-not-allowed disabled:bg-violet-400 focus:outline-none focus:bg-violet-500"
              disabled={loader}
            >
              {!loader ? (
                <div className="flex items-center justify-center gap-2 ">
                  Change Password
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
