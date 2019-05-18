const totalUsers = 12;
const userList = document.querySelector(".user-list");
let userModalId;

//create our list of users
function createUserList(photo, nameFirst, nameLast, email, city, id) {
  const li = document.createElement("div");
  li.setAttribute("id", id);
  li.classList.add("user");
  li.innerHTML = `<div class="user-photo"><img src="${photo}" alt=""/></div><div class="user-info"><div class="user-name">${nameFirst} ${nameLast}</div><div class="user-email email-wrap">${email}</div><div class="user-city">${city}</div></div>`;
  userList.appendChild(li);
}

//get JSON response from randomuser API
fetch(`https://randomuser.me/api/?results=${totalUsers}&nat=gb`)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    const results = myJson.results;
    //loop through objects
    for (i = 0; i < results.length; i++) {
      //console.log(results[i]);
      createUserList(
        results[i].picture.large,
        results[i].name.first,
        results[i].name.last,
        results[i].email,
        results[i].location.city,
        [i]
      );
    }
  });

//closest() polyfill for IE
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i,
      el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {}
    } while (i < 0 && (el = el.parentElement));
    return el;
  };
}

//get closest element with class .use and return it's ID
userList.addEventListener("click", event => {
  var ev = event.target;
  var r1 = ev.closest(".user");
  //using closest to get parent id: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
  //not supported in IE so will use polyfill
  userModalId = r1.id;
  updateModalUser(userModalId);
  toggleModal();
});

//modal box event listeners
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
function toggleModal() {
  modal.classList.toggle("show-modal");
}
closeButton.addEventListener("click", () => {
  toggleModal();
});

//modal controls
const modalControls = document.querySelector(".modal-controls");
const modalNext = modalControls.querySelector(".next");
const modalPrevious = modalControls.querySelector(".previous");

modalNext.addEventListener("click", () => {
  userModalId++;
  updateModalUser(userModalId);
});

modalPrevious.addEventListener("click", () => {
  userModalId--;
  updateModalUser(userModalId);
});

//update modal user
function updateModalUser(id) {
  document.querySelector(".modal-user").innerHTML = id;
}
