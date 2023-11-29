'use client'

import { SiMinutemailer } from "react-icons/si";
import { FaPhone } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import { FaSignsPost } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { validateSignup } from "@/script/validation";
import { AiOutlineLoading } from "react-icons/ai";
import Toast from "@/components/toast";

export default function Signup () {
    const [isShown, setIsShown] = useState(false)
    const [loading, setLoading] = useState(false)
    const [appear, setAppear] = useState(false)
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            name: '',
            phoneNumber: '',
            address: '',
            zipcode: '',
            password: '',
        },
        validate: validateSignup,
        onSubmit: values => {
            try {
                setLoading(true)

                setTimeout(async () => {
                    const res = await fetch('/api/user/signup', {
                        method: 'POST',
                        body: JSON.stringify(values)
                    })

                    setLoading(false)
                    
                    if (res.status === 201) {
                        router.push('/authen/login')
                    } else if (res.status === 404) {
                        setAppear(true)
                        setTimeout(() => {
                            setAppear(false)
                        }, 5000)
                    }
                }, 2000)
            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <>
            <div className='flex h-[100vh]'>
                <div className='xl:w-[30%] lg:w-[50%] w-[100%] h-full p-6'>
                    <p className='mt-4 text-5xl font-bold kanit text-center text-[#FF5B00]'>ĐĂNG KÝ</p>
                    
                    <form onSubmit={formik.handleSubmit} className='mt-6'>
                        <div className='flex items-center text-[#A9A9A9] h-[62px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded mb-2 shadow-md p-4 gap-2 cursor-pointer'>
                            <FaUser size={20} />
                            <input {...formik.getFieldProps('name')} name="name" type="text" className='w-full text-[18px] focus:outline-none focus:placeholder:text-[#FF5B00]' placeholder='Họ và tên' autoComplete='off'/>
                        </div>
                        {formik.touched.name && formik.errors.name && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mb-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.name}
                            </div>
                        }

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
                        
                        <div className='flex items-center text-[#A9A9A9] h-[62px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded mb-2 shadow-md p-4 gap-2 cursor-pointer'>
                            <FaAddressCard size={20} />
                            <input {...formik.getFieldProps('address')} name="address" type="text" className='w-full text-[18px] focus:outline-none focus:placeholder:text-[#FF5B00]' placeholder='Địa chỉ' autoComplete='off'/>
                        </div>
                        {formik.touched.address && formik.errors.address && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mb-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.address}
                            </div>
                        }

                        <div className='flex items-center text-[#A9A9A9] h-[62px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded mb-2 shadow-md p-4 gap-2 cursor-pointer'>
                            <FaSignsPost size={20} />
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
                                {...formik.getFieldProps('zipcode')} 
                                name="zipcode" 
                                className='w-full text-[18px] focus:outline-none focus:placeholder:text-[#FF5B00]' 
                                placeholder='Mã bưu chính' 
                                autoComplete='off'
                            />
                        </div>
                        {formik.touched.zipcode && formik.errors.zipcode && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mb-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.zipcode}
                            </div>
                        }

                        <div className='flex justify-between items-center text-[#A9A9A9] h-[62px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded mb-2 shadow-md p-3 cursor-pointer gap-2'>
                            <div className="flex justify-center gap-1 items-center w-full">
                                <IoMdLock size={30} />
                                <input {...formik.getFieldProps('password')} name="password" type={isShown ? 'text' : 'password'} className='w-full text-[18px] focus:outline-none focus:placeholder:text-[#FF5B00]' placeholder='Mật khẩu' autoComplete='off'/>
                            </div>
                            {isShown ? <FaEyeSlash size={25} onClick={() => setIsShown(!isShown)} /> : <FaEye size={25} onClick={() => setIsShown(!isShown)}/>}
                        </div>
                        {formik.touched.password && formik.errors.password && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mb-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.password}
                            </div>
                        }

                        <button type="submit" className='mt-6 w-full bg-[#FF5B00] text-white h-[60px] flex items-center justify-center rounded-md kanit text-[20px] hover:opacity-80'>
                            {loading ? <AiOutlineLoading size={20} color="#fff" className="animate-spin"/> : "Đăng ký"}
                        </button>
                    </form>

                    <p className='mt-4 font-bold text-[#A9A9A9] text-center'>Bạn đã có tài khoản ? <Link href='/authen/login' className='text-[#FF5B00] underline underline-offset-2'>Đăng nhập</Link></p>
                    
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
            {appear && <Toast type="warning" message="Số điện thoại đã tồn tại" setAppear={setAppear}/>}
        </>
    )
}