import { connectToDB } from "@/utils/database";
import User from "@/models/user";
const bcrypt = require("bcrypt")

export const POST = async (req) => {
    const { name, phoneNumber, address, zipcode, password } = await req.json()

    try {
        await connectToDB()

        const checkExist = await User.findOne({ phoneNumber: phoneNumber})

        if (!checkExist) {
            const newUser = new User({
                name: name.trim(),
                phoneNumber,
                address: address.trim(),
                zipcode,
                password: await bcrypt.hash(password.trim(), 10),
                role: 'Khách hàng',
            })

            await newUser.save()

            return new Response(JSON.stringify(newUser), { status: 201 })
        } else {
            return new Response('', { status: 404 })
        }

    } catch (error) {
        console.log(error)
        return new Response(error ,{ status: 501 })
    }
}