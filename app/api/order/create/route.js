import { connectToDB } from "@/utils/database";
import Order from "@/models/order";
import TradingPoint from "@/models/tradingPoint";

const generateRandomString = (length) => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
};

export const POST = async (req) => {
    const { state, sender, receiver, type, weight, width, height, length, amount, note, price } = await req.json()

    try {
        await connectToDB()

        const orderID = "MAGICPOST" + generateRandomString(11)

        const newOrder = new Order({
            state,
            sender,
            receiver,
            type,
            weight,
            width,
            height,
            length,
            amount,
            note,
            price,
            orderID,
        })

        await newOrder.save()

        const tradingPoint = await TradingPoint.findOne({ id: newOrder.sender.district })

        tradingPoint.importOrder.push(newOrder.orderID)

        await tradingPoint.save()

        return new Response(newOrder, { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response(error ,{ status: 501 })
    }
}