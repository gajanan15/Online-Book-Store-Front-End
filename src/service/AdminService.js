import  Axios from 'axios'
import Constant from '../config/Constant'

export class AdminService {
    addbook=(e,data)=>{
        e.preventDefault();
        return  Axios({
            method:'post',
            url:`${Constant.apiUrl}admin/book`,
            data: data,
         })

    }
}
