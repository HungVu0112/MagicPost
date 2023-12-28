'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import Order from "@/components/order"
import { TbBoxOff } from "react-icons/tb";

export default function SendOrder() {
    const [account, setAccount] = useState(null)
    const [orders, setOrders] = useState([])
    
    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch(`/api/order/getShippingFailOrder/${account.location}`, {
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
        <div className="shadow p-8 min-w-[40%] kanit">
            <div className="flex gap-2 text-[#FF5B00]">
                <TbBoxOff size={30} />
                <h1 className="font-bold kanit text-2xl">Đơn giao thất bại</h1>
            </div>
            <div className="mt-6">
                {orders?.length !== 0 ? orders?.map(order => {
                    return <Order key={order.orderID} order={order} />
                }) : (
                    <p className="font-bold text-center text-[#FF5B00] mt-4">Hiện không có đơn nào giao thất bại !</p>
                )}
            </div>
        </div>
    )
}