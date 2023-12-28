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
        <div className="w-[70%] shadow-lg p-10">
            <div className="flex gap-2 text-[#FF5B00]">
                <BsFillPeopleFill size={30} /> 
                <h1 className="font-bold kanit text-2xl">Danh sách nhân viên</h1>
            </div>
            <div className="w-[100%] flex gap-2 flex-wrap mt-6">
                {staffs && staffs?.map(staff => {
                    return <Staff key={staff.name} staff={staff} />
                })}
            </div>
        </div>
    )
}