import { connectToDB } from "@/utils/database";
import TradingPoint from "@/models/tradingPoint";
import Admin from "@/models/admin";

export const GET = async (req, { params }) => {
    const { id } = params

    try {
        await connectToDB()

        const tradingPoints = await TradingPoint.find({ parent_id: id })

        const new_trading_points = await Promise.all(tradingPoints.map(async tradingPoint => {
            const manager = await Admin.findOne({ role: "Trưởng điểm giao dịch", location: tradingPoint.id })
            if (manager) {
                return {
                    id: tradingPoint.id,
                    name: tradingPoint.location,
                    importOrder: tradingPoint.importOrder.length,
                    exportOrder: tradingPoint.exportOrder.length,
                    managerName: manager.name,
                    managerPhoneNumber: manager.phoneNumber
                }
            } else {
                return {
                    id: tradingPoint.id,
                    name: tradingPoint.location,
                    importOrder: tradingPoint.importOrder.length,
                    exportOrder: tradingPoint.exportOrder.length,
                    managerName: "",
                    managerPhoneNumber: ""
                }
            }
        }))

        return new Response(JSON.stringify(new_trading_points), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response(error, { status: 501 })
    }
}
