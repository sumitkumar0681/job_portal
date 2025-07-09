document.addEventListener("DOMContentLoaded", () => {
  const jobId = new URLSearchParams(window.location.search).get("id");
  const form = document.getElementById("updateForm");
  const message = document.getElementById("message");

  if (!jobId) {
    message.textContent = "Job ID not found in URL.";
    return;
  }

  fetch(`http://localhost:8080/recruiter/view/id?id=${jobId}`)
    .then(res => {
      if (!res.ok) throw new Error("Job not found.");
      return res.json();
    })
    .then(job => {
      document.getElementById("jobId").value = job.id;
      document.getElementById("orgName").value = job.orgName;
      document.getElementById("email").value = job.email;
      document.getElementById("jobTitle").value = job.jobTitle;
      document.getElementById("jobType").value = job.jobType;
      document.getElementById("location").value = job.location;
      document.getElementById("jobDescription").value = job.jobDescription;
      document.getElementById("postDate").value = job.postDate;
    })
    .catch(err => {
      message.textContent = "Error: " + err.message;
    });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const updatedJob = {
      id: document.getElementById("jobId").value,
      orgName: document.getElementById("orgName").value,
      email: document.getElementById("email").value,
      jobTitle: document.getElementById("jobTitle").value,
      jobType: document.getElementById("jobType").value,
      location: document.getElementById("location").value,
      jobDescription: document.getElementById("jobDescription").value,
      postDate: document.getElementById("postDate").value,
    };

    fetch("http://localhost:8080/recruiter/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedJob)
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to update job post.");
      return response.json();
    })
    .then(data => {
      message.style.color = "green";
      message.textContent = "Post updated successfully!";
    })
    .catch(err => {
      message.style.color = "red";
      message.textContent = "Error: " + err.message;
    });
  });
});
