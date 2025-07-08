document.addEventListener("DOMContentLoaded", function () {
  const postsContainer = document.getElementById("postsContainer");

  const recruiterEmail = localStorage.getItem("recruiterEmail");

  if (!recruiterEmail) {
    postsContainer.innerHTML = "<p style='color:red;'>Error: Recruiter email not found. Please log in again.</p>";
    return;
  }

  fetch(`http://localhost:8080/recruiter/view?email=${encodeURIComponent(recruiterEmail)}`)
    .then(response => {
      if (response.status === 404) throw new Error("No jobs found.");
      if (!response.ok) throw new Error("Server error while fetching jobs.");
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
//        const jobId = job.id;
        card.innerHTML = `
          <div class="job-row">
            <h3 class="job-title">${job.jobTitle} <span style="font-weight:normal;">(${job.jobType})</span></h3>
            <button class="update-btn">Update</button>
          </div>
          <div class="job-row">
            <p><strong>Organization:</strong> ${job.orgName}</p>
            <button class="delete-btn">Delete</button>
          </div>
          <p><strong>Location:</strong> ${job.location}</p>
          <p><strong>Description:</strong> ${job.jobDescription}</p>
          <small><strong>Posted on:</strong> ${new Date(job.postDate).toLocaleDateString()}</small>
        `;

        const updateBtn = card.querySelector(".update-btn");
        const deleteBtn = card.querySelector(".delete-btn");

        updateBtn.addEventListener("click", () => handleUpdate(job));
        deleteBtn.addEventListener("click", () => handleDelete(job.id, card));

        postsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
      postsContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });

  // Update handler
  function handleUpdate(job) {
    // Example: redirect to update page with job ID in query
    window.location.href = `updatePost.html?id=${job.id}`;
  }

  // Delete handler
  function handleDelete(jobId, cardElement) {
    const confirmDelete = confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    fetch(`http://localhost:8080/recruiter/delete?id=${encodeURIComponent(jobId)}`, {
      method: "DELETE",
    })
      .then(response => {
        if (!response.ok) throw new Error("Failed to delete the job.");
        // Remove card from DOM
        cardElement.remove();
      })
      .catch(error => {
        alert("Error deleting job: " + error.message);
      });
  }
});
