import { connectToDB } from "@/utils/database";
import Order from "@/models/order";
import TradingPoint from "@/models/tradingPoint";

export const GET = async (req, { params }) => {
    const { id } = params

    try {
        await connectToDB()

        const order = await Order.findOne({ orderID: id })

        order.state = "Đang giao"

        await order.save()

        const tradingPoint = await TradingPoint.findOne({ id: order.receiver.district })

        tradingPoint.exportOrder.push(order.orderID)

        tradingPoint.importOrder = tradingPoint.importOrder.filter(i_order => {
            return i_order !== order.orderID
        })

        await tradingPoint.save()

        return new Response(JSON.stringify(order), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response(error ,{ status: 501 })
    }
}