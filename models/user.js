import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
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
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    zipcode: {
        type: String,
        required: [true, 'Zipcode is required'],
        min: [5, 'Zipcode has to contain 5 digits'],
        max: [5, 'Zipcode has to contain 5 digits'],
    },
    role: {
        type: String,
        required: true,
    }
})

const User = models.User || model('User', UserSchema)

export default User