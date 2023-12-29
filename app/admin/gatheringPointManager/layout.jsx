'use client'

import { TbTruckDelivery } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsDoorOpenFill } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaChartBar } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { BsFillPinAngleFill } from "react-icons/bs";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Layout ({ children }) {
    const [account, setAccount] = useState({})
    const [expand, setExpand] = useState(false)
    const router = useRouter()

    const handleSignout = () => {
        sessionStorage.removeItem("adminAccount")
        router.replace('/admin/login')
    }

    useEffect(() => {
        setAccount(JSON.parse(sessionStorage.getItem("adminAccount")))
    }, [])

    return (
        <>
            <div className="w-full">
                <div className="fixed top-0 left-0 z-10 w-full h-[70px] bg-orange-600 p-6 flex justify-between items-center">
                    <div className="flex gap-6 items-center">
                        <TbTruckDelivery className="ml-2" size={40} color="#fff" />
                        <p className="text-white text-lg font-bold kanit">{account?.name} &nbsp; - &nbsp; {account?.role}</p>
                    </div>
                    <GiHamburgerMenu size={30} color="#fff" className="xl:hidden cursor-pointer hover:opacity-80" onClick={() => {setExpand(!expand)}}/>
                    <h1 onClick={handleSignout} className="xl:block hidden font-bold text-white hover:opacity-50 cursor-pointer">ĐĂNG XUẤT</h1>
                </div>

                <div className="flex p-8 gap-20 mt-[70px]">
                    <div className="relative xl:block xl:w-[300px] xl:h-[150px] hidden z-0 rounded-md shadow-lg bg-slate-100 p-4 kanit font-bold ">
                        <BsFillPinAngleFill className="absolute -top-4 -left-4 -scale-x-100" size={30} color="#FF5B00"/>
                        <Link href="/admin/gatheringPointManager/accountManage" className="w-full h-[40px] no-underline bg-white rounded flex gap-2 items-center p-4 text-[#FF5B00] hover:scale-105 hover:bg-slate-300 cursor-pointer">
                            <div className="w-[30px]">
                                <BsFillPeopleFill size={25}/>
                            </div>
                            <p>Quản lý tài khoản</p>
                        </Link>
                        <Link href="/admin/gatheringPointManager/addAccount" className="w-full h-[40px] no-underline bg-white rounded flex gap-2 items-center p-4 text-[#FF5B00] hover:scale-105 hover:bg-slate-300 cursor-pointer">
                            <div className="w-[30px]">
                                <RiUserSettingsFill size={25}/>
                            </div>
                            <p>Cấp tài khoản</p>
                        </Link>
                        <Link href="/admin/gatheringPointManager/orderStats" className="w-full h-[40px] no-underline bg-white rounded flex gap-2 items-center p-4 text-[#FF5B00] hover:scale-105 hover:bg-slate-300 cursor-pointer">
                            <div className="w-[30px]">
                                <FaChartBar size={25}/>
                            </div>
                            <p>Thống kê hàng</p>
                        </Link>
                    </div>
                    {children}
                </div>

            </div>
            {expand && (
                <div className="xl:hidden fixed top-[55px] z-20 right-2 w-[300px] bg-slate-200 rounded-md shadow-lg flex flex-col gap-2 p-4 fade-in">
                    <div onClick={handleSignout} className="flex gap-2 text-[#FF5B00] items-center cursor-pointer hover:opacity-60">
                        <BsDoorOpenFill size={20}/>
                        <p>Đăng xuất</p>
                    </div>
                    <Link href="/admin/gatheringPointManager/accountManage" className="flex gap-2 text-[#FF5B00] items-center cursor-pointer hover:opacity-60">
                        <BsFillPeopleFill size={20}/>
                        <p>Quản lý tài khoản</p>
                    </Link>
                    <Link href="/admin/gatheringPointManager/addAccount" className="flex gap-2 text-[#FF5B00] items-center cursor-pointer hover:opacity-60">
                        <RiUserSettingsFill size={20}/>
                        <p>Cấp tài khoản</p>
                    </Link>
                    <Link href="/admin/gatheringPointManager/orderStats" className="flex gap-2 text-[#FF5B00] items-center cursor-pointer hover:opacity-60">
                        <FaChartBar size={20}/>
                        <p>Thống kê hàng</p>
                    </Link>
                </div>
            )}           
        </>
    )
}