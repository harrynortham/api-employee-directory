const userList = document.querySelector(".user-list");

function createUser(photo, nameFirst, nameLast, email, city) {
  const li = document.createElement("div");
  li.classList.add("user");
  li.innerHTML = `<div class="user-photo"><img src="${photo}" alt=""/></div><div class="user-info"><div class="user-name">${nameFirst} ${nameLast}</div><div class="user-email email-wrap">${email}</div><div class="user-city">${city}</div></div>`;
  userList.appendChild(li);
}

//get JSON response
fetch("https://randomuser.me/api/?results=12&nat=gb")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    const results = myJson.results;
    //loop through objects
    for (i = 0; i < results.length; i++) {
      console.log(results[i]);
      createUser(
        results[i].picture.large,
        results[i].name.first,
        results[i].name.last,
        results[i].email,
        results[i].location.city
      );
    }
  });

//Show popup when user clicked
document.querySelector(".user").addEventListener("click", () => {
  alert("hello");
});
