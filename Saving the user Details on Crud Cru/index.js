// Write your code below:
//https://crudcrud.com/api/5ce0305758e14ec0b3a3dd4efb6e748d

let arr = {};
let fullList = document.getElementById("list");
let resourceArr = [];
window.addEventListener("DOMContentLoaded",displayLocalStorage())
async function displayLocalStorage() {

  await axios
    .get("https://crudcrud.com/api/5ce0305758e14ec0b3a3dd4efb6e748d/usrInfo")
    .then((res) => {
      resourceArr = res.data;
    });

  resourceArr.forEach((itemsObj)=>{
    let newLi = document.createElement("li");
    // newLi.className="list-group-item container text-right"
    newLi.classList.add("list-group-item", "container");
    newLi.innerHTML =
      `<div style="display:none;">${itemsObj["_id"]}</div>${itemsObj["expenceAmount"]}-${itemsObj["description"]}-${itemsObj["category"]}` +
      '&nbsp&nbsp<div class="btn-group text-right"><button  class=" delete-btn btn btn-danger" type="button" ">Delete Expense</button>' +
      '<button  class="edit-btn btn btn-primary" type="button" ">Edit Expense</button></div>';
    newLi.setAttribute("onclick", "deleter(event);editer(event);");

    // console.log(newLi, fullList);
    fullList.appendChild(newLi);
  })

}

// displayLocalStorage();

async function handleFormSubmit(event) {
  event.preventDefault();
  let tempObj={}
  let expenceAmount = document.getElementById("expenceAmount").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;
  if (category == "--select--") return false;

  let data = JSON.stringify({
    expenceAmount: expenceAmount,
    category: category,
    description: description,
  });

  let config = {
    method: "post",
    url: "https://crudcrud.com/api/5ce0305758e14ec0b3a3dd4efb6e748d/usrInfo",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios(config)
    .then((res) => tempObj=res.data)
    .catch((err) => console.log("error:", err));

  let newLi = document.createElement("li");
  newLi.className = "list-group-item";
  newLi.innerHTML =
    `<div style="display:none;">${tempObj["_id"]}</div>${expenceAmount}-${description}-${category}` +
    '&nbsp&nbsp<div class="btn-group"><button  class="delete-btn btn btn-danger" type="button" ">Delete Expense</button>' +
    '<button  class="edit-btn btn btn-primary" type="button" ">Edit Expense</button></div>';
  newLi.setAttribute("onclick", "deleter(event);editer(event);");

  // console.log(newLi,fullList)
  fullList.appendChild(newLi);
  // console.log(expenceAmount,description,category)


  // console.log(arr)

}

async function deleter(event) {
  event.preventDefault();
  if (event.target.classList.contains("delete-btn")) {
    const usrDetails = event.target.parentElement.parentElement;
    const id =
      event.target.parentElement.parentElement.firstElementChild.textContent;
    console.log("|", usrDetails, id);
    await axios.delete("https://crudcrud.com/api/5ce0305758e14ec0b3a3dd4efb6e748d/usrInfo/"+id)
    fullList.removeChild(usrDetails);
  }
}

async function editer(event) {
  event.preventDefault();
  if (event.target.classList.contains("edit-btn")) {
    const usrDetails = event.target.parentElement.parentElement;
    console.log(usrDetails);
    const id =
      event.target.parentElement.parentElement.firstElementChild.textContent;
    let usrDetailsArr =
      usrDetails.firstChild.nextSibling.textContent.split("-");
    console.log(usrDetailsArr);
    // let usrDetailsArr=usrDetails.
    await axios.delete("https://crudcrud.com/api/5ce0305758e14ec0b3a3dd4efb6e748d/usrInfo/"+id)
    fullList.removeChild(usrDetails);

    document.getElementById("expenceAmount").value = usrDetailsArr[0];
    document.getElementById("description").value = usrDetailsArr[1];
    document.getElementById("list").value = usrDetailsArr[2];
  }
}
