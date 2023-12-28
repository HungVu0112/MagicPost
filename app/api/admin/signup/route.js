import { connectToDB } from "@/utils/database";
import Admin from "@/models/admin";
const bcrypt = require("bcrypt")

export const POST = async (req) => {
    const { name, phoneNumber, password, role, location } = await req.json()

    try {
        await connectToDB()

        const checkExist = await Admin.findOne({ phoneNumber: phoneNumber})

        if (!checkExist) {
            const newAdmin = new Admin({
                name: name.trim(),
                phoneNumber,
                password: await bcrypt.hash(password.trim(), 10),
                role,
                location
            })

            await newAdmin.save()

            return new Response(JSON.stringify(newAdmin), { status: 201 })
        } else {
            return new Response('', { status: 404 })
        }

    } catch (error) {
        console.log(error)
        return new Response(error ,{ status: 501 })
    }
}