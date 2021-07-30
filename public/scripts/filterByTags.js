const checkBox = document.querySelectorAll('input[type="checkbox"]');
const checkBoxEtalon = document.querySelectorAll('input[type="checkbox"]');
let shoeItem = document.querySelectorAll(".product-item-wrapper");

checkBox.forEach((checkBox)=>{
    checkBox.addEventListener('change', (event) => {
        let idList = [];

        checkBoxEtalon.forEach((box)=>{

            if(box.checked){
                let id = box.getAttribute("data-tag-id");
                idList.push(id);                
            }

        })
        console.log(`idList`, idList);
        axios.post("http://localhost:3000/tags/filter", {list: idList})
        .then((res)=>{
            


         })
            .catch((error)=>{console.log(error)});
      });
})