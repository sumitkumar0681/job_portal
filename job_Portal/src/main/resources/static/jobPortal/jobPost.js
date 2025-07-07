document.getElementById("jobForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    orgName: document.getElementById("orgName").value,
    email: document.getElementById("email").value,  // ✅ added email
    jobTitle: document.getElementById("jobTitle").value,
    jobType: document.getElementById("jobType").value,
    jobDescription: document.getElementById("jobDescription").value,
    location: document.getElementById("location").value,
    postDate: document.getElementById("postDate").value,
  };

  console.log("Job Posted:", formData);

  fetch("http://localhost:8080/recruiter/addJob", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to post job");
      }
      return response.json();
    })
    .then(data => {
      alert("Job Posted Successfully!");
      document.getElementById("jobForm").reset();
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Failed to post job. Please try again.");
    });
});
