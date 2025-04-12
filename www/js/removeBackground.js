
document.getElementById("clickSubmit").addEventListener("click", removeBackground);





function removeBackground() {

  var fileInput = document.getElementById("fileSelector");

  var file = fileInput.files[0];

  var formData = new FormData();

  formData.append("image_file", file);

  fetch("https://api.remove.bg/v1.0/removebg", {

    method: "POST",

    headers: {

      "X-Api-Key": "VBxdDWWyuJa2epfDtxf8F56R"

      // "X-Api-Key": "8UvDuz97hr15MGsPGKfkadNS"

    },

    body: formData

  })

  .then(response => response.blob())

  .then(blob => {

    var url = URL.createObjectURL(blob);

    var resultDiv = document.getElementById("imagePreview");

    resultDiv.innerHTML = "";

    var image = new Image();

    image.src = url;

    resultDiv.appendChild(image);



    // Create download link

    var link = document.createElement("a");

  link.href = url;

  link.download = "background_removed.png";

  var span = document.createElement("span");

  span.innerHTML = "Download <i class='fa fa-download'></i>";

  
  span.style.position = "absolute";

  span.style.bottom = "90%";

  span.style.left = "25%";

  span.style.fontSize = "25px";


  link.appendChild(span);

  resultDiv.appendChild(link);
  
  async function blobUrlToBase64(blobUrl) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]); // Extract base64 part
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
async function downloadBase64Image(base64Data, filename = 'image.png') {
  try {
      // Get the Downloads directory path (Android)
      const downloadsDir = cordova.file.externalRootDirectory + 'Download/';

      // Use the File plugin to write the file
      window.resolveLocalFileSystemURL(downloadsDir, (dirEntry) => {
          dirEntry.getFile(filename, { create: true }, (fileEntry) => {
              fileEntry.createWriter((fileWriter) => {
                  fileWriter.onwriteend = () => {
                      console.log('Image downloaded successfully!');
                      // Optionally open the file after download
                      cordova.plugins.fileOpener2.open(
                          fileEntry.toURL(),
                          'image/png',
                          { error: (e) => console.error('Error opening file:', e) }
                      );
                  };
                  fileWriter.onerror = (e) => console.error('Error writing file:', e);

                  // Convert base64 to a Blob
                  const byteCharacters = atob(base64Data);
                  const byteNumbers = new Array(byteCharacters.length);
                  for (let i = 0; i < byteCharacters.length; i++) {
                      byteNumbers[i] = byteCharacters.charCodeAt(i);
                  }
                  const byteArray = new Uint8Array(byteNumbers);
                  const blob = new Blob([byteArray], { type: 'image/png' });

                  fileWriter.write(blob);
              });
          }, (error) => console.error('Error creating file:', error));
      }, (error) => console.error('Error accessing downloads directory:', error));
  } catch (e) {
      console.error('Error:', e);
  }
}  

link.addEventListener("click", async () => {
  const blobUrl = url; // e.g., from camera or fetched data
  const base64Data = await blobUrlToBase64(blobUrl);
  await downloadBase64Image(base64Data, 'downloaded_image.png');
  alert('Image downloaded successfully! Check your downloads folder.');
});
 
  })

  .catch(error => {

    console.error(error);

  });

}




  