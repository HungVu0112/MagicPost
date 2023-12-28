import { connectToDB } from "@/utils/database";
import Order from "@/models/order";
import GatheringPoint from "@/models/gatheringPoint";

export const GET = async (req, { params }) => {
    const { id } = params

    try {
        await connectToDB()

        const order = await Order.findOne({ orderID: id })

        order.state = "Chuyển đến bên tập kết 2"

        await order.save()

        const gatheringPoint_1 = await GatheringPoint.findOne({ id: order.sender.city })

        gatheringPoint_1.exportOrder.push(order.orderID)

        gatheringPoint_1.importOrder = gatheringPoint_1.importOrder.filter(i_order => {
            return i_order !== order.orderID
        })

        await gatheringPoint_1.save()

        const gatheringPoint_2 = await GatheringPoint.findOne({ id: order.receiver.city })

        gatheringPoint_2.importOrder.push(order.orderID)

        await gatheringPoint_2.save()

        return new Response(JSON.stringify(order), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response(error ,{ status: 501 })
    }
}