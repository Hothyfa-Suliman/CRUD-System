let cName = document.getElementById("name");
let cCategory = document.getElementById("category");
let cPrice = document.getElementById("price");
let cDescription = document.getElementById("description");
let addBtn = document.getElementById("Add");
let clrBtn = document.getElementById("Clr");
let data = document.getElementById("data");
let inputs = document.getElementsByClassName("input");
let search = document.getElementById("search");
let backClr = document.getElementById("backClr");
let error = document.getElementsByClassName("error");
let courses = [];

if (localStorage.getItem("saveData")!=null){
    courses = JSON.parse(localStorage.getItem("saveData"));
    displayCourse();
}
else {
    courses = [];
}

addBtn.addEventListener("click",addCourse);

function addCourse(){
    if (validationName() && validationCat()){
    let course = {
        name : cName.value,
        category : cCategory.value,
        price : cPrice.value,
        description : cDescription.value
    }
    courses.push(course);
    localStorage.setItem("saveData",JSON.stringify(courses));
    displayCourse();
    clearit();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Course added successfully',
        showConfirmButton: false,
        timer: 1500
    })
}
else{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error.. please add another Name',
    })
}
}

function displayCourse(){
    let result = ``;
    for (i=0 ; i<courses.length ; i++){
        result += `<tr>
        <td class="th1">${i}</td>
        <td class="th2">${courses[i].name}</td>
        <td class="th3">${courses[i].category}</td>
        <td class="th4">${courses[i].price}</td>
        <td class="th5">${courses[i].description}</td>
        <td><button class="green" onclick="updateCourse(${i})"><i class="fas fa-edit"></button></td>
        <td><button class="red" onclick="deleteCourse(${i})"><i class="fas fa-trash-alt"></button></td>  
        </tr> `
    }
    data.innerHTML = result;
}

clrBtn.addEventListener("click",clearit);

function clearit(){
    for (let i=0 ; i<inputs.length; i++){
        inputs[i].value = "";
        error[0].style.visibility="hidden";
        error[1].style.visibility="hidden";
    }
}

function updateCourse(id){
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (validationName() && validationCat()){
        if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
            courses[id].name = cName.value;
            courses[id].category = cCategory.value;
            courses[id].price = cPrice.value;
            courses[id].description = cDescription.value;
            localStorage.setItem("saveData",JSON.stringify(courses));
            displayCourse();
            clearit();
        }
        else if(result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
            }
        } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
        }
    })
}

function deleteCourse(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!!'
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        )
    courses.splice(id,1);
    localStorage.setItem("saveData",JSON.stringify(courses));
    displayCourse();
        }
    })
}

search.addEventListener("keyup",searchCourse);

function searchCourse(){
    let serachKey = search.value;
    let result = ``;
    for (let i=0; i<courses.length;i++){
        if (courses[i].name.toLowerCase().includes(serachKey.toLowerCase())){
                result += `<tr>
                <td class="th1">${i}</td>
                <td class="th2">${courses[i].name}</td>
                <td class="th3">${courses[i].category}</td>
                <td class="th4">${courses[i].price}</td>
                <td class="th5">${courses[i].description}</td>
                <td><button class="green" onclick="updateCourse(${i})"><i class="fas fa-edit"></button></td>
                <td><button class="red" onclick="deleteCourse(${i})"><i class="fas fa-trash-alt"></button></td>  
                </tr> `
            }
        data.innerHTML = result;
    }
}

backClr.addEventListener("click",changeBackClr);

function changeBackClr(){
    let random1 = Math.round(Math.random()*255);
    let random2 = Math.round(Math.random()*255);
    let random3 = Math.round(Math.random()*255);

    document.body.style.backgroundColor =`rgba(${random1},${random2},${random3},0.4)`
}

function validationName(){
    let validate = /^[A-Z][a-z0-9 ]{3,15}$/gm;
    if (validate.test(cName.value)){
        error[0].style.visibility="hidden";
        return true;
    }
    else{
        error[0].style.visibility="visible";
        return false;
    }
}
cName.addEventListener('blur',validationName);

function validationCat(){
    let validate = /^[A-Z][a-z0-9 ]{3,15}$/gm;
    if (validate.test(cCategory.value)){
        error[1].style.visibility="hidden";
        return true;
    }
    else{
        error[1].style.visibility="visible";
        return false;
    }
}
cCategory.addEventListener('blur',validationCat);
