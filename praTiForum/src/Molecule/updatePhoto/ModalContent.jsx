import { useCallback, useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Cropper from 'react-easy-crop'
import getCroppedImg from "../../services/cropImage";

library.add(faXmark)


export default function ModalContent({ onClose }) {
  const [image, setImage] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedImage, setCroppedImage] = useState(null)
  const [cropArea, setCropArea] = useState(null)



  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type === "image/png") {
      const reader = new FileReader()
      reader.onload = () => setImage(reader.result)
      reader.readAsDataURL(file)
    } else {
      alert("Apenas imagens com formato PNG serão aceitas")
    }
  }
  // Parte do codigo que não está funcionando

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCropArea(croppedAreaPixels)
  }, [])

  const handleUpload = async () => {
    if (!image) {
      alert("Adcione uma imagem primeiro")
      return
    }
    if (cropArea) {
      try {
        const croppedImg = await getCroppedImg(image, cropArea)

        

        console.log('Foto refatorada', croppedImg)
        setCroppedImage(croppedImg);
        alert("Imagem eviada com sucesso!")
      } catch (error) {
        console.error("Erro ao formatar a imagem");
        alert("Falha ao processar a imagem")
      }
    }
    onClose()
  }

  // const handleUpload = () => {
  //   if (!image) {
  //     alert("Adcione uma imagem primeiro")
  //     return;
  //   }
  //   console.log("Enviando imagem...", croppedImage || image);
  //   alert("O seu avatar foi atualizado com sucesso!")
  //   onClose();

  // }

  return (
    <div className="modal-photo-upload" >
      <button onClick={onClose} className="exit-modal-cross">
        <FontAwesomeIcon icon="xmark" />
      </button>
      <h2>Adcione sua foto para seu perfil</h2>
      <input type="file" accept="image/png" onChange={handleFileChange} />
      <div className="crop-container">
        {image && (
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        )}
      </div>
      <button onClick={handleUpload} className="upload-button"> Upload</button>

    </div>
  );
}
