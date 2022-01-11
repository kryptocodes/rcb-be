import { Document, Model, model, Schema } from "mongoose";



export interface IOTP extends Document {
    emailVerify: Number
}

const OtpSchema: Schema = new Schema({
    emailVerify: {
        type: Number,
        default: null,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
},{
    timestamps: true,
}
);


const OTP: Model<IOTP> = model("Otp", OtpSchema);

export default OTP;