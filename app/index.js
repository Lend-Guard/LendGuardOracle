import {checkAndReallocate} from "./src/business_logics/general.js";
import dotenv from "dotenv";

dotenv.config()

setInterval(checkAndReallocate, 100);
