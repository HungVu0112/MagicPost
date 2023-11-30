import { connectToDB } from "@/utils/database";
import TradingPoint from "@/models/tradingPoint";

export const POST = async (req) => {
    const { parent_id, location, importOrder, exportOrder, staff } = await req.json()

    try {
        await connectToDB()

        const checkExist = await TradingPoint.findOne({ location: location, parent_id: parent_id })

        if (!checkExist) {
            const newTradingPoint = new TradingPoint({
                parent_id,
                location,
                importOrder,
                exportOrder,
                staff,
            })
    
            await newTradingPoint.save()
    
            return new Response(JSON.stringify(newTradingPoint), { status: 201 })
        } else {
            return new Response("", { status: 404 })
        }
    } catch (error) {
        console.log(error)
        return new Response(error ,{ status: 501 })
    }
}