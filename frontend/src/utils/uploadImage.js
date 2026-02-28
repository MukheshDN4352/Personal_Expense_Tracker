import { API_paths } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage=async(imageFile)=>{
    const formData=new FormData();
    formData.append('image',imageFile)
    try {
      const response=await axiosInstance.post(API_paths.IMAGE.UPLOAD_IMAGE,formData,{
        headers:{
            'content-Type':'multipart/form-data', //set header for file upload
        }
      })  ;
      return response.data;
    } catch (error) {
        console.error("Error uploading the image", error);
        throw error;
    }
}

export default uploadImage;