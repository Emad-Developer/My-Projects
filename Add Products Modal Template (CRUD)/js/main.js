var inputName = document.getElementById("name"),
    inputPrice = document.getElementById("price"),
    inputCategory = document.getElementById("category"),
    inputDesc = document.getElementById("desc"),
    inputs = document.getElementsByClassName("form-control"),
    addButon = document.getElementById("butn"),
    currentIndex = 0,
    ProductList;

if (localStorage.getItem("myProducts") == null) {
    ProductList = [];
}
else {
    ProductList = JSON.parse(localStorage.getItem("myProducts"));
    displayProduct();
}

addButon.onclick = function () {
    if (addButon.innerHTML === "Add Product") {
        addProduct();
        displayProduct();
        resetForm();
    }
    else {
        saveUpdate();
        resetForm();
    }
}

function addProduct() {
    if (validateProductName() == true) {
        Product =
        {
            productName: inputName.value,
            productPrice: inputPrice.value,
            productCateg: inputCategory.value,
            productDesc: inputDesc.value,
        }
        ProductList.push(Product);
        localStorage.setItem("myProducts", JSON.stringify(ProductList));
        displayProduct();
    }
}

function displayProduct() {
    var ters = "";
    for (var i = 0; i < ProductList.length; i++) {
        ters += "<tr><td>" + ProductList[i].productName + "</td>"
            + "<td>" + ProductList[i].productPrice + "</td>"
            + "<td>" + ProductList[i].productCateg + "</td>"
            + "<td>" + ProductList[i].productDesc + "</td>"
            + "<td><button onclick = 'deleteProduct(" + i + ")' class='btn btn-danger'>Delete</button></td>"
            + "<td><button onclick = 'editProduct(" + i + ")'class='btn btn-warning'>Edit</button></td></tr>"
    }
    document.getElementById("productShow").innerHTML = ters;
}

function resetForm() {
    for (i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function deleteProduct(index) {
    ProductList.splice(index, 1);
    localStorage.setItem("myProducts", JSON.stringify(ProductList));
    displayProduct();
}

function editProduct(i) {
    addButon.innerHTML = "Update Product";
    addButon.style.backgroundColor = "#f00"
    inputName.value = ProductList[i].productName;
    inputPrice.value = ProductList[i].productPrice;
    inputCategory.value = ProductList[i].productCateg;
    inputDesc.value = ProductList[i].productDesc;
    currentIndex = i;
}

function saveUpdate() {

    ProductList[currentIndex].productName = inputName.value;
    ProductList[currentIndex].productPrice = inputPrice.value;
    ProductList[currentIndex].productCateg = inputCategory.value;
    ProductList[currentIndex].productDesc = inputDesc.value;
    localStorage.setItem("myProducts", JSON.stringify(ProductList));
    displayProduct();
    addButon.innerHTML = "Add Product";
    addButon.style.backgroundColor = "#09c"
}

function searchAbout(chart) {
    var searchList = "";
    for (i = 0; i < ProductList.length; i++) {
        if (ProductList[i].productName.includes(chart.trim()) == true) {
            searchList += "<tr><td>"
                + ProductList[i].productName.replace(chart, "<span style = 'color:red'>" + chart + "</span>") + "</td>"
                + "<td>" + ProductList[i].productPrice + "</td>"
                + "<td>" + ProductList[i].productCateg + "</td>"
                + "<td>" + ProductList[i].productDesc + "</td>"
                + "<td><button onclick = 'deleteProduct(" + i + ")' class='btn btn-danger'>Delete</button></td>"
                + "<td><button onclick = 'editProduct(" + i + ")'class='btn btn-warning'>Edit</button></td></tr>";
        }
    }
    document.getElementById("productShow").innerHTML = searchList;
}

var Regex = /^[A-Z][a-zA-Z]{3,20}/;
function validateProductName() {
    if (Regex.test(inputName.value) == false) {
        inputName.classList.add("is-invalid");
        inputName.classList.remove("is-valid");
        return false;
    }
    else {
        inputName.classList.add("is-valid");
        inputName.classList.remove("is-invalid");
        return true;
    }
}

inputName.addEventListener("keyup", validateProductName)
