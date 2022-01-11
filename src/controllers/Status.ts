const User = require("../models/User");


export const getUserByEmail = async (req:any, res:any,next:any,email:string) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(404).json({ msg: "User not found" });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

export const getStatus = async (req:any, res:any) => {
    try {
        res.json(req.user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}