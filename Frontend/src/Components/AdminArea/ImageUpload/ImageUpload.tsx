import { ChangeEvent, useEffect, useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import appConfig from "../../../Utils/AppConfig";

type ImageUploadProps = {
    imageUrl?: string,
    onImageChange: Function
}

function ImageUpload(props: ImageUploadProps) {
    const [imageUrl, setImageUrl] = useState(null);

    // On init, set image url if it's passed through props:
    useEffect(() => {
        if(props.imageUrl)
            setImageUrl(props.imageUrl);
    }, [props.imageUrl]);

    // Handle uploading a file:
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = (event.target as HTMLInputElement).files[0];

        const reader = new FileReader();

        reader.onloadend = () => {
            props.onImageChange(reader.result);
            setImageUrl(reader.result);
        };

        reader.onerror = (error) => {
            console.error("File reading failed:", error);
        };

        reader.readAsDataURL(file);
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 6 }} >
            <Stack direction="row" alignItems="center" spacing={2} >
                <label htmlFor="upload-image">
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        sx={{border: 2}}
                    >
                        <input
                            id="upload-image"
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={handleFileUpload}
                        />
                        <PhotoCamera />
                    </IconButton>

                </label>
                {<img src={imageUrl || `${appConfig.serverUrl}images/vacations/no-image.jpg`} alt="Uploaded Image" style={{ height: 'auto', maxWidth: '80%' }} />}
            </Stack>
        </Container>
    );
}

export default ImageUpload;