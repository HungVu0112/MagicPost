import { Schema, model, models } from "mongoose"

const OrderSchema = new Schema({
    state: {
        type: String,
        required: true,
    },
    sender: {
        type: {
            name: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            phoneNumber: {
                type: String,
                required: true,
            },
            zipcode: {
                type: String,
                required: true,
            }
        },
        required: true,
    },
    receiver: {
        type: {
            name: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            phoneNumber: {
                type: String,
                required: true,
            },
            zipcode: {
                type: String,
                required: true,
            }
        },
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    pay: {
        type: Boolean,
        required: true,
    },
    sendDate: {
        type: Date,
        required: true,
    },
    receiveDate: {
        type: Date,
    },
    orderID: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    }
})

const Order = models.Order || model('Order', OrderSchema)

export default Order