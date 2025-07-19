document.addEventListener("DOMContentLoaded", () => {
  const userCards = document.getElementById("userCards");

  fetch("http://localhost:8080/admin/viewUsers")
    .then(res => res.json())
    .then(users => {
      if (!Array.isArray(users) || users.length === 0) {
        userCards.innerHTML = "<p>No users found.</p>";
        return;
      }

      const filteredUsers = users.filter(user => user.role !== 'admin');

      if (filteredUsers.length === 0) {
        userCards.innerHTML = "<p>No non-admin users found.</p>";
        return;
      }

      filteredUsers.forEach(user => {
        const card = document.createElement("div");
        card.className = "user-card";

        // Determine status based on user.block boolean
        const currentStatus = user.block ? 'block' : 'active';

        card.innerHTML = `
          <div class="user-info">
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Role:</strong> ${user.role}</p>
          </div>
          <div class="status-control">
            <label for="status-${user.id}">Account Status:</label>
            <select name="status" data-email="${user.email}" id="status-${user.id}">
              <option value="active" ${currentStatus === 'active' ? 'selected' : ''}>Active</option>
              <option value="block" ${currentStatus === 'block' ? 'selected' : ''}>Block</option>
            </select>
            <button class="update-btn" data-userid="${user.id}" data-email="${user.email}">Update</button>
          </div>
        `;

        userCards.appendChild(card);
      });

      const updateButtons = document.querySelectorAll(".update-btn");
      updateButtons.forEach(button => {
        button.addEventListener("click", () => {
          const email = button.dataset.email;
          const select = document.getElementById(`status-${button.dataset.userid}`);
          const newStatus = select.value;

          fetch("http://localhost:8080/admin/userStat/email", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, status: newStatus })
          })
            .then(res => {
              if (res.ok) {
                alert(`Status updated to '${newStatus}' for ${email}.`);
                location.reload(); // ✅ Refresh page to reflect updated status
              } else {
                alert(`Failed to update status for ${email}.`);
              }
            })
            .catch(err => {
              console.error("Error updating status:", err);
              alert("An error occurred while updating status.");
            });
        });
      });
    })
    .catch(err => {
      console.error("Failed to load users:", err);
      userCards.innerHTML = "<p>Error loading users.</p>";
    });
});
