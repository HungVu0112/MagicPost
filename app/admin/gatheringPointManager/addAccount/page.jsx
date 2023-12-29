'use client'

import { RiUserSettingsFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaTreeCity } from "react-icons/fa6";
import { MdOutlineLocationCity } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa6";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { createStaffAccValid } from "@/script/validation";
import Toast from "@/components/toast";

export default function AddAccount () { 
    const [provinces, setProvinces] = useState([])
    const [province, setProvince] = useState("")
    const [success, setSuccess] = useState(false)
    const [isShown, setIsShown] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: "",
            phoneNumber: "",
            password: "",
            city: "",
        },
        validate: createStaffAccValid,
        onSubmit: async values => {
            try {
                const res = await fetch("/api/admin/signup", {
                    method: 'POST',
                    body: JSON.stringify({
                        name: values.name,
                        phoneNumber: values.phoneNumber,
                        password: values.password,
                        role: "Nhân viên tập kết",
                        location: province,
                    })
                })
                
                if (res.status === 201) {
                    setSuccess(true)
                } else {
                    alert("Không tạo được")
                }
            } catch (error) {
                console.log(error)
            }
        }
    })

    useEffect(() => {
        const fetchProvinces = async () => {
            const res = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province", {
                method: "GET",
                headers: {
                    token: process.env.NEXT_PUBLIC_TOKEN,
                }
            })
            const data = await res.json()
            setProvinces(data.data)
        }
        fetchProvinces()
    }, [])

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="xl:w-[70%] w-[95%] mr-auto ml-auto shadow-lg p-10">
                <div className="flex gap-2 text-[#FF5B00]">
                    <RiUserSettingsFill size={30} /> 
                    <h1 className="font-bold kanit text-2xl">Tạo tài khoản nhân viên</h1>
                </div>
                <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4">
                    <div>
                        <div className='flex items-center text-[#A9A9A9] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2 cursor-pointer'>
                            <FaUser size={18}/>
                            <input type="text" {...formik.getFieldProps('name')} name="name" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]' placeholder="Họ và tên" />
                        </div>
                        {formik.touched.name && formik.errors.name && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.name}
                            </div>
                        }
                    </div>
                        
                    <div>
                        <div className='flex items-center text-[#A9A9A9] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2 cursor-pointer'>
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
                                {...formik.getFieldProps('phoneNumber')}
                                name="phoneNumber"
                                className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]' 
                                placeholder="Số điện thoại"
                            />
                        </div>
                        {formik.touched.phoneNumber && formik.errors.phoneNumber && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.phoneNumber}
                            </div>
                        }
                    </div>
                        
                    <div>
                        <div className='flex justify-between items-center text-[#A9A9A9] h-[62px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded mb-2 shadow-md p-3 cursor-pointer gap-2'>
                            <div className="flex justify-center gap-1 items-center w-full">
                                <IoMdLock size={30} />
                                <input {...formik.getFieldProps('password')} name="password"  type={isShown ? 'text' : 'password'} className='w-full text-[18px] focus:outline-none focus:placeholder:text-[#FF5B00]' placeholder='Mật khẩu' autoComplete='off'/>
                            </div>
                            {isShown ? <FaEyeSlash size={25} onClick={() => setIsShown(!isShown)} /> : <FaEye size={25} onClick={() => setIsShown(!isShown)}/>}
                        </div>
                        {formik.touched.password && formik.errors.password && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mb-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.password}
                            </div>
                        }
                    </div>
                    <div>
                        <div className='flex items-center text-[#A9A9A9] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2'>
                            <FaTreeCity />
                            <select {...formik.getFieldProps('city')} name="city" id="" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00] cursor-pointer' onChange={(e) => {formik.setFieldValue('city', e.target.value); setProvince(e.target.value)}}>
                                <option value="">Tỉnh / Thành phố</option>
                                {provinces && provinces?.map(province => {
                                    return <option value={province.ProvinceID} key={province.ProvinceID}>{province.ProvinceName}</option>
                                })}
                            </select>
                        </div>
                        {formik.touched.city && formik.errors.city && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.city}
                            </div>
                        }
                    </div>
                </div>
                
                <div className="flex justify-end mt-4">
                    <button type="submit" className="mr-4 w-[80px] h-[40px] rounded bg-[#FF5B00] text-white hover:border-2 hover:border-[#FF5B00] hover:bg-white  hover:text-[#FF5B00]">
                        Tạo
                    </button>
                </div>
            </form>
            {success && <Toast type="success" message="Tạo tài khoản thành công" setAppear={setSuccess} />}
        </>
    )
}