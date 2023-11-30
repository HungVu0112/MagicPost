'use client'

import { useEffect, useState } from "react"

export default function Dashboard () {
    const [user, setUser] = useState({})

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUser(JSON.parse(sessionStorage.getItem("account")))
        }
    }, [])

    return (
        <div>
            {user?.name}        
        </div>
    )
}