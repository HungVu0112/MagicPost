'use client'

import { TbBus } from "react-icons/tb";
import { WiStrongWind } from "react-icons/wi";
import { useEffect, useState } from 'react'

export default function authenLayout ({ children }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    
    return (
        <>
            {loading ?  
                <div className="relative flex justify-center items-center h-[100vh] bg-orange-600">
                    <div className="flex items-center bounce">
                        <TbBus size={70} className="-scale-x-100" color="#fff"/>
                        <WiStrongWind size={50} color="#fff" />
                    </div>
                </div> 
                    : 
            children}
        </>
    )
}