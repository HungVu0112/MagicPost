import { Schema, model, models } from "mongoose"

const AdminSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [32, 'Name must be at most 32 characters'],
    },
    phoneNumber: {
        type: String,
        unique: [true, 'Phone Number already exists'],
        required: [true, 'Phone Number is required'],
        minlength: [10, 'Phone Number must be at least 10 numbers'],
        maxlength: [11, 'Phone Number must be at most 11 numbers'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
    },
    role: {
        type: String,
        required: true,
    }
})

const Admin = models.Admin || model('Admin', AdminSchema)

export default Admin