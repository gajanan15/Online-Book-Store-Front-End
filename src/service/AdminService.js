import  Axios from 'axios'
import Constant from '../config/Constant'

export class AdminService {
    addbook=(data)=>{
        return Axios({
            method:'post',
            url:`${Constant.apiUrl}book`,
            data: data,
        }).then(response =>{
            return response
        });
    }
}