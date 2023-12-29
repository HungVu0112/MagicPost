'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import Order from "@/components/order"
import { ImCheckboxChecked } from "react-icons/im";

export default function SendOrder() {
    const [account, setAccount] = useState(null)
    const [orders, setOrders] = useState([])
    
    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch(`/api/order/getShippingSuccessOrder/${account.location}`, {
                method: 'GET'
            })

            const data = await res.json()
            setOrders(data)
        }
        account && fetchOrders()
    }, [account])

    useEffect(() => {
        setAccount(JSON.parse(sessionStorage.getItem("adminAccount")))
    }, [])

    return (
        <div className="xl:w-[70%] w-[95%] mr-auto ml-auto shadow-lg p-10 kanit">
            <div className="flex gap-2 text-[#FF5B00]">
                <ImCheckboxChecked size={30} />
                <h1 className="font-bold kanit text-2xl">Đơn giao thành công</h1>
            </div>
            <div className="mt-6">
                {orders?.length !== 0 ? orders?.map(order => {
                    return <Order key={order.orderID} order={order} />
                }) : (
                    <p className="font-bold text-center text-[#FF5B00] mt-4">Hiện chưa có đơn nào được giao thành công !</p>
                )}
            </div>
        </div>
    )
}