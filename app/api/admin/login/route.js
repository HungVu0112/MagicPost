import { connectToDB } from "@/utils/database";
import Admin from "@/models/admin";
const bcrypt = require("bcrypt")

export const POST = async (req) => {
    const { phoneNumber, password } = await req.json()

    try {
        await connectToDB()

        const admin = await Admin.findOne({ phoneNumber: phoneNumber })

        if (admin) {
            const checkPassword = await bcrypt.compare(password.trim(), admin.password)
            
            if (checkPassword) {
                return new Response(JSON.stringify(admin), { status: 201 })
            } else {
                return new Response('', { status: 404 })
            }
        } else {
            return new Response('', { status: 404 })
        }
    } catch (error) {
        console.log(error)
        return new Response(error ,{ status: 501 })
    }
}