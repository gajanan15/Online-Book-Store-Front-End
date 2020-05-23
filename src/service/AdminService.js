import Axios from 'axios'
import Constant from '../config/Constant'

export class AdminService {
    addbook = (e, data) => {
        e.preventDefault();
        return Axios({
            method: 'post',
            url: `${Constant.apiUrl}admin/book`,
            data: data,
        })
    }

    displaybook = (page) => {
        return Axios({
            method: 'get',
            params: {PageNo: page, PageSize: 8},
            url: `${Constant.apiUrl}books`,
        })
    }

    getCount = () => {
        return Axios({
            method: 'get',
            url: `${Constant.apiUrl}books/count`,
        })
    }

    searchAndFilter = (pageNo, searchText, filterName) => {
        return Axios({
            method: 'get',
            url: `${Constant.apiUrl}sort/${pageNo - 1}/${searchText}/${filterName}`
        })
    }

    addTOCart = (data) => {
        return Axios({
            method: 'post',
            url: `${Constant.apiUrl}cart`,
            data: data,
        })
    }

    myCart = () => {
        return Axios({
            method: 'get',
            url: `${Constant.apiUrl}cart`
        })
    }

    updateCart = (cartValues) => {
        return Axios({
            method: 'put',
            url: `${Constant.apiUrl}cart`,
            data: cartValues
        })
    }

    remove = (id) => {
        return Axios({
            method: 'delete',
            url: `${Constant.apiUrl}cart/${id}`
        })
    }

    customerEmail=(data)=>{
        return Axios({
            method:'post',
            url:`${Constant.apiUrl}send`,
            data:data
        })
    }

    uploadFile=(formData)=>{
        return Axios({
            method:'post',
            data:formData,
            url:`${Constant.apiUrl}admin/books/image`
        })
    }
}

