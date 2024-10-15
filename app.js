const tableBody = document.querySelector("#userTable tbody");

function fetchUsers(page) {
    tableBody.innerHTML = "";
    fetch(`https://reqres.in/api/users?delay=3&page=${page}`)
        .then(response => response.json())
        .then(data => {
            spinner.style.display = "none";
            updateTable(data.data);
        })
        .catch(error => {
            spinner.style.display = "none";
            showError("Error al cargar los usuarios");
            console.error(error);
        });
}


function updateTable(users) {
    users.forEach(user => {
        const row = `
        <tr>
          <td>${user.id}</td>
          <td>${user.first_name}</td>
          <td>${user.last_name}</td>
          <td>${user.email}</td>
          <td><img src="${user.avatar}" alt="${user.first_name} ${user.last_name}" style="width: 50px; height: 50px; border-radius: 50px"></td>
        </tr>
      `;
        tableBody.innerHTML += row;
    });
}

function showError(message) {
    const errorMessage = document.createElement("div");
    errorMessage.className = "alert alert-danger";
    errorMessage.innerText = message;
    document.body.appendChild(errorMessage);
}


function setupLoadUsersButton() {
    document.getElementById('loadUsers').addEventListener("click", () => {
        spinner.style.display = "block";
        fetchUsers(1);
    });
}


function handlePageClick(page) {
    spinner.style.display = "block"; 
    fetchUsers(page);
}
  

function setupPagination() {
    document.getElementById('page1').addEventListener("click", () => {
      handlePageClick(1);
    });
  
    document.getElementById('page2').addEventListener("click", () => {
      handlePageClick(2);
    });
  }



setupPagination();
setupLoadUsersButton();