import { Schema, model, models } from "mongoose"

const GatheringPointSchema = new Schema({
    id: {
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

const GatheringPoint = models.GatheringPoint || model('GatheringPoint', GatheringPointSchema)

export default GatheringPoint