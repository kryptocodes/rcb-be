import { Request } from "express";
import Payload from "./Payload";

type request = Request & Payload;

export default request;