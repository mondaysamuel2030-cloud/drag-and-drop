// Step 1: Select all the small draggable images
const smallImages = document.querySelectorAll(".small-image");

// Step 2: Select the large box where the image will be displayed
const largeBox = document.getElementById("largeBox");

// Step 3: A variable to hold the image source while it's being dragged
// (This is like a messenger carrying info from the small image to the big box)
let draggedImageSrc;

// Step 4: Set up drag listeners on each small image
// We use forEach so the same code works for all 5 images
smallImages.forEach(function (image) {
  
  // The dragstart event happens when the user starts dragging an image
  image.addEventListener("dragstart", function () {
    // Save the src of the image being dragged
    // e.g., "images/image3.jpg"
    draggedImageSrc = image.src;
    
    // Highlight the large box to show the user where to drop
    largeBox.classList.add("dragging-over");
  });

  // The dragend event happens when the drag ends (the user lets go)
  // This cleans up, whether the drop was successful or not
  image.addEventListener("dragend", function () {
    largeBox.classList.remove("dragging-over");
  });
});

// Step 5: Set up the large box to accept the image
// The dragenter event happens when the user drags over the box
largeBox.addEventListener("dragenter", function (event) {
  // preventDefault() tells the browser to allow a drop here
  // (Without this, the browser blocks it by default)
  event.preventDefault();
  largeBox.classList.add("dragging-over");
});

// The dragover event keeps firing while the user is dragging over the box
// We need this to keep the browser allowing the drop
largeBox.addEventListener("dragover", function (event) {
  event.preventDefault();
});

// The dragleave event happens when the drag leaves the box
// This removes the highlight if the user drags back out
largeBox.addEventListener("dragleave", function () {
  largeBox.classList.remove("dragging-over");
});

// The drop event happens when the user releases the mouse over the box
largeBox.addEventListener("drop", function (event) {
  event.preventDefault(); // Stop the browser from opening the image
  
  // Now that we have the src saved from dragstart, we can use it
  // 1. Make sure the box is empty first
  largeBox.innerHTML = "";
  
  // 2. Create a new image element
  const newImage = document.createElement("img");
  
  // 3. Set its src to the one we captured
  newImage.src = draggedImageSrc;
  
  // 4. Add the image to the large box
  largeBox.appendChild(newImage);
  
  // 5. Remove the highlight
  largeBox.classList.remove("dragging-over");
});