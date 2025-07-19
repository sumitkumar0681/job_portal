document.addEventListener("DOMContentLoaded", function () {
  const postDateEl = document.getElementById("postDate");
  const today = new Date().toISOString().split("T")[0];
  postDateEl.value = today; // ✅ Set post date when page loads

  document.getElementById("jobForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      orgName: document.getElementById("orgName").value,
      email: document.getElementById("email").value,
      jobTitle: document.getElementById("jobTitle").value,
      jobType: document.getElementById("jobType").value,
      jobDescription: document.getElementById("jobDescription").value,
      location: document.getElementById("location").value,
      postDate: postDateEl.value, // ✅ now it has correct value
    };

    fetch("http://localhost:8080/recruiter/addJob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to post job");
        return response.json();
      })
      .then((data) => {
        alert("Job Posted Successfully!");
        localStorage.setItem("orgName", formData.orgName);
        document.getElementById("jobForm").reset();
        postDateEl.value = today; // reassign postDate after reset if needed
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to post job. Please try again.");
      });
  });
});
