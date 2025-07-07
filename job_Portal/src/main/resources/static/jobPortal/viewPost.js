document.addEventListener("DOMContentLoaded", function () {
  const postsContainer = document.getElementById("postsContainer");

  // Get recruiter email from localStorage (set during login)
  const recruiterEmail = localStorage.getItem("recruiterEmail");

  if (!recruiterEmail) {
    postsContainer.innerHTML = "<p style='color:red;'>Error: Recruiter email not found. Please log in again.</p>";
    return;
  }

  fetch(`http://localhost:8080/recruiter/view?email=${encodeURIComponent(recruiterEmail)}`)
    .then(response => {
      if (response.status === 404) {
        throw new Error("No jobs found.");
      }
      if (!response.ok) {
        throw new Error("Server error while fetching jobs.");
      }
      return response.json();
    })
    .then(jobs => {
      if (!Array.isArray(jobs) || jobs.length === 0) {
        postsContainer.innerHTML = "<p>No jobs posted yet.</p>";
        return;
      }

      jobs.forEach(job => {
        const card = document.createElement("div");
        card.className = "job-card";
        card.innerHTML = `
          <h3>${job.jobTitle} <span style="font-weight:normal;">(${job.jobType})</span></h3>
          <p><strong>Organization:</strong> ${job.orgName}</p>
          <p><strong>Location:</strong> ${job.location}</p>
          <p><strong>Description:</strong> ${job.jobDescription}</p>
          <small><strong>Posted on:</strong> ${new Date(job.postDate).toLocaleDateString()}</small>
        `;
        postsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
      postsContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
});

