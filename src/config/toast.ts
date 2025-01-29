import { ToastOptions } from "react-toastify";

const toastConfig: ToastOptions = {
  position: "top-right", // 이 부분의 타입을 ToastPosition으로 지정
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: true,
  theme: "colored",
};

export default toastConfig;
