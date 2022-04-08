function getComboA(selectObject) {
    var value = selectObject.value;  
    
    
    if(value === "primary") {

        let linkInput = document.getElementById("link-input");
        linkInput.classList.add("hidden");
        
    }else if(value === "link") {
        let linkInput = document.getElementById("link-input");
        linkInput.classList.remove("hidden");
    }
}
