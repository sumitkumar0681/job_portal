document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("jobCards");

  fetch("http://localhost:8080/admin/viewjob")
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch job data");
      return res.json();
    })
    .then(jobs => {
      if (jobs.length === 0) {
        container.innerHTML = "<p>No job posts found.</p>";
        return;
      }
    console.log(jobs);
      jobs.forEach(job => {
        const card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `
          <h3>${job.orgName}</h3>
          <p><span class="label">Job Title:</span> ${job.jobTitle}</p>
          <p><span class="label">Email:</span> ${job.email}</p>
          <p><span class="label">Type:</span> ${job.jobType}</p>
          <p><span class="label">Location:</span> ${job.location}</p>
          <p><span class="label">Description:</span> ${job.jobDescription}</p>
          <div class="footer">Posted on: ${new Date(job.postDate).toLocaleDateString()}</div>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>Error loading job posts.</p>";
    });
});
