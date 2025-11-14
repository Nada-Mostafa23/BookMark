var nameInput = document.querySelector('#bookname')
var urlInput = document.querySelector('#bookurl')
var submitBtn = document.querySelector('#submitbtn')
var updateBtn = document.querySelector('#updatebtn')
var visitBtn = document.querySelector('.visit')
var searchInput = document.querySelector("#searchInput")
var modal = document.querySelector(".card")
var closeBtn = document.querySelector(".btn-close")

var indexGlobal = 0
var bookList = []
if (localStorage.getItem('data') != null) {
    bookList = JSON.parse(localStorage.getItem('data'))
    showData()
}
function addData() {
if(validName()==true && validUrl()==true) {
    var book = {
        name: nameInput.value,
        url: urlInput.value
    }
    bookList.push(book)
    localStorage.setItem('data', JSON.stringify(bookList))
    clearData()
    showData()
     nameInput.classList.remove('is-valid')
      urlInput.classList.remove('is-valid')
}else{
    showModal() 
}
        
  
}
submitBtn.addEventListener('click',addData)
function showData() {
    var res = ''
    for (var i = 0; i < bookList.length; i++) {
        
        res += ` <tr>
        <td>`+ i + `</td>
        <td>`+ bookList[i].name + `</td>
        <td><button class="btn btn-success visit" onclick="openUrl(`+i+`)" >
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button></td>
        <td><button class="btn btn-warning text-white" onclick="setData(`+ i + `)">Update</button></td>
        <td><button class="btn btn-danger pe-2" onclick="deleteData(`+ i + `)">
          <i class="fa-solid fa-trash-can"></i>
          Delete
        </button></td>
      </tr>`
    }
    document.querySelector('#dataInfo').innerHTML = res
}
function clearData() {
    nameInput.value = ''
    urlInput.value = ''
}

function deleteData(index) {
    bookList.splice(index, 1)
    localStorage.setItem('data', JSON.stringify(bookList))
    showData()
}


function setData(ind) {
    indexGlobal = ind
    var currentItem = bookList[ind]
    nameInput.value = currentItem.name
    urlInput.value = currentItem.url
    submitBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')
}
function updateData() {
    if(validName()==true && validUrl()==true){
         var book = {
        name: nameInput.value,
        url: urlInput.value
    }
    bookList.splice(indexGlobal, 1, book)  //replace
    localStorage.setItem('data', JSON.stringify(bookList))
    clearData()
    showData()
    submitBtn.classList.remove('d-none')
    updateBtn.classList.add('d-none')
     nameInput.classList.remove('is-valid')
      urlInput.classList.remove('is-valid')
    }else{
        showModal()
    }
   
}
updateBtn.addEventListener("click",updateData)
function openUrl(even){
    window.open(bookList[even].url,"_blank")
}
function search(){
    var searchval = searchInput.value.toLowerCase()
    var res = ''
   for(var i=0 ;i<bookList.length ;i++){
    if(bookList[i].name.toLowerCase().includes(searchval)==true){
        res += ` <tr>
        <td>`+ i + `</td>
        <td>`+ bookList[i].name.toLowerCase().replace(searchval," <span class='bg-success'>"+searchval+"</span>") + `</td>
        <td><button class="btn btn-success visit" onclick="openUrl(`+i+`)" >
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button></td>
        <td><button class="btn btn-warning text-white" onclick="setData(`+ i + `)">Update</button></td>
        <td><button class="btn btn-danger pe-2" onclick="deleteData(`+ i + `)">
          <i class="fa-solid fa-trash-can"></i>
          Delete
        </button></td>
      </tr>`
    }
   }
   document.querySelector('#dataInfo').innerHTML = res

}
function showModal(){
modal.classList.remove('d-none')
}
function closeModal(){
modal.classList.add('d-none')
}
closeBtn.addEventListener("click",closeModal)
document.addEventListener('keydown',function(event){
    if(event.key == 'Escape'){
        closeModal()
    }
})
nameInput.addEventListener('blur',validName)
urlInput.addEventListener('blur',validUrl)
function validName(){
    var nameValid = nameInput.value
    var  pattern = /^\w{4,}(\s+\w+)*$/;
    if(pattern.test(nameValid)==true){
        nameInput.classList.add('is-valid')
        nameInput.classList.remove('is-invalid')
        return true
    }else{
        nameInput.classList.remove('is-valid')
        nameInput.classList.add('is-invalid')
        return false
    }
}
function validUrl(){
    var urlValid = urlInput.value
    var  pattern = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
    if(pattern.test(urlValid)==true){
        urlInput.classList.add('is-valid')
        urlInput.classList.remove('is-invalid')
        return true
    }else{
        urlInput.classList.remove('is-valid')
        urlInput.classList.add('is-invalid')
        return false
    }
}









