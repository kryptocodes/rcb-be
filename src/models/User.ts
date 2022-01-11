import { Document, Model, model, Schema } from "mongoose";

export interface IUser extends Document {
    email: string;
    isEmailVerified: boolean;
    isBanned: boolean;
    NewsletterSubscribed:boolean;
    VisitedSite:boolean;
    FollowTwitter:boolean;
    FollowFacebook:boolean;
    InstagramVisited:boolean;
    
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
    NewsletterSubscribed: {
        type: Boolean,
        default: false,
    },
    VisitedSite: {
        type: Boolean,
        default: false,
    },
    FollowTwitter: {
        type: Boolean,
        default: false,
    },
    FollowFacebook: {
        type: Boolean,
        default: false,
    },
    InstagramVisited: {
        type: Boolean,
        default: false,
    },
},{
    timestamps: true,
}
);


const User: Model<IUser> = model("User", UserSchema);

export default User;