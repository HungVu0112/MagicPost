'use client'

import { TbTruckDelivery } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsDoorOpenFill } from "react-icons/bs";
import { FaPenToSquare } from "react-icons/fa6";
import { TbPackageImport } from "react-icons/tb";
import { TbPackageExport } from "react-icons/tb";
import { TbBoxOff } from "react-icons/tb";
import { ImCheckboxChecked } from "react-icons/im";
import { BsFillPinAngleFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
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
                    <div className="relative xl:block xl:w-[300px] xl:h-[280px] hidden z-0 rounded-md shadow-lg bg-slate-100 p-4 kanit font-bold ">
                        <BsFillPinAngleFill className="absolute -top-4 -left-4 -scale-x-100" size={30} color="#FF5B00"/>
                        <Link href="/admin/tradingPointStaff/createOrder" className="w-full h-[40px] no-underline bg-white rounded flex gap-2 items-center p-4 text-[#FF5B00] hover:scale-105 hover:bg-slate-300 cursor-pointer">
                            <div className="w-[30px]">
                                <FaPenToSquare size={20}/>
                            </div>
                            <p>Tạo đơn hàng</p>
                        </Link>
                        <Link href="/admin/tradingPointStaff/sendOrder" className="w-full h-[40px] no-underline bg-white rounded flex gap-2 items-center p-4 text-[#FF5B00] hover:scale-105 hover:bg-slate-300 cursor-pointer">
                            <div className="w-[30px]">
                                <TbPackageExport size={25}/>
                            </div>
                            <p>Hàng đợi phê duyệt</p>
                        </Link>
                        <Link href="/admin/tradingPointStaff/receiveOrder" className="w-full h-[40px] no-underline bg-white rounded flex gap-2 items-center p-4 text-[#FF5B00] hover:scale-105 hover:bg-slate-300 cursor-pointer">
                            <div className="w-[30px]">
                                <TbPackageImport size={25}/>
                            </div>
                            <p>Hàng nhận vào</p>
                        </Link>
                        <Link href="/admin/tradingPointStaff/shippingOrder" className="w-full h-[40px] no-underline bg-white rounded flex gap-2 items-center p-4 text-[#FF5B00] hover:scale-105 hover:bg-slate-300 cursor-pointer">
                            <div className="w-[30px]">
                                <FaShippingFast size={25}/>
                            </div>
                            <p>Hàng đang giao</p>
                        </Link>
                        <Link href="/admin/tradingPointStaff/shippingSuccess" className="w-full h-[40px] bg-white rounded flex gap-2 items-center p-4 text-[#FF5B00] hover:scale-105 hover:bg-slate-300 cursor-pointer">
                            <div className="w-[30px]">
                                <ImCheckboxChecked size={20}/>
                            </div>
                            <p>Hàng chuyển thành công</p>
                        </Link>
                        <Link href="/admin/tradingPointStaff/shippingFail" className="w-full h-[40px] bg-white rounded flex gap-2 items-center p-4 text-[#FF5B00] hover:scale-105 hover:bg-slate-300 cursor-pointer">
                            <div className="w-[30px]">
                                <TbBoxOff size={25}/>
                            </div>
                            <p>Hàng tồn đọng</p>
                        </Link>
                    </div>
                    {children}
                </div>

            </div>
            {expand && (
                <div className="xl:hidden fixed top-[55px] z-20 right-2 w-[300px] h-[240px] bg-slate-200 rounded-md shadow-lg flex flex-col gap-2 p-4 fade-in">
                    <div onClick={handleSignout} className="flex gap-2 text-[#FF5B00] items-center cursor-pointer hover:opacity-60">
                        <BsDoorOpenFill size={20}/>
                        <p>Đăng xuất</p>
                    </div>
                    <Link href="/admin/tradingPointStaff/createOrder" className="flex gap-2 text-[#FF5B00] items-center cursor-pointer hover:opacity-60">
                        <FaPenToSquare size={20}/>
                        <p>Tạo đơn hàng</p>
                    </Link>
                    <Link href="/admin/tradingPointStaff/sendOrder" className="flex gap-2 text-[#FF5B00] items-center cursor-pointer hover:opacity-60">
                        <TbPackageExport size={20}/>
                        <p>Hàng đợi phê duyệt</p>
                    </Link>
                    <Link href="/admin/tradingPointStaff/receiveOrder" className="flex gap-2 text-[#FF5B00] items-center cursor-pointer hover:opacity-60">
                        <TbPackageImport size={20}/>
                        <p>Hàng nhận vào</p>
                    </Link>
                    <Link href="/admin/tradingPointStaff/shippingOrder" className="flex gap-2 text-[#FF5B00] items-center cursor-pointer hover:opacity-60">
                        <FaShippingFast size={20}/>
                        <p>Hàng đang giao</p>
                    </Link>
                    <Link href="/admin/tradingPointStaff/shippingSuccess" className="flex gap-2 text-[#FF5B00] items-center cursor-pointer hover:opacity-60">
                        <ImCheckboxChecked size={20}/>
                        <p>Hàng chuyển thành công</p>
                    </Link>
                    <Link href="/admin/tradingPointStaff/shippingFail" className="flex gap-2 text-[#FF5B00] items-center cursor-pointer hover:opacity-60">
                        <TbBoxOff size={20}/>
                        <p>Hàng tồn đọng</p>
                    </Link>
                </div>
            )}           
        </>
    )
}