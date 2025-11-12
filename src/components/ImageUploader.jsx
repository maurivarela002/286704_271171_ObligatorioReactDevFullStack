import React, { useState } from 'react'
import "./imageUploader.css"

const ImageUploader = () => {

    // const CLOUD_NAME = "ds30t4tuo";
    // const UPLOAD_PRESET = "expo_uploads";
    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME ;
    const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET ;

    const [isUploading, setIsUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [message, setMessage] = useState("");

    const resetState = () => {
        setImagePreview(null);
        setMessage("")
    }

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            setMessage("No se selecciono ninguna imagen");
            return;
        }

        setImagePreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            setIsUploading(true);
            setMessage("Subiendo imagen...")

            //Enviar a cloudinary
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            )

            const data = await res.json();

            if (data.secure_url) {
                setMessage(`La imagen fue subida correctamente: ${data.secure_url}`)
            } else {
                setMessage(`Error en la subida`)
            }

        } catch (error) {
            setMessage("Error al subir la imagen " + error)
        } finally {
            setIsUploading(false)
        }
    }



    return (
        <div className='iu-container'>
            <h2 className='iu-title'>Subir imagen a Cloudinary</h2>
            <label className={`iu-button ${isUploading ? "iu-button--disabled" : ''}`}>
                <input type="file"
                    accept='image/*'
                    onChange={handleFileChange}
                    className='iu-file-input'
                    disabled={isUploading}
                />
                {isUploading ? "Subien..." : "Seleccionar imagen"}
            </label>

            {imagePreview && (
                <div className='iu-preview-wrap'>
                    <img src={imagePreview} alt="Vista previa" className='iu-preview' />
                    <button
                        className='iu-secondary'
                        onClick={resetState}
                        disabled={isUploading}
                    >
                        Limpiar
                    </button>
                </div>
            )}
            {message && <p className='iu-message'>{message}</p>}
        </div>
    )
}

export default ImageUploader