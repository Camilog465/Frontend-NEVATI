import { Product } from "./product";
import {User} from "./user"
export interface Response {
    ok: boolean;
    msg?: string;
    token?: string;
    data?: User
}
export interface ResponsePro {
    ok: boolean;
    msg?: string;
    data?: Product
}