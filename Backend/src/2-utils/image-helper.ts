import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";
import dal from "./dal";

// Save image to disk in a uuid name:
async function saveImage(image: UploadedFile): Promise<string> {

    // If no image sent:
    if (!image) return "no-image.jpg";

    // Take original file extension:
    const extension = image.name.substring(image.name.lastIndexOf("."));

    // Create unique file name: 
    const fileName = uuid() + extension;

    // Get absolute path to save image:
    const absolutePath = path.join(__dirname, "..", "1-assets", "images", fileName);

    // Save image:
    await image.mv(absolutePath);

    // Return unique name:
    return fileName;
}

// Update image: 
async function updateImage(image: UploadedFile, vacationId: number): Promise<string> {

    // Remove old image:
    await deleteImage(vacationId);

    // Save new image:
    const fileName = await saveImage(image);

    // Return new image name:
    return fileName;
}

// Delete image: 
async function deleteImage(vacationId: number): Promise<void> {
    try {
        if (!vacationId) return;

        // Get the old image name:
        const data = await dal.execute('SELECT imageName AS oldImageName FROM vacations WHERE vacationId = ?',
            [vacationId]);

        // Extract old image name from returned array:
        let { oldImageName } = data[0];

        // If the old image was the standard no-image placeholder, give empty string to avoid deleting it:
        if (oldImageName === "no-image.jpg") oldImageName = "";

        // Get absolute path to save image:
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", oldImageName);

        // Remove image:
        await fsPromises.rm(absolutePath);
    }
    catch (err: any) {
        console.log(err.message);
    }
}

export default {
    saveImage,
    updateImage,
    deleteImage
};
