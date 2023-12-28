import { connectToDB } from "@/utils/database";
import Order from "@/models/order";

export const GET = async (req, { params }) => {
    const { id } = params

    try {
        await connectToDB()

        const checkExist = await Order.find({ 'sender.city': id, state: 'Chuyển đến bên tập kết 1' })

        if (checkExist) {
            return new Response(JSON.stringify(checkExist), { status: 201 })
        } else {
            return new Response("", { status: 404 })
        }
    } catch (error) {
        console.log(error)
        return new Response(error ,{ status: 501 })
    }
}