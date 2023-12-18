'use client'

import { useEffect, useState } from "react"

export default function Dashboard () {
    const [data, setData] = useState("Not ok")

    useEffect(() => {
        
    }, [])

    return (
        <div>
            {data}
        </div>
    )
}