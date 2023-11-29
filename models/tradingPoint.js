import { Schema, model, models } from "mongoose"

const TradingPointSchema = new Schema({
    parent_id: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    importOrder: {
        type: [Schema.Types.String],
        required: true,
    },
    exportOrder: {
        type: [Schema.Types.String],
        required: true,
    }
})

const TradingPoint = models.TradingPoint || model('TradingPoint', TradingPointSchema)

export default TradingPoint