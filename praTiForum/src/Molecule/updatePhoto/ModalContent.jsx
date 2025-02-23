import { useEffect } from "react";

export default function ModalContent({ onClose }) {
  useEffect(() => {},[])
    return (
      <div className="modal-photo-upload" >
        <div>I'm a modal dialog</div>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }
  