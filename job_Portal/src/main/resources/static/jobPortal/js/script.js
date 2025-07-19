function handleLogin() {
  alert("Redirecting to login page...");
  window.location.href = "login.html";
}

function handleRegister() {
  alert("Redirecting to registration page...");
  window.location.href = "signup.html";
}

function handleAbout() {
  alert("Redirecting to About Us...");
  window.location.href = "aboutUs.html"; // make sure about.html exists
}
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/student/view") // Replace with your endpoint
    .then(res => res.json())
    .then(jobs => {
      const container = document.getElementById("jobCardsContainer");
      jobs.forEach(job => {
        const card = document.createElement("div");
        card.className = "job-card";
        card.innerHTML = `
          <div class="job-info">
              <h3>${job.jobTitle} (${job.jobType})</h3>
              <p><strong>Organization:</strong> ${job.orgName}</p>
              <p><strong>Location:</strong> ${job.location}</p>
              <p><strong>Description:</strong> ${job.jobDescription}</p>
               <small><strong>Posted:</strong> ${new Date(job.postDate).toLocaleDateString()}</small>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error("Error fetching job posts:", err));
});
