'use client'

import { RxDotFilled } from "react-icons/rx";
import { useRouter } from "next/navigation";

export default function Order({ order }) {
    const router = useRouter()

    const handleClick = () => {
        if (order?.state === "Chờ phê duyệt" || order?.state === "Chuyển đến bên giao hàng" 
        ||  order?.state === "Chuyển đến bên tập kết 1" || order?.state === "Chuyển đến bên tập kết 2") {
            sessionStorage.setItem("order", JSON.stringify(order))
            
            if (order?.state === "Chờ phê duyệt") {
                router.push(`/admin/tradingPointStaff/sendOrder/${order.orderID}`)
            } else if (order?.state === "Chuyển đến bên giao hàng") {
                router.push(`/admin/tradingPointStaff/receiveOrder/${order.orderID}`)
            } else if (order?.state === "Chuyển đến bên tập kết 1") {
                router.push(`/admin/gatheringPointStaff/orderFromTradingPoint/${order.orderID}`)
            } else if (order?.state === "Chuyển đến bên tập kết 2") {
                router.push(`/admin/gatheringPointStaff/orderFromGatheringPoint/${order.orderID}`)
            } 
        }
    }

    const handleSuccess = async () => {
        const res = await fetch(`/api/order/setShippingSuccess/${order.orderID}`, {
            method: 'GET'
        })

        if (res.status === 201) {
            router.push('/admin/tradingPointStaff/shippingSuccess')
        }
    }

    const handleFail = async () => {
        const res = await fetch(`/api/order/setShippingFail/${order.orderID}`, {
            method: 'GET'
        })

        if (res.status === 201) {
            router.push('/admin/tradingPointStaff/shippingFail')
        }
    }

    return (
        <div onClick={handleClick} className="flex items-center relative mb-3 flex gap-4 min-h-[180px] p-3 rounded shadow-md hover:border-2 hover:border-[#FF5B00] hover:text-[#FF5B00] cursor-pointer">    
            <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/admin/tradingPointStaff/order/${order.orderID}`}
                width={150}
                height={150}
                alt="QR Code"
            />
            <div>
                <h1 className="font-bold kanit text-lg">{order.orderID}</h1>
                <div className="mt-4">
                    <p>Người gửi : {order.sender.name}</p>
                    <p>Người nhận : {order.receiver.name}</p>
                    <p>Trạng thái : {order.state}</p>
                    <p>Ngày / giờ tạo : {(new Date(order.createdAt)).toString()}</p>
                </div>
            </div>
            {order?.state === "Đang giao" && (
                <div className="ml-4 flex flex-col">
                    <button onClick={handleSuccess} className="w-[200px] h-[60px] bg-green-600 text-white rounded hover:opacity-70">
                        Chuyển thành công
                    </button>
                    <button onClick={handleFail} className="mt-4 w-[200px] h-[60px] bg-red-600 text-white rounded hover:opacity-70">
                        Chuyển thất bại
                    </button>
                </div>
            )}
        </div>
    )
}