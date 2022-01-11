import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import jwt from "jsonwebtoken";
import Request from "../types/Request";
import User, { IUser } from "../models/User";
import { sendEmail } from "../middleware/mailer";

import OTP, {IOTP} from "../models/OTP";
import { getStatus } from "../controllers/Status";
import { getUserByEmail } from "../controllers/Status";
var ObjectID = require('mongodb').ObjectID;

import { generateOTP } from "../utils/generateOTP";

const router: Router = Router();


router.post(
    "/enter",[
        check("email").isEmail(),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email } = req.body;
        try {
            let user: IUser = await User.findOne({ email });
    

            const userFields = {
                email: email,
            }


            user = new User(userFields);
            await user.save()
            console.log(email)
            const payload = {
              email: user.email,
            };
            sendEmail(email,generateOTP());
            await OTP.create({user:user},{emailVerify:generateOTP()});
             res.status(200).json({
            msg: "User created",
           })
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
)



router.post(
    "/status",
    [
        check("email").isEmail(),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email } = req.body;
        try {
            let user: IUser = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            const payload = {
                email: user.email,
            };
            res.status(200).json({
                user
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
)

router.post(
    "/email-verify",
    [
       check("email").isEmail(),
       check("otp").isNumeric(),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email,otp } = req.body;
        const OTPValue = await OTP.findOne({emailVerify:otp})
        if(OTPValue == otp){
            await OTP.updateOne({email:email},{emailVerify:true})
            res.status(200).json({
                msg: "Email verified"
            })
        }
        else{
            res.status(400).json({
                msg: "Email not verified"
            })
        }
    }
)

router.post(
    "/resend",
    [
        check("email").isEmail(),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email } = req.body;
        try {
            let user: IUser = await User.findOne({ email });
            if (!user) {
                user = new User(email);
            await user.save()
            }
            const payload = {
                email: user.email,
            };
            sendEmail(email,generateOTP());
            res.status(200).json({
                msg: "Email sent",
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
)

router.post(
    "/send",
    [
        check("email").isEmail(),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email } = req.body;
        try {
            let user: IUser = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            let id = user._id
            await user.updateOne(
                {"_id": id},
                {$set: req.body}
            ).then(() => {
               res.status(200).json({
                msg: "User created",
                })
            }).catch(err => {
                res.status(500).send("Server Error");
            })
            
            //     (err: any,User:any) => {
            //         if (err) {
            //             return res.status(500).json({ msg: "Server error" });
            //         }
            //         console.log(User)
            //         res.status(200).json({
            //             msg: "User updated",
            //         });
            //     }
            // );
           
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
)




export default router;