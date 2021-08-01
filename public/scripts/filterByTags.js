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

        axios.post("http://localhost:3000/tags/filter", {list: idList})
        .then((res)=>{
            console.log(`res`, res.data);
            let foundShoObjects= res.data;

            let ShoesToShow=[];
            foundShoObjects.forEach((shoe)=>{
                ShoesToShow.push(shoe._id);
            })

            shoeItem.forEach((shoeItem)=>{
                if (ShoesToShow.includes(shoeItem.id)){
                    shoeItem.style.display = "contents";
                }

                else{
                    shoeItem.style.display = "none";
                }
            })


         })
            .catch((error)=>{console.log(error)});
      });
})