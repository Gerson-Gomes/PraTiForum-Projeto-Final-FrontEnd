import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Cropper from 'react-easy-crop'

library.add(faXmark)
export default function ModalContent({ onClose }) {
  const [image, setImage] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

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
          />
        )}
      </div>
      <button onClick={onClose} className="exit-modal-button">Close</button>
    </div>
  );
}
