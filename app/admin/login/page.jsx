'use client'

import { SiMinutemailer } from "react-icons/si";
import { FaPhone } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { useFormik } from "formik";
import { validateLogin } from "@/script/validation";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import Image from 'next/image'
import Toast from "@/components/toast";
import { GrUserManager } from "react-icons/gr";
import { useState } from 'react'

export default function AdminLogin() {
    const [isShown, setIsShown] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [password, setPassword] = useState("")
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [wrongPass, setWrongPass] = useState(false)
    const [invalidAcc, setInvalidAcc] = useState(false)
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            phoneNumber: '',
            password: '',
        },
        validate: validateLogin,
        onSubmit: values => {
            try {
                setLoading2(true)

                setTimeout(async () => {
                    formik.setSubmitting(false)
                    const res = await fetch('/api/admin/login', {
                        method: 'POST',
                        body: JSON.stringify(values)
                    })

                    setLoading2(false)
                    
                    if (res.status === 201) {
                        const data = await res.json()
                        sessionStorage.setItem("adminAccount", JSON.stringify(data))
                        switch(data.role) {
                            case "Lãnh đạo công ty": 
                                router.push("/admin/companyManager")
                                break
                            case "Trưởng điểm tập kết": 
                                router.push("/admin/gatheringPointManager/accountManage")
                                break
                            case "Trưởng điểm giao dịch":
                                router.push("/admin/tradingPointManager/accountManage")
                                break
                            case "Nhân viên tập kết":
                                router.push("/admin/gatheringPointStaff/orderFromGatheringPoint")
                                break
                            case "Nhân viên giao dịch":
                                router.push("/admin/tradingPointStaff/createOrder")
                                break
                        }
                    } else if (res.status === 404) {
                        setInvalidAcc(true)
                        setTimeout(() => {
                            setInvalidAcc(false)
                        }, 3000)
                    }
                }, 2000)
            } catch (error) {
                console.log(error)
            }
        }
    })

    const handleCLick = () => {
        setLoading1(true)

        setTimeout(() => {
            setLoading1(false)
            if (password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
                setIsValid(true)
            } else {
                setAppear(true)
                setTimeout(() => {
                    setAppear(false)
                }, 2000)
            }
        }, 1000)
    }

    return (
        <>
            {!isValid ? (
                <div className="h-[100vh] flex items-center justify-center">
                    <div className="w-[350px] h-[180px] rounded-md shadow-2xl bg-slate-400 p-4">
                        <h1 className="text-[#27374D] text-center font-bold text-lg kanit">Nhập mật khẩu để chuyển hướng</h1>
                        <input className="w-full h-[40px] rounded p-3 mt-5" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button onClick={handleCLick} className="mt-4 w-full h-[40px] flex items-center justify-center bg-[#27374D] rounded text-white hover:opacity-80">
                            {loading1 ? <AiOutlineLoading size={15} color="#fff" className="animate-spin"/> : "Chuyển hướng"}
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='flex h-[100vh]'>
                <div className='xl:w-[30%] lg:w-[50%] w-[100%] h-full p-6'>
                    <div className='flex items-center justify-center gap-2 text-[#FF5B00] mt-6'>
                        <GrUserManager size={30} />
                        <h1 className='text-3xl font-bold kanit'>ADMIN</h1>
                    </div>

                    <p className='mt-12 text-5xl font-bold kanit text-center text-[#FF5B00]'>ĐĂNG NHẬP</p>
                    
                    <form onSubmit={formik.handleSubmit} className='mt-14'>
                        <div className='flex items-center text-[#A9A9A9] h-[62px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded mb-2 shadow-md p-4 gap-2 cursor-pointer'>
                            <FaPhone size={20} />
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
                                className='w-full text-[18px] focus:outline-none focus:placeholder:text-[#FF5B00]' 
                                placeholder='Số điện thoại' 
                                autoComplete='off'
                            />
                        </div>
                        {formik.touched.phoneNumber && formik.errors.phoneNumber && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mb-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.phoneNumber}
                            </div>
                        }

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

                        <button type='submit' className='mt-6 w-full bg-[#FF5B00] text-white h-[60px] flex items-center justify-center rounded-md kanit text-[20px] hover:opacity-80'>
                            {loading2 ? <AiOutlineLoading size={20} color="#fff" className="animate-spin"/> : "Đăng nhập"}
                        </button>
                    </form>
                </div>
                <div className='xl:w-[70%] lg:w-[50%] w-[0] h-full relative items-center bg-[#FF5B00]'>
                    <div className='absolute xl:right-16 xl:top-24 ml-8 text-[#fff] kanit'>
                        <h1 className='font-bold text-[64px] '>MAGIC POST</h1>
                        <div className='flex justify-center items-center'>
                            <p>Nơi bạn có thể yên tâm gửi gắm !</p>
                            <SiMinutemailer className="ml-3" size={30} />
                        </div>
                    </div>
                    <Image 
                        src='/email-marketing.gif'
                        alt='Email Marketing'
                        width={600}
                        height={600}
                        className='absolute xl:top-2 xl:left-8 top-16 left-4'
                    />
                    <Image 
                        src='/singing-contract.gif'
                        alt='Check Box'
                        width={400}
                        height={400}
                        className='absolute xl:block hidden bottom-8 right-8'
                    />
                </div>
            </div>
                </div>
            )}
            {wrongPass && <Toast type="warning" message="Mật khẩu không hợp lệ" setAppear={setWrongPass}/>}
            {invalidAcc && <Toast type="warning" message="Số điện thoại hoặc mật khẩu không hợp lệ" setAppear={setInvalidAcc}/>}
        </>
    )
}