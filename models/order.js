import { Schema, model, models } from "mongoose"

const OrderSchema = new Schema({
    state: {
        type: String,
        required: true,
    },
    sender: {
        type: Object,
        required: true,
        default: {
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
            },
            city: {
                type: String,
                required: true,
            },
            district: {
                type: String,
                required: true,
            }
        }
    },
    receiver: {
        type: Object,
        required: true,
        default: {
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
            },
            city: {
                type: String,
                required: true,
            },
            district: {
                type: String,
                required: true,
            }
        }
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
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    length: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
    },
    price: {
        type: Object,
        required: true,
        default: {
            total: {
                type: Number,
                required: true,
            },
            service_fee: {
                type: Number,
                required: true,
            },
            insurance_fee: {
                type: Number,
                required: true,
            },
            pick_station_fee: {
                type: Number,
                required: true,
            },
        }
    },
    orderID: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
}
)

const Order = models.Order || model('Order', OrderSchema)

export default Order