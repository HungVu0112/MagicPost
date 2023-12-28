'use client'

import BarChart from "@/components/barchart"
import { defaults } from "chart.js"
import { useState, useEffect } from "react"

defaults.maintainAspectRatio = false
defaults.responsive = true

export default function OrderStat () {
    const [account, setAccount] = useState(null)
    const [amount, setAmount] = useState(null)
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        amount && setChartData({
            labels: ["Hàng đến", "Hàng đi"],
            datasets: [{
                label: "Thống kê hàng đến, hàng đi",
                data: [amount.importOrder.length, amount.exportOrder.length],
                backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                ],
                borderRadius: 5,
                minBarLength: 5
            }],
            
        })
    }, [amount])

    useEffect(() => {
        const fetchData = async () => {
            const res_1 = await fetch(`/api/gatheringPoint/getImportOrder/${account.location}`, {
                method: 'GET',
            })

            const importOrder = await res_1.json()
            
            const res_2 = await fetch(`/api/gatheringPoint/getExportOrder/${account.location}`, {
                method: 'GET',
            })

            const exportOrder = await res_2.json()

            setAmount({
                importOrder: {
                    length: importOrder.length,
                    ids: importOrder
                },
                exportOrder: {
                    length: exportOrder.length,
                    ids: exportOrder
                }
            })
        }
        account && fetchData()
    }, [account])

    useEffect(() => {
        setAccount(JSON.parse(sessionStorage.getItem("adminAccount")))
    }, [])

    return (
        <div className="w-[70%] shadow-lg p-10 kanit text-[#FF5B00]">
            <h1 className="font-bold text-center text-xl">BẢNG THỐNG KÊ HÀNG ĐẾN VÀ HÀNG ĐI TẠI ĐIỂM TẬP KẾT</h1>
            <div className="flex mt-10 justify-between">
                <div className="w-[600px] h-[500px]">
                    {chartData && <BarChart chartData={chartData} />}
                </div>
                <div className="flex flex-col justify-center">
                    <div className="w-[350px] h-[200px] shadow-md p-4">
                        <div className="flex gap-2">
                            <h1 className="font-bold">Số hàng đến : </h1> 
                            <p>{amount?.importOrder?.length}</p>
                        </div>
                        <div className="mt-2 flex flex-col overflow-scroll overflow-x-hidden h-[120px] scroll_custom">
                            {amount?.importOrder && amount?.importOrder?.ids?.map(id => {
                                return <p key={id}>{id}</p>
                            })}
                        </div>
                    </div>
                    <div className="w-[350px] h-[200px] shadow-md p-4">
                        <div className="flex gap-2">
                            <h1 className="font-bold">Số hàng đi : </h1> 
                            <p>{amount?.exportOrder?.length}</p>
                        </div>
                        <div className="mt-2 flex flex-col overflow-scroll overflow-x-hidden h-[120px] scroll_custom">
                            {amount?.exportOrder && amount?.exportOrder?.ids?.map(id => {
                                return <p key={id}>{id}</p>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}