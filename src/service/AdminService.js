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

    displaybook=(page)=>{
        return Axios({
            method:'get',
            params:{PageNo:page-1},
            url:`${Constant.apiUrl}books`,
        })
    }

    getCount=()=>{
        return Axios({
            method:'get',
            url:`${Constant.apiUrl}total/books`,
        })
    }
}
