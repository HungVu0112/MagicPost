import { connectToDB } from "@/utils/database";
import Order from "@/models/order";

export const GET = async (req, { params }) => {
    const { id } = params

    try {
        await connectToDB()

        const order = await Order.findOne({ orderID: id })

        if (order) {
            return new Response(JSON.stringify(order), { status: 201 })
        } else {
            return new Response("", { status: 401 })
        }
    } catch (error) {
        console.log(error)
        return new Response(error ,{ status: 501 })
    }
}