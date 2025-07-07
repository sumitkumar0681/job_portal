document.addEventListener("DOMContentLoaded", () => {
  const jobsContainer = document.getElementById("jobsContainer");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  // Load all jobs initially
  fetchJobs();

  // Form submission for search
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const keyword = searchInput.value.trim();

    if (keyword) {
      fetch(`http://localhost:8080/student/view/search?keyword=${encodeURIComponent(keyword)}`)
        .then(res => {
          if (!res.ok) throw new Error("Search failed");
          return res.json();
        })
        .then(jobs => renderJobs(jobs))
        .catch(err => {
          jobsContainer.innerHTML = `<p>Error: ${err.message}</p>`;
        });
    } else {
      fetchJobs(); // fallback to all jobs
    }
  });

  // Fetch all jobs
  function fetchJobs() {
    fetch("http://localhost:8080/student/view")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch jobs");
        return res.json();
      })
      .then(jobs => renderJobs(jobs))
      .catch(err => {
        jobsContainer.innerHTML = `<p>Error loading jobs: ${err.message}</p>`;
      });
  }

  // Render jobs in container
  function renderJobs(jobs) {
    if (!jobs.length) {
      jobsContainer.innerHTML = "<p>No jobs found.</p>";
      return;
    }

    jobsContainer.innerHTML = "";
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
        <button class="apply-btn">Apply</button>
      `;
      jobsContainer.appendChild(card);
    });
  }
});
