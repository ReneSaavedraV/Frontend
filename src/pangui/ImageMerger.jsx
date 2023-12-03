import React, { useRef, useEffect } from 'react';

// Toma dos imagenes y las une en una sola. Retorna un canvas con la imagen unida.
// Función utilizada para unir Pangui con su Ropa.

const ImageMerger = ({ imageUrl1, imageUrl2, list, ...restProps }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const mergeImages = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const loadImage = (url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.src = url;
        });
      };

      const [image1, image2] = await Promise.all([loadImage(imageUrl1), loadImage(imageUrl2)]);

      canvas.width = image1.width; 
      canvas.height = image1.height;

      ctx.drawImage(image1, 0, 0);
      ctx.drawImage(image2, 0, 0);

      const { alt, className, style, ...imgProps } = restProps;

      const mergedImageUrl = canvas.toDataURL('image/png');

      const imgElement = document.createElement('img');
      imgElement.src = mergedImageUrl;
      imgElement.alt = alt || 'Merged Image';
      imgElement.className = className || '';
      imgElement.style = style || '';

    };

    mergeImages();
  }, [imageUrl1, imageUrl2, restProps]);
  if (list) {
    return <canvas className={'box-pangui'} ref={canvasRef}/>;
  } else {
  return <canvas className={'newpangui-image'} ref={canvasRef} />;
  }
};

export default ImageMerger;