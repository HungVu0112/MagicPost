import { useRouter } from "next/navigation"

export default function Dashboard () {
    const router = useRouter()
    return (
        <div>
            {router.query.name}
        </div>
    )
}