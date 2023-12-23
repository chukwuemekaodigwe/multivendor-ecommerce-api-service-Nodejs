import cloudinary from 'cloudinary'
import ('dotenv')

const uploadImage = async (imagePath) => {
    const options = {
        api_key: process.env.CL_API_KEY,
        api_secret: process.env.CL_API_SECRET,
        use_filename: false,
        unique_filename: true,
        overwrite: true,
        hide_sensitive: true
    };

    try {
        // Upload the image
        const result = await cloudinary.v2.uploader.upload(imagePath, options);
        console.log(result);
        return result.public_id;
    } catch (error) {
        console.error(error);
    }
};


export default {
    uploadImage,
    
}