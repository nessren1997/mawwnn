/**
 * download svg by pasing the selector to that svg
 * @param query query to select the svg tag
 * @param fileName optional: name of file
 */
export const DownloadSvg = (query: string, fileName = 'download') => {
  var svgData = document.querySelector(query)!.outerHTML;
  var svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  var svgUrl = URL.createObjectURL(svgBlob);
  var downloadLink = document.createElement('a');
  downloadLink.href = svgUrl;
  downloadLink.download = `${fileName}.svg`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export const downloadImage = (src: string) => {
  const img = new Image();
  img.crossOrigin = 'anonymous'; // This tells the browser to request cross-origin access when trying to download the image data.
  // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#Implementing_the_save_feature
  img.src = src;
  img.onload = () => {
    // create Canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);
    // create a tag
    const a = document.createElement('a');
    a.download = 'QR.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  };
};
