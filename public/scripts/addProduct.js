const createCatButton = document.getElementById("btn_new_tag");

const newTagInput = document.getElementById("new_tag_name");


createCatButton.onclick = ()=>{
    let tag = newTagInput.value;
    if(tag !=="") {
        axios.post("http://localhost:3000/tags/create",{newTag: tag})
            .then((res)=>{
            newTagInput.value="";
            window.location.reload(); })
            .catch((error)=>{console.log(error)});
    }
}


