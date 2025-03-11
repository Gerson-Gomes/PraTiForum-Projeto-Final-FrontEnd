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
  

      return canvas.toDataURL("image/png")
      
    } catch (error) {
      console.error("Error cropping image:", error);
      return null;
    }
  }