import { connectToDB } from "@/utils/database";
import User from "@/models/user";
const bcrypt = require("bcrypt")

export const POST = async (req) => {
    const { phoneNumber, password } = await req.json()

    try {
        await connectToDB()

        const user = await User.findOne({ phoneNumber: phoneNumber })

        if (user) {
            const checkPassword = await bcrypt.compare(password.trim(), user.password)
            
            if (checkPassword) {
                return new Response(JSON.stringify(user), { status: 201 })
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