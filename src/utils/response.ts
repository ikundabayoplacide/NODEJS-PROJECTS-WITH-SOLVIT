
import {Response} from 'express';
interface IResponse<T>{
    status?:number;
    success?:boolean;
    message?:string;
    data?:T;
    token?:T;
    res:Response
}
export const ResponseService=<T>({data,token,status=200,message,success,res}:IResponse<T>):Response<IResponse<T>>=>{
    if(status===500){
        message='Internal server Error'
    }
    return res.status(status).json({
        data,message,success,token
    })
}