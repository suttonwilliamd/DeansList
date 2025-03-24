document.addEventListener("DOMContentLoaded", function () {
  let allChannels = [];
  let tagButtons = [];

  // Fetch channels data from channels.json
  fetch("channels.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      allChannels = data;
      createTagButtons();
      displayChannels(allChannels);
    })
    .catch((error) => {
      console.error("Error loading channels data:", error);
      document.getElementById("channels").innerHTML = `
        <div class="text-red-500 text-center p-4">
          Error loading channels. Please try again later.
        </div>
      `;
    });

  // Create tag buttons dynamically based on channel tags
  function createTagButtons() {
    const container = document.getElementById("tag-filters");
    
    // Get all unique tags
    const allTags = [...new Set(allChannels.flatMap(channel => channel.tags))];
    
    // Create reset button (keep existing one)
    const resetBtn = document.getElementById("reset-filters");
    
    // Clear existing buttons (except reset)
    container.innerHTML = '';
    container.appendChild(resetBtn);
    
    // Create new tag buttons
    allTags.forEach(tag => {
      const button = document.createElement("button");
      button.className = "tag-btn bg-blue-500 text-white px-4 py-2 rounded";
      button.textContent = tag;
      button.dataset.tag = tag;
      button.setAttribute("aria-pressed", "false");
      container.appendChild(button);
    });

    // Re-initialize tag button listeners
    initializeTagButtons();
  }

  // Initialize tag button event listeners
  function initializeTagButtons() {
    tagButtons = document.querySelectorAll(".tag-btn");
    
    tagButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const isActive = button.classList.toggle("active");
        button.classList.toggle("bg-blue-500", !isActive);
        button.classList.toggle("bg-blue-700", isActive);
        button.setAttribute("aria-pressed", isActive.toString());
        filterChannels();
      });
    });
  }

  // Filter channels based on selected tags
  function filterChannels() {
    const selectedTags = Array.from(tagButtons)
      .filter(btn => btn.classList.contains("active"))
      .map(btn => btn.dataset.tag.toLowerCase().trim());

    const filtered = selectedTags.length === 0 
      ? allChannels 
      : allChannels.filter(channel => {
          const channelTags = channel.tags.map(t => t.toLowerCase().trim());
          return selectedTags.every(tag => channelTags.includes(tag));
        });

    displayChannels(filtered);
  }

  // Display channels in the grid
  function displayChannels(channels) {
    const container = document.getElementById("channels");
    
    if (channels.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center text-gray-500 p-4">
          No channels match the selected filters.
        </div>
      `;
      return;
    }

    container.innerHTML = channels.map(channel => `
      <div class="border p-4 rounded shadow bg-white hover:shadow-md transition-shadow">
        <h3 class="text-lg font-bold mb-2">${channel.name}</h3>
        <p class="mb-2 text-gray-600">${channel.description}</p>
        <a class="inline-block text-blue-600 hover:text-blue-800 hover:underline font-medium"
           href="${channel.url}" 
           target="_blank" 
           rel="noopener noreferrer">
          Visit Channel →
        </a>
        <div class="mt-3 flex flex-wrap gap-2">
          ${channel.tags.map(tag => `
            <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
              ${tag}
            </span>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  // Reset filters
  document.getElementById("reset-filters").addEventListener("click", () => {
    tagButtons.forEach(btn => {
      btn.classList.remove("active", "bg-blue-700");
      btn.classList.add("bg-blue-500");
      btn.setAttribute("aria-pressed", "false");
    });
    displayChannels(allChannels);
  });
});
