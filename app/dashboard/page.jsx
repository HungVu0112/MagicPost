'use client'

import { useEffect, useState } from "react"
import { TbMailFast } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { MdAssignment } from "react-icons/md";
import Toast from "@/components/toast";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { TbBuildingWarehouse } from "react-icons/tb";
import { MdLocalShipping } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

export default function Dashboard () {
    const [account, setAccount] = useState(null)
    const router = useRouter()
    const [orderID, setOrderID] = useState("")
    const [order, setOrder] = useState(null)
    const [appear, setAppear] = useState(false)

    const handleSearch = async () => {
        const res = await fetch(`/api/order/getOrder/${orderID}`, {
            method: 'GET'
        })

        if (res.status === 201) {
            const data = await res.json()
            setOrder(data)
        } else {
            setOrder(null)
            setAppear(true)
        }
    }

    const handleSignOut = () => {
        sessionStorage.removeItem("account")
        router.push('/auth/login')
    }

    useEffect(() => {
        setAccount(JSON.parse(sessionStorage.getItem("account")))
    }, [])

    return (
        <>
            <div className="w-full kanit">
                <div className="flex justify-between items-center fixed z-10 top-0 left-0 w-[100%] h-[80px] bg-slate-200">
                    <div className='flex items-center gap-2 text-[#FF5B00] ml-6'>
                        <TbMailFast size={50} />
                        <h1 className='text-3xl font-bold kanit'>MAGIC POST</h1>
                    </div>
                    <div className="flex gap-2 h-full text-[#ff5b00]">
                        {account ? (
                            <>
                                <div className="h-full font-bold text-xl flex items-center mr-6">
                                    <h1>{account?.name}</h1>
                                </div>
                                <div onClick={handleSignOut} className="w-[120px] hover:text-white hover:bg-slate-400 flex items-center justify-center cursor-pointer">
                                    <h1>ĐĂNG XUẤT</h1>
                                </div>
                            </>
                        ) : (
                            <>
                                <div onClick={() => {router.push('/auth/signup')}} className="w-[120px] hover:bg-slate-400 hover:text-white flex items-center justify-center cursor-pointer">
                                    <h1>ĐĂNG KÝ</h1>
                                </div>
                                <div onClick={() => {router.push('/auth/login')}} className="w-[120px] hover:bg-slate-400 hover:text-white flex items-center justify-center cursor-pointer">
                                    <h1>ĐĂNG NHẬP</h1>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="relative w-full h-[450px] mt-[80px]">
                    <Image 
                        src="/dashboard.jpg"
                        fill
                        className="object-cover"
                        alt="Magic Post"
                    />
                    <div className="bg-[#ff5b00] opacity-25 w-full h-full absolute"></div>
                    <div className="h-full w-full flex items-center absolute p-20">
                        <h1 className="text-6xl text-white">TRA CỨU BƯU GỬI</h1>
                    </div>
                </div>

                <div className="w-full xl:p-24 lg:p-24 md:p-20 flex items-center justify-center bg-slate-100">
                    <div className="w-full shadow-lg bg-white rounded-md p-20 flex flex-col gap-4 justify-center">
                        <div className="ml-4 flex items-center gap-2 text-[#ff5b00]">
                            <MdAssignment size={30} />
                            <p className="font-bold text-xl">Mã bưu gửi</p>
                        </div>
                        <div className="flex justify-between gap-2">
                            <input type="text" value={orderID} onChange={(e) => setOrderID(e.target.value)} className="text-[#a9a9a9] w-[83%] rounded shadow h-[60px] border-2 border-[#a9a9a9] text-lg p-4 focus:outline-[#ff5b00] focus:text-[#ff5b00]" placeholder="Nhập mã bưu gửi" />
                            <button onClick={handleSearch} className="hover:opacity-80 text-lg w-[200px] h-[60px] bg-[#ff5b00] rounded text-white">Tra cứu</button>
                        </div>
                        {order && <div className="w-full mt-6 shadow rounded p-6">
                            <div className={`h-[80px] w-full flex items-center gap-2 ${order?.state === "Chờ phê duyệt" ? "text-[#ff5b00]" : "text-[#a9a9a9]"}`}>
                                <div className="w-[80px]">
                                    <p className="text-3xl ver-line-middle">o</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <MdAssignmentTurnedIn size={25} />
                                    <p className="text-lg">Chờ phê duyệt</p>
                                </div>
                            </div>
                            <div className={`h-[80px] w-full flex items-center gap-2 ${order?.state === "Chuyển đến bên tập kết 1" ? "text-[#ff5b00]" : "text-[#a9a9a9]"}`}>
                                <div className="w-[80px]">
                                    <p className="text-3xl ver-line-middle">o</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <TbBuildingWarehouse size={25} />
                                    <p className="text-lg">Chuyển đến kho tập kết 1</p>
                                </div>
                            </div>
                            <div className={`h-[80px] w-full flex items-center gap-2 ${order?.state === "Chuyển đến bên tập kết 2" ? "text-[#ff5b00]" : "text-[#a9a9a9]"}`}>
                                <div className="w-[80px]">
                                    <p className="text-3xl ver-line-middle">o</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <TbBuildingWarehouse size={25} />
                                    <p className="text-lg">Chuyển đến kho tập kết 2</p>
                                </div>
                            </div>
                            <div className={`h-[80px] w-full flex items-center gap-2 ${order?.state === "Chuyển đến bên giao hàng" ? "text-[#ff5b00]" : "text-[#a9a9a9]"}`}>
                                <div className="w-[80px]">
                                    <p className="text-3xl ver-line-middle">o</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <MdLocalShipping size={25} />
                                    <p className="text-lg">Chuyển đến bên giao hàng</p>
                                </div>
                            </div>
                            <div className={`h-[80px] w-full flex items-center gap-2 ${order?.state === "Đang giao" ? "text-[#ff5b00]" : "text-[#a9a9a9]"}`}>
                                <div className="w-[80px]">
                                    <p className="text-3xl ver-line-middle">o</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <FaShippingFast size={25} />
                                    <p className="text-lg">Đang giao</p>
                                </div>
                            </div>
                            <div className={`h-[80px] w-full flex items-center gap-2 ${order?.state === "Giao thành công" ? "text-[#ff5b00]" : "text-[#a9a9a9]"}`}>
                                <div className="w-[80px]">
                                    <p className="text-3xl ver-line-middle">o</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <FaCheckCircle size={25} />
                                    <p className="text-lg">Giao thành công</p>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            {appear && <Toast type="warning" message="Mã bưu gửi không hợp lệ !" setAppear={setAppear}/>}
        </>
    )
}