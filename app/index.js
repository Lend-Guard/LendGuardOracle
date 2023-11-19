import {getVaultsUsersAndGuardThem} from "./src/business_logics/general.js";
import dotenv from "dotenv";

dotenv.config()

setInterval(getVaultsUsersAndGuardThem, 100);
