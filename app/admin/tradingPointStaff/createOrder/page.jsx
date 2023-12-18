'use client'

import { SiMinutemailer } from "react-icons/si";
import { FaPhone } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import { FaSignsPost } from "react-icons/fa6";
import { FaTreeCity } from "react-icons/fa6";
import { MdOutlineLocationCity } from "react-icons/md";
import { RiUserReceived2Fill } from "react-icons/ri";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";

export default function CreateOrder() {
    return (
        <form className="relative p-10 shadow-lg w-[60%] text-[#FF5B00] kanit">
            <div>
                <div className="flex gap-2 items-center font-bold">
                    <BsFillSendFill />
                    <h1>Thông tin người gửi</h1>
                </div>
                
                <div className="flex gap-4 mt-4">
                    <div className='flex items-center w-[250px] text-[#A9A9A9] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded mb-2 shadow-md p-4 gap-2 cursor-pointer'>
                        <FaUser size={18}/>
                        <input type="text" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]' placeholder="Họ và tên"/>
                    </div>
                    <div className='flex items-center w-[250px] text-[#A9A9A9] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded mb-2 shadow-md p-4 gap-2 cursor-pointer'>
                        <FaPhone size={18}/>
                        <input 
                            type="text" 
                            onKeyDown={(event) => {
                                const charCode = event.which ? event.which : event.keyCode;
                                if (
                                charCode !== 8 && // Kiểm tra không phải phím Backspace
                                charCode !== 9 && // Kiểm tra không phải phím Tab
                                charCode !== 13 && // Kiểm tra không phải phím Enter
                                (charCode < 48 || charCode > 57) // Kiểm tra không phải các phím số từ 0 đến 9
                                ) {
                                event.preventDefault();
                                return false;
                                }
                                return true;
                            }}
                            className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]' 
                            placeholder="Số điện thoại"
                        />
                    </div>
                    <div className='flex items-center w-[250px] text-[#A9A9A9] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded mb-2 shadow-md p-4 gap-2 cursor-pointer'>
                        <FaSignsPost size={18}/>
                        <input 
                            type="text" 
                            onKeyDown={(event) => {
                                const charCode = event.which ? event.which : event.keyCode;
                                if (
                                charCode !== 8 && // Kiểm tra không phải phím Backspace
                                charCode !== 9 && // Kiểm tra không phải phím Tab
                                charCode !== 13 && // Kiểm tra không phải phím Enter
                                (charCode < 48 || charCode > 57) // Kiểm tra không phải các phím số từ 0 đến 9
                                ) {
                                event.preventDefault();
                                return false;
                                }
                                return true;
                            }}
                            className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]' 
                            placeholder="Mã bưu chính"
                        />
                    </div>    
                </div>
                <div className="flex mt-3 gap-4">
                    <div className='flex items-center text-[#A9A9A9] w-[250px] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2'>
                        <FaTreeCity />
                        <select name="" id="" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00] cursor-pointer'>
                            <option value="">Tỉnh / Thành phố</option>
                        </select>
                    </div>
                    <div className='flex items-center text-[#A9A9A9] w-[250px] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2'>
                        <MdOutlineLocationCity />
                        <select name="" id="" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00] cursor-pointer'>
                            <option value="">Quận / Huyện</option>
                        </select>
                    </div>
                </div>
                <div className="mt-3 flex items-center text-[#A9A9A9] w-full h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2">
                    <FaAddressCard />
                    <input type="text" placeholder="Địa chỉ cụ thể" className="w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]"/>
                </div>
            </div>

            <div className="mt-10">
                <div className="flex gap-2 items-center font-bold">
                    <RiUserReceived2Fill />
                    <h1>Thông tin người nhận</h1>
                </div>
                
                <div className="flex gap-4 mt-4">
                    <div className='flex items-center w-[250px] text-[#A9A9A9] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded mb-2 shadow-md p-4 gap-2 cursor-pointer'>
                        <FaUser size={18}/>
                        <input type="text" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]' placeholder="Họ và tên"/>
                    </div>
                    <div className='flex items-center w-[250px] text-[#A9A9A9] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded mb-2 shadow-md p-4 gap-2 cursor-pointer'>
                        <FaPhone size={18}/>
                        <input 
                            type="text" 
                            onKeyDown={(event) => {
                                const charCode = event.which ? event.which : event.keyCode;
                                if (
                                charCode !== 8 && // Kiểm tra không phải phím Backspace
                                charCode !== 9 && // Kiểm tra không phải phím Tab
                                charCode !== 13 && // Kiểm tra không phải phím Enter
                                (charCode < 48 || charCode > 57) // Kiểm tra không phải các phím số từ 0 đến 9
                                ) {
                                event.preventDefault();
                                return false;
                                }
                                return true;
                            }}
                            className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]' 
                            placeholder="Số điện thoại"
                        />
                    </div>
                    <div className='flex items-center w-[250px] text-[#A9A9A9] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded mb-2 shadow-md p-4 gap-2 cursor-pointer'>
                        <FaSignsPost size={18}/>
                        <input 
                            type="text" 
                            onKeyDown={(event) => {
                                const charCode = event.which ? event.which : event.keyCode;
                                if (
                                charCode !== 8 && // Kiểm tra không phải phím Backspace
                                charCode !== 9 && // Kiểm tra không phải phím Tab
                                charCode !== 13 && // Kiểm tra không phải phím Enter
                                (charCode < 48 || charCode > 57) // Kiểm tra không phải các phím số từ 0 đến 9
                                ) {
                                event.preventDefault();
                                return false;
                                }
                                return true;
                            }}
                            className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]' 
                            placeholder="Mã bưu chính"
                        />
                    </div>    
                </div>
                <div className="flex mt-3 gap-4">
                    <div className='flex items-center text-[#A9A9A9] w-[250px] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2'>
                        <FaTreeCity />
                        <select name="" id="" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00] cursor-pointer'>
                            <option value="">Tỉnh / Thành phố</option>
                        </select>
                    </div>
                    <div className='flex items-center text-[#A9A9A9] w-[250px] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2'>
                        <MdOutlineLocationCity />
                        <select name="" id="" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00] cursor-pointer'>
                            <option value="">Quận / Huyện</option>
                        </select>
                    </div>
                </div>
                <div className="mt-3 flex items-center text-[#A9A9A9] w-full h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2">
                    <FaAddressCard />
                    <input type="text" placeholder="Địa chỉ cụ thể" className="w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]"/>
                </div>
            </div>

            <div className="mt-10">
                <div className="flex gap-2 items-center font-bold">
                    <BsFillBoxSeamFill />
                    <h1>Thông tin hàng hóa</h1>
                </div>
                
                <div className="mt-4 flex gap-3">
                    <div className="text-[#FF5B00] w-[300px] h-[90px] focus-within:border-[#FF5B00] focus-within:border-2 rounded shadow-md p-4">
                        <p className="font-bold">Loại hàng hóa :</p>
                        <div className="flex gap-10 mt-2">
                            <div className="flex items-center gap-2">
                                <input type="radio" id="paper" name="orderType" className="w-[20px] h-[20px] cursor-pointer"/>
                                <label htmlFor="paper" >Giấy tờ</label>  
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="radio" id="other" name="orderType" className="w-[20px] h-[20px] cursor-pointer"/>
                                <label htmlFor="other">Hàng hóa</label>
                            </div>
                        </div>
                    </div>
                    <div className="text-[#FF5B00] w-[270px] h-[90px] focus-within:border-[#FF5B00] focus-within:border-2 rounded shadow-md p-4">
                        <p className="font-bold">Khối lượng :</p>
                        <input type="number" placeholder="Cân nặng" className="mt-2 text-[16px] focus:outline-none"/> kg
                    </div>
                    <div className="text-[#FF5B00] w-[270px] h-[90px] focus-within:border-[#FF5B00] focus-within:border-2 rounded shadow-md p-4">
                        <p className="font-bold">Số lượng :</p>
                        <input type="number" placeholder="Số hàng hóa" className="mt-2 text-[16px] focus:outline-none"/>
                    </div>
                </div>

                <textarea name="" id="" className="text-[#A9A9A9] mt-3 w-full h-[100px] shadow-md rounded p-3 focus:outline-[#FF5B00] focus:text-[#FF5B00]">
                    Ghi chú ...
                </textarea>

                <div className="flex justify-end">
                    <button className="mt-5 mr-3 flex items-center justify-center w-[120px] h-[60px] font-bold text-lg rounded-xl border-2 border-[#FF5B00] hover:text-white hover:bg-[#FF5B00]">
                        Tạo đơn
                    </button>
                </div>
            </div>
        </form>        
    )
}