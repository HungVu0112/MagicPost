import { connectToDB } from "@/utils/database";
import GatheringPoint from "@/models/gatheringPoint";

export const GET = async (req, { params }) => {
    const { id } = params

    try {
        await connectToDB()

        const gatheringPoint = await GatheringPoint.findOne({ id: id })

        if (gatheringPoint) {
            return new Response(JSON.stringify(gatheringPoint), { status: 201 })
        } else {
            return new Response("", { status: 404 })
        }
    } catch (error) {
        console.log(error)
        return new Response(error ,{ status: 501 })
    }
}