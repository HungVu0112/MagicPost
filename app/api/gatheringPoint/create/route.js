import { connectToDB } from "@/utils/database";
import GatheringPoint from "@/models/gatheringPoint";

export const POST = async (req) => {
    const { id, location, importOrder, exportOrder } = await req.json()

    try {
        await connectToDB()

        const checkExist = await GatheringPoint.findOne({ id: id })

        if (!checkExist) {
            const newGatheringPoint = new GatheringPoint({
                id,
                location,
                importOrder,
                exportOrder,
            })
    
            await newGatheringPoint.save()
    
            return new Response(JSON.stringify(newGatheringPoint), { status: 201 })
        } else {
            return new Response("", { status: 404 })
        }
    } catch (error) {
        console.log(error)
        return new Response(error ,{ status: 501 })
    }
}