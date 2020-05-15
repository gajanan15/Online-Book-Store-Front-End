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
            params:{PageNo:page-1,PageSize:8},
            url:`${Constant.apiUrl}books`,
        })
    }

    getCount=()=>{
        return Axios({
            method:'get',
            url:`${Constant.apiUrl}books/count`,
        })
    }

    searchAndFilter=(pageNo,searchText,filterName)=>{
        return Axios({
            method:'get',
            url:`${Constant.apiUrl}sort/${pageNo-1}/${searchText}/${filterName}`
        })
    }
}
