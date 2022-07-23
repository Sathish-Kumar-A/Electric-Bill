import axios from "axios";
import { url } from "../config";

export const getRecords = async ({ sort, page, limit }) => { 
    try {
        const response = await axios.get(`${url}?sort=${sort}&?page=${page}&?limit=${limit}`);
        console.log(response);
        if(response.status === 200) {
            return response.data;
        }
        else {
            return {success:false};
        }
    } catch (error) {
        console.log(error);
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
       console.log(error);
       return {
           success: false,
           message: error.message
       }
    }
}

export const updateRecord = async (id, data) => { 
    try {
        const response = await axios.put(`${url}/${id}/edit`, data);
        console.log(response);
        if(response.status === 200) {
            return response.data;
        }
        else {
            return {success:false};
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }
    }
}

export const deleteRecord = async (id) => { 
    try {
        const response = await axios.delete(`${url}/delete/${id}`);
        console.log(response);
        if(response.status === 200) {
            return response.data;
        }
        else {
            return {success:false};
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }
    }
}