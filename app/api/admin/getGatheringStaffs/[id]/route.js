import { connectToDB } from "@/utils/database";
import Admin from "@/models/admin";

export const GET = async (req, { params }) => {
    const { id } = params

    try {
        await connectToDB()

        const checkExist = await Admin.find({ role: "Nhân viên tập kết", location: id })

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