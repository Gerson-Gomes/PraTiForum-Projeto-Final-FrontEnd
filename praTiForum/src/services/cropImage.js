// import { createImage } from 'react-easy-crop';
// import { getCroppedImg } from 'react-easy-crop/utils';

// export default async function getCroppedImg(imageSrc, cropAreaPixels) {
//     try {
//         const image = await createImage(imageSrc);
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");

//         canvas.width = cropAreaPixels.width;
//         canvas.height = cropAreaPixels.height;

//         ctx.drawImage(
//             image,
//             cropAreaPixels.x,
//             cropAreaPixels.y,
//             cropAreaPixels.width,
//             cropAreaPixels.height,
//             0,
//             0,
//             cropAreaPixels.width,
//             cropAreaPixels.height
//         );

//         return new Promise((resolve, reject) => {
//             canvas.toBlob((blob) => {
//                 if (!blob) {
//                     reject(new Error("Canvas is empty"));
//                     return;
//                 }
//                 resolve(URL.createObjectURL(blob)); // Retorna a URL da imagem cortada
//             }, "image/png");
//         });
//     } catch (error) {
//         console.error("Error cropping image:", error);
//         return null;
//     }
// }

export default async function getCroppedImg(imageSrc, cropAreaPixels) {
    const createImage = (url) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
      });
  
    try {
      const image = await createImage(imageSrc);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      canvas.width = cropAreaPixels.width;
      canvas.height = cropAreaPixels.height;
  
      ctx.drawImage(
        image,
        cropAreaPixels.x,
        cropAreaPixels.y,
        cropAreaPixels.width,
        cropAreaPixels.height,
        0,
        0,
        cropAreaPixels.width,
        cropAreaPixels.height
      );
  
      // return new Promise((resolve, reject) => {
      //   canvas.toBlob((blob) => {
      //     if (!blob) {
      //       reject(new Error("Canvas is empty"));
      //       return;
      //     }
      //     resolve(URL.createObjectURL(blob)); // Retorna a URL da imagem cortada
      //   }, "image/png");
      // });

      return canvas.toDataURL("image/png")
      
    } catch (error) {
      console.error("Error cropping image:", error);
      return null;
    }
  }