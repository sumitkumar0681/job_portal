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
  const id = document.get

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
      if (page === "adminDashBoard" || page === "studentDashboard" || page === "recruiterDashboard") {
        // ✅ Save email and role in localStorage
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", role);

        // Optional: if you want recruiterEmail specifically used in view-posts.js
        if (page === "recruiterDashboard") {
          localStorage.setItem("recruiterEmail", email);
        }

        if (page === "studentDashboard") {
           localStorage.setItem("studentEmail", email);
        }

        window.location.href = `${page}.html`;
      } else {
        alert(page); // show error message from backend
      }
    })
    .catch(error => {
      alert("Login failed: " + error.message);
    });

  return false;
}
