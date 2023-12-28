import { connectToDB } from "@/utils/database";
import TradingPoint from "@/models/tradingPoint";

export const GET = async (req, { params }) => {
    const { id } = params

    try {
        await connectToDB()

        const tradingPoint = await TradingPoint.findOne({ id: id })

        if (tradingPoint) {
            return new Response(JSON.stringify(tradingPoint.importOrder), { status: 201 })
        } else {
            return new Response("", { status: 404 })
        }
    } catch (error) {
        console.log(error)
        return new Response(error ,{ status: 501 })
    }
}