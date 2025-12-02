function selectCrop(cropName){
    localStorage.setItem("selectedCrop", cropName);
    window.location.href = "dashboard.html";
}
