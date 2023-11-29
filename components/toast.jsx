import { IoIosCloseCircle } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

const Toast = ({ type, message, setAppear }) => {
  return (
    <div className={`flex items-center justify-between absolute top-4 right-4 p-4 w-[400px] h-[80px] rounded-lg shadow fade-in ${type}`}>
        <div className="flex gap-2 items-center">
            {type === 'warning' && <IoWarning size={30} />}
            {type === 'success' && <FaCheckCircle size={30} />}
            {message}
        </div>
        <IoIosCloseCircle size={40} className="cursor-pointer" onClick={() => setAppear(false)}/>
    </div>
  )
}

export default Toast