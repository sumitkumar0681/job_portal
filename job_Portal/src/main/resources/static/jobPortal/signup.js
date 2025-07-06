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

function validateForm() {
  const name = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const role = document.getElementById("role").value;

  if (!name || !email || !password || !confirmPassword || !role) {
    alert("All fields are required.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  const userData = {
    name,
    email,
    password,
    confirmPassword,
    role
  };

  fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text); });
      }
      return response.text();
    })
    .then(message => {
      alert(message);
      window.location.href = "login.html";
    })
    .catch(error => {
      alert("Error: " + error.message);
    });

  return false;
}