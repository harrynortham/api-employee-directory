const userList = document.querySelector(".user-list");
let userId;
let userArray = [];

//create our list of users
function createUserList(photo, nameFirst, nameLast, email, city, id) {
  const li = document.createElement("div");
  li.setAttribute("id", id);
  li.classList.add("user");
  li.innerHTML = `<div class="user-photo"><img src="${photo}" alt=""/></div><div class="user-info"><div class="user-name">${nameFirst} ${nameLast}</div><div class="user-email email-wrap">${email}</div><div class="user-city">${city}</div></div>`;
  userList.appendChild(li);
}

//get JSON response from randomuser API + create new array
fetch("https://randomuser.me/api/?results=12&nat=gb")
  .then(function(response) {
    return response.json();
  })
  .then(function(theJson) {
    const results = theJson.results;
    console.log(results);
    for (i = 0; i < results.length; i++) {
      const picture = results[i].picture.large;
      const firstName = results[i].name.first;
      const lastName = results[i].name.last;
      const email = results[i].email;
      const street = results[i].location.street;
      const city = results[i].location.city;
      const state = results[i].location.state;
      const postcode = results[i].location.postcode;
      const cell = results[i].cell;
      const dob = results[i].dob.date;
      const id = [i];

      let user = {
        picture: picture,
        firstName: firstName,
        lastName: lastName,
        email: email,
        city: city,
        id: id,
        cell: cell,
        dob: dob,
        street: street,
        state: state,
        postcode: postcode
      };

      userArray.push(user);

      createUserList(picture, firstName, lastName, email, city, id);
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
  var div = ev.closest(".user");
  //using closest to get parent id: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
  //not supported in IE so will use polyfill
  userId = parseInt(div.id);
  updateModalUser(userId);
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
  if (userId < userArray.length - 1) {
    userId++;
  }
  updateModalUser(userId);
});

modalPrevious.addEventListener("click", () => {
  if (userId !== 0) {
    userId--;
  }
  updateModalUser(userId);
});

//update modal user
function updateModalUser(id) {
  for (i = 0; i < userArray.length; i++) {
    if (parseInt(userArray[i].id) === id) {
      document.querySelector(
        ".modal-user"
      ).innerHTML = `<div class="modal-user-photo"><img src="${
        userArray[i].picture
      }" alt="" /></div> <div class="modal-user-name">${
        userArray[i].firstName
      } ${userArray[i].lastName}</div> <div class="modal-user-email">${
        userArray[i].email
      }</div> <div class="modal-user-city">${
        userArray[i].city
      }</div><hr><div class="modal-user-phone">${
        userArray[i].cell
      }</div> <div class="modal-user-address">${userArray[i].street} ${
        userArray[i].city
      } ${userArray[i].state} ${
        userArray[i].postcode
      }</div> <div class="modal-user-dob">Birthday ${userArray[i].dob}</div>`;
    }
  }
}
