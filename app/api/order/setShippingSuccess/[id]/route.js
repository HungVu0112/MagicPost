import { connectToDB } from "@/utils/database";
import Order from "@/models/order";

export const GET = async (req, { params }) => {
    const { id } = params

    try {
        await connectToDB()

        const order = await Order.findOne({ orderID: id })

        order.state = "Giao thành công"

        await order.save()

        return new Response(JSON.stringify(order), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response(error ,{ status: 501 })
    }
}