'use client'

import { useState, useEffect } from "react"
import { BsFillPeopleFill } from "react-icons/bs";
import Staff from "@/components/staff";

export default function AccountManage () {
    const [account, setAccount] = useState(null)
    const [staffs, setStaffs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/admin/getGatheringStaffs/${account.location}`, {
                method: 'GET',
            })
            if (res.status === 201) {
                const data = await res.json()
                setStaffs(data)
            } else {
                alert("Cant find !")
            }
        }
        account && fetchData()
    }, [account])

    useEffect(() => {
        setAccount(JSON.parse(sessionStorage.getItem("adminAccount")))
    }, [])

    return (
        <div className="xl:w-[70%] w-[95%] mr-auto ml-auto shadow-lg p-10">
            <div className="flex gap-2 text-[#FF5B00]">
                <BsFillPeopleFill size={30} /> 
                <h1 className="font-bold kanit text-2xl">Danh sách nhân viên</h1>
            </div>
            <div className="w-[100%] grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-2 mt-6">
                {staffs && staffs?.map(staff => {
                    return <Staff key={staff.name} staff={staff} />
                })}
            </div>
        </div>
    )
}