const fileInput = document.getElementById('fileSelector'); // Replace 'yourFileInputId' with the actual ID of your input element
const uploadBtn = document.getElementById('clickSubmit');

fileInput.addEventListener('change', function () {
    if (fileInput.files.length > 0) {
        // A file has been selected
        console.log(`File selected: ${fileInput.files[0].name}`); // Access the file name
        uploadBtn.style.display = "block";
      
      } else {
        // No file has been selected
        console.log('No file selected');
        uploadBtn.style.display = "none";
      }
  });


//   Displaying the image is bugged, fix this later.
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

fileInput.addEventListener("change", function(){
  const file = this.files[0];

  if (file){
      const reader = new FileReader();

      previewDefaultText.style.display = "none";
      previewImage.style.display = "block";

      reader.addEventListener("load", function(){
        previewImage.setAttribute("src", this.result);
      });

      reader.readAsDataURL(file);

    }
    else{
      previewDefaultText.style.display = null;
      previewImage.style.display = null;
      previewImage.setAttribute("src", "");
    }
})