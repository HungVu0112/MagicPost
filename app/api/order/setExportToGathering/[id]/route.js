import { connectToDB } from "@/utils/database";
import Order from "@/models/order";
import GatheringPoint from "@/models/gatheringPoint";
import TradingPoint from "@/models/tradingPoint";

export const GET = async (req, { params }) => {
    const { id } = params

    try {
        await connectToDB()

        const order = await Order.findOne({ orderID: id })

        order.state = "Chuyển đến bên tập kết 1"

        await order.save()

        const tradingPoint = await TradingPoint.findOne({ id: order.sender.district })

        tradingPoint.exportOrder.push(order.orderID)

        tradingPoint.importOrder = tradingPoint.importOrder.filter(i_order => {
            return i_order !== order.orderID
        })

        await tradingPoint.save()
        
        const gatheringPoint = await GatheringPoint.findOne({ id: order.sender.city })

        gatheringPoint.importOrder.push(order.orderID)

        await gatheringPoint.save()
        
        return new Response(JSON.stringify(order), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response(error ,{ status: 501 })
    }
}