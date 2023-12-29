'use client'


import { useState, useEffect } from "react";

export default function GatheringPoint () {
    const [gatheringPoint, setGatheringPoint] = useState(null)
    const [manager, setManager] = useState({})
    const [tradingPoint, setTradingPoint] = useState(null)
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState("Tất cả")
    const [point, setPoint] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/tradingPoint/getAll/${gatheringPoint.id}`, {
                method: 'GET'
            })
            const data = await res.json()
            setTradingPoint(data)
        }
        gatheringPoint && fetchData()
    }, [gatheringPoint])

    useEffect(() => {
        const fetchDistricts = async () => {
            const res = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/district?" +  new URLSearchParams({
                province_id: gatheringPoint.id,
            }), {
                method: "GET",
                headers: {
                    token: process.env.NEXT_PUBLIC_TOKEN,
                }
            })
            const data = await res.json()
            setDistricts(data.data)
        }
        gatheringPoint && fetchDistricts()
    }, [gatheringPoint])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/admin/getGatheringManager/${gatheringPoint.id}`, {
                method: 'GET'
            })
            const data = await res.json()
            setManager(data)
        }   
        gatheringPoint && fetchData()
    }, [gatheringPoint])

    useEffect(() => {
        const setData = () => {
            const index = tradingPoint.findIndex((point) => point.id === district)
            setPoint(tradingPoint[index])
        }
        district && tradingPoint && setData()
    }, [district, tradingPoint])

    useEffect(() => {
        setGatheringPoint(JSON.parse(sessionStorage.getItem("gatheringPoint")))
    }, [])

    console.log(manager)

    return (
        <div className="w-[70%] shadow-lg p-10">
            <div className="flex gap-2 text-[#ff5b00] text-xl kanit">
                <h1 className="font-bold">Điểm tập kết : </h1>
                <h1>{gatheringPoint?.location}</h1>
            </div>
            <div className="flex gap-2 text-md mt-4 text-[#a9a9a9]">
                <p className="font-bold">Trưởng điểm tập kết : </p>
                <p>{manager?.name}</p>
            </div>
            <div className="flex gap-2 text-md text-[#a9a9a9]">
                <p className="font-bold">Số điện thoại : </p>
                <p>{manager?.phoneNumber}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
                <h1 className="font-bold text-md kanit text-[#ff5b00]">Các điểm giao dịch :</h1>
                <select value={district} name="" id="" className="w-[200px] text-[#A9A9A9] kanit border-slate-100 border-2 p-2 rounded-md focus:outline-[#ff5b00] focus:text-[#ff5b00] cursor-pointer" onChange={(e) => setDistrict(e.target.value)}>
                    <option value="Tất cả">Tất cả</option>
                    {districts && districts?.map(district => {
                        return <option value={district.DistrictID} key={district.DistrictID}>{district.DistrictName}</option>
                    })}
                </select>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-6">
                {district === "Tất cả" && tradingPoint?.map(point_t => {
                    return <div key={point_t.id} className="p-4 kanit shadow-md">
                        <h1 className="text-2xl text-[#ff5b00]">{point_t.name}</h1>
                        <div className="flex gap-2 text-sm mt-4 text-[#a9a9a9]">
                            <p>Trưởng điểm giao dịch : </p> 
                            <p>{point_t.managerName}</p>
                        </div>
                        <div className="flex gap-2 text-sm text-[#a9a9a9]">
                            <p>Số điện thoại : </p> 
                            <p>{point_t.managerPhoneNumber}</p>
                        </div>
                        <div className="flex gap-2 text-sm mt-4 text-[#a9a9a9]">
                            <p>Số hàng đến : </p> 
                            <p>{point_t.importOrder}</p>
                        </div>
                        <div className="flex gap-2 text-sm text-[#a9a9a9]">
                            <p>Số hàng đi : </p>
                            <p>{point_t.exportOrder}</p>
                        </div>
                    </div>
                })}
                {district !== "Tất cả" && point && <div className="p-4 kanit shadow-md">
                        <h1 className="text-2xl text-[#ff5b00]">{point.name}</h1>
                        <div className="flex gap-2 text-sm mt-4 text-[#a9a9a9]">
                            <p>Trưởng điểm giao dịch : </p> 
                            <p>{point.managerName}</p>
                        </div>
                        <div className="flex gap-2 text-sm text-[#a9a9a9]">
                            <p>Số điện thoại : </p> 
                            <p>{point.managerPhoneNumber}</p>
                        </div>
                        <div className="flex gap-2 text-sm mt-4 text-[#a9a9a9]">
                            <p>Số hàng đến : </p> 
                            <p>{point.importOrder}</p>
                        </div>
                        <div className="flex gap-2 text-sm text-[#a9a9a9]">
                            <p>Số hàng đi : </p>
                            <p>{point.exportOrder}</p>
                        </div>
                    </div>}
            </div>
        </div>
    )
}