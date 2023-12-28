import { connectToDB } from "@/utils/database";
import Order from "@/models/order";
import TradingPoint from "@/models/tradingPoint";
import GatheringPoint from "@/models/gatheringPoint";

export const GET = async (req, { params }) => {
    const { id } = params

    try {
        await connectToDB()

        const order = await Order.findOne({ orderID: id })

        order.state = "Chuyển đến bên giao hàng"

        await order.save()

        const gatheringPoint = await GatheringPoint.findOne({ id: order.receiver.city })

        gatheringPoint.exportOrder.push(order.orderID)

        gatheringPoint.importOrder = gatheringPoint.importOrder.filter(i_order => {
            return i_order !== order.orderID
        })

        await gatheringPoint.save()

        const tradingPoint = await TradingPoint.findOne({ id: order.receiver.district })

        tradingPoint.importOrder.push(order.orderID)

        await tradingPoint.save()

        return new Response(JSON.stringify(order), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response(error ,{ status: 501 })
    }
}