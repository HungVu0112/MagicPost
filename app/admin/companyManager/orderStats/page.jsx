'use client'

import { useState, useEffect } from "react"
import BarChart from "@/components/barchart"
import { defaults } from "chart.js"

defaults.maintainAspectRatio = false
defaults.responsive = true

export default function OrderStats() {
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [gatheringPoint, setGatheringPoint] = useState(null)
    const [tradingPoint, setTradingPoint] = useState(null)
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        gatheringPoint && tradingPoint && setChartData({
            labels: ["Hàng nhận", "Hàng gửi"],
            datasets: [{
                label: "Điểm tập kết",
                data: [gatheringPoint.importOrder.length, gatheringPoint.exportOrder.length],
                backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                ],
                borderRadius: 5,
                minBarLength: 5
            },{
                label: "Điểm giao dịch",
                data: [tradingPoint.importOrder.length, tradingPoint.exportOrder.length],
                backgroundColor: [
                    "rgba(250, 192, 19, 0.8)",
                ],
                borderRadius: 5,
                minBarLength: 5
            }],
        })
    }, [gatheringPoint, tradingPoint])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/gatheringPoint/getOne/${province}`, {
                method: 'GET'
            })
            const data = await res.json()
            setGatheringPoint(data)
        }
        province && fetchData()
    }, [province])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/tradingPoint/getOne/${district}`, {
                method: 'GET'
            })
            const data = await res.json()
            setTradingPoint(data)
        }
        district && fetchData()
    }, [district])

    useEffect(() => {
        const fetchProvinces = async () => {
            const res = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province", {
                method: "GET",
                headers: {
                    token: process.env.NEXT_PUBLIC_TOKEN,
                }
            })
            const data = await res.json()
            setProvinces(data.data)
        }
        fetchProvinces()
    }, [])

    useEffect(() => {
        const fetchDistricts = async () => {
            const res = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/district?" +  new URLSearchParams({
                province_id: province,
            }), {
                method: "GET",
                headers: {
                    token: process.env.NEXT_PUBLIC_TOKEN,
                }
            })
            const data = await res.json()
            setDistricts(data.data)
        }
        province && fetchDistricts()
    }, [province])

    return (
        <div className="w-[70%] shadow-lg p-10">
            <div className="flex items-center gap-6">
                <select value={province} name="" id="" className="w-[200px] text-[#A9A9A9] kanit border-slate-100 border-2 p-2 rounded-md focus:outline-[#ff5b00] focus:text-[#ff5b00] cursor-pointer" onChange={(e) => setProvince(e.target.value)}>
                    <option value="">Tỉnh / Thành phố</option>
                    {provinces && provinces?.map(province => {
                        return <option value={province.ProvinceID} key={province.ProvinceID}>{province.ProvinceName}</option>
                    })}
                </select>
                <select value={district} name="" id="" className="w-[200px] text-[#A9A9A9] kanit border-slate-100 border-2 p-2 rounded-md focus:outline-[#ff5b00] focus:text-[#ff5b00] cursor-pointer" onChange={(e) => setDistrict(e.target.value)}>
                    <option value="">Quận / Huyện</option>
                    {districts && districts?.map(district => {
                        return <option value={district.DistrictID} key={district.DistrictID}>{district.DistrictName}</option>
                    })}
                </select>
            </div>
            <div className="flex justify-between mt-6">
                <div className="w-[600px] h-[500px]">
                    {chartData && <BarChart chartData={chartData} />}
                </div>
                {tradingPoint && <div className="flex flex-col justify-center kanit">
                    <div className="w-[350px] h-[200px] shadow-md p-4">
                        <div className="flex gap-2 text-[#ff5b00]">
                            <h1 className="font-bold">Số hàng nhận : </h1> 
                            <p>{tradingPoint?.importOrder?.length}</p>
                        </div>
                        <div className="text-[#a9a9a9] mt-2 flex flex-col overflow-scroll overflow-x-hidden h-[120px] scroll_custom">
                            {tradingPoint?.importOrder && tradingPoint?.importOrder?.map(id => {
                                return <p key={id}>{id}</p>
                            })}
                        </div>
                    </div>
                    <div className="w-[350px] h-[200px] shadow-md p-4">
                        <div className="flex gap-2 text-[#ff5b00]">
                            <h1 className="font-bold">Số hàng gửi : </h1> 
                            <p>{tradingPoint?.exportOrder?.length}</p>
                        </div>
                        <div className="text-[#a9a9a9] mt-2 flex flex-col overflow-scroll overflow-x-hidden h-[120px] scroll_custom">
                            {tradingPoint?.exportOrder && tradingPoint?.exportOrder?.map(id => {
                                return <p key={id}>{id}</p>
                            })}
                        </div>
                    </div>
                </div>} 
            </div>
        </div>
    )
}