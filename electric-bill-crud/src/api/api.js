import axios from "axios";
import { url } from "../config";

export const getRecords = async ({ sort=false, page=1, limit=9 }) => { 
    try {
        let newUrl = `?page=${page}&limit=${limit}`;
        if (sort) {
            newUrl += `&sort=${sort}`;
        }
        
        const response = await axios.get(`${url}${newUrl}`);
        if(response.status === 200) {
            return response.data;
        }
        else {
            return {success:false};
        }
    } catch (error) {
        // console.log(error);
        return {
            success: false,
            message: error.message
        }
    }
}

export const createRecord = async (data) => {
    try {
        const response = await axios.post(`${url}`, data);
        if (response.status === 201) {
            return response.data;
        }
        else {
            return { success: false };
        }
    } catch (error) {
    //    console.log(error);
       return {
           success: false,
           message: error.message
       }
    }
}

export const updateRecord = async (id, data) => { 
    try {
        const response = await axios.put(`${url}/${id}/edit`, data);
        if(response.status === 200) {
            return response.data;
        }
        else {
            return {success:false};
        }
    } catch (error) {
        // console.log(error);
        return {
            success: false,
            message: error.message
        }
    }
}

export const deleteRecord = async (id) => { 
    try {
        const response = await axios.delete(`${url}/delete/${id}`);
        if(response.status === 200) {
            return response.data;
        }
        else {
            return {success:false};
        }
    } catch (error) {
        // console.log(error);
        return {
            success: false,
            message: error.message
        }
    }
}