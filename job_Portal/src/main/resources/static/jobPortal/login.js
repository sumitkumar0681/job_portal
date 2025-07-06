function togglePassword(fieldId, toggleIcon) {
  const field = document.getElementById(fieldId);
  if (field.type === "password") {
    field.type = "text";
    toggleIcon.textContent = "👁️";
  } else {
    field.type = "password";
    toggleIcon.textContent = "🙈";
  }
}

function validateLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (!email || !password || !role) {
    alert("All fields are required.");
    return false;
  }

  const loginData = {
    email: email,
    password: password,
    role: role
  };

  fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Login request failed.");
      }
      return response.text();
    })
    .then(page => {
      if (page === "adminDashBoard") {
        window.location.href = "adminDashboard.html";
      } else if (page === "studentDashboard") {
        window.location.href = "studentDashboard.html";
      } else if (page === "recruiterDashboard") {
        window.location.href = "recruiterDashboard.html";
      } else {
        alert(page);
      }
    })
    .catch(error => {
      alert("Login failed: " + error.message);
    });

  return false;
}

