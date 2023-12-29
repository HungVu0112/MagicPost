'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PointManage () {
    const [provinces, setProvinces] = useState([])
    const [province, setProvince] = useState("Tất cả")
    const [points, setPoints] = useState([])
    const [point, setPoint] = useState({})
    const router = useRouter()

    const handleClick = (point) => {
        sessionStorage.setItem("gatheringPoint", JSON.stringify(point))
        router.push(`/admin/companyManager/pointManage/gatheringPoint/${point.id}`)
    }
    
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
        const fetchData = async () => {
            const res = await fetch("/api/gatheringPoint/getAll", {
                method: 'GET'
            })

            const data = await res.json()
            setPoints(data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const setData = () => {
            const index = points.findIndex((point) => point.id === province)
            setPoint(points[index])
        }
        points && setData()
    }, [province])

    return (
        <div className="xl:w-[70%] w-[95%] mr-auto ml-auto shadow-lg p-10">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl kanit text-[#ff5b00]">Các điểm tập kết :</h1>
                <select value={province} name="" id="" className="w-[200px] text-[#A9A9A9] kanit border-slate-100 border-2 p-2 rounded-md focus:outline-[#ff5b00] focus:text-[#ff5b00] cursor-pointer" onChange={(e) => setProvince(e.target.value)}>
                    <option value="Tất cả">Tất cả</option>
                    {provinces && provinces?.map(province => {
                        return <option value={province.ProvinceID} key={province.ProvinceID}>{province.ProvinceName}</option>
                    })}
                </select>
            </div>
            <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-2 mt-6">
                {province === "Tất cả" && points?.map(point_t => {
                    return <div key={point_t.id} className="p-4 kanit shadow-md">
                        <h1 className="text-2xl text-[#ff5b00]">{point_t.location}</h1>
                        <div className="flex gap-2 text-sm mt-4 text-[#a9a9a9]">
                            <p>Số hàng đến : </p> 
                            <p>{point_t.importOrder.length}</p>
                        </div>
                        <div className="flex gap-2 text-sm text-[#a9a9a9]">
                            <p>Số hàng đi : </p>
                            <p>{point_t.exportOrder.length}</p>
                        </div>
                        <p onClick={() => handleClick(point_t)} className="cursor-pointer mt-3 text-center block text-md text-slate-600 hover:underline">Xem chi tiết</p>
                    </div>
                })}
                {province !== "Tất cả" && point && <div className="p-4 kanit shadow-md">
                        <h1 className="text-2xl text-[#ff5b00]">{point.location}</h1>
                        <div className="flex gap-2 text-sm mt-4 text-[#a9a9a9]">
                            <p>Số hàng đến : </p> 
                            <p>{point.importOrder.length}</p>
                        </div>
                        <div className="flex gap-2 text-sm text-[#a9a9a9]">
                            <p>Số hàng đi : </p>
                            <p>{point.exportOrder.length}</p>
                        </div>
                        <p onClick={() => handleClick(point)} className="cursor-pointer mt-3 text-center text-md text-slate-600 hover:underline">Xem chi tiết</p>
                    </div>}
            </div>
        </div>
    )
}