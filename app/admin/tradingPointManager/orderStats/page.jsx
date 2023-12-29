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
            labels: ["Hàng nhận", "Hàng gửi"],
            datasets: [{
                label: "Thống kê hàng gửi, hàng nhận",
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
            const res_1 = await fetch(`/api/tradingPoint/getImportOrder/${account.location}`, {
                method: 'GET',
            })

            const importOrder = await res_1.json()
            
            const res_2 = await fetch(`/api/tradingPoint/getExportOrder/${account.location}`, {
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
        <div className="xl:w-[70%] w-[95%] mr-auto ml-auto shadow-lg p-10 kanit text-[#FF5B00]">
            <h1 className="font-bold text-center text-xl">BẢNG THỐNG KÊ HÀNG GỬI VÀ HÀNG NHẬN TẠI ĐIỂM GIAO DỊCH</h1>
            <div className="flex xl:flex-row flex-col xl:justify-between">
                <div className="xl:w-[60%] xl:h-[500px] w-[100%]">
                    {chartData && <BarChart chartData={chartData} />}
                </div>
                <div className="xl:flex xl:flex-col grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-2 justify-center">
                    <div className="xl:w-[350px] h-[200px] shadow-md p-4">
                        <div className="flex gap-2">
                            <h1 className="font-bold">Số hàng nhận : </h1> 
                            <p>{amount?.importOrder?.length}</p>
                        </div>
                        <div className="mt-2 flex flex-col overflow-scroll overflow-x-hidden h-[120px] scroll_custom">
                            {amount?.importOrder && amount?.importOrder?.ids?.map(id => {
                                return <p key={id}>{id}</p>
                            })}
                        </div>
                    </div>
                    <div className="xl:w-[350px] h-[200px] shadow-md p-4">
                        <div className="flex gap-2">
                            <h1 className="font-bold">Số hàng gửi : </h1> 
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