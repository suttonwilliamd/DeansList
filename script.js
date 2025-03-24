document.addEventListener("DOMContentLoaded", function () {
  let allChannels = [];
  let tagButtons = [];
  let activeTags = new Set();

  // Fetch channels data
  fetch("channels.json")
    .then(response => response.json())
    .then(data => {
      allChannels = data;
      createTagButtons();
      displayChannels(allChannels);
    })
    .catch(error => showError());

  // Create dynamic tag buttons
  function createTagButtons() {
    const container = document.getElementById("tag-filters");
    const allTags = [...new Set(allChannels.flatMap(c => c.tags))];
    
    container.innerHTML = '';
    container.appendChild(createResetButton());

    allTags.forEach(tag => {
      const button = document.createElement("button");
      button.className = "tag-btn bg-blue-500 text-white px-4 py-2 rounded-lg transition-all";
      button.textContent = tag;
      button.dataset.tag = tag;
      button.addEventListener("click", () => toggleTag(tag));
      container.appendChild(button);
    });

    tagButtons = document.querySelectorAll(".tag-btn");
  }

  // Toggle tag filter
  function toggleTag(tag) {
    const button = [...tagButtons].find(b => b.dataset.tag === tag);
    button.classList.toggle("active");
    button.classList.toggle("bg-blue-700");
    
    if (activeTags.has(tag)) {
      activeTags.delete(tag);
    } else {
      activeTags.add(tag);
    }
    
    updateResults();
  }

  // Update filtered results
  function updateResults() {
    const filtered = allChannels
      .map(channel => ({
        ...channel,
        matchScore: calculateMatchScore(channel.tags),
        matchPercent: calculateMatchPercent(channel.tags)
      }))
      .filter(channel => activeTags.size === 0 || channel.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore || a.name.localeCompare(b.name));

    displayChannels(filtered);
  }

  // Calculate matching metrics
  function calculateMatchScore(channelTags) {
    return [...activeTags].filter(tag => channelTags.includes(tag)).length;
  }

  function calculateMatchPercent(channelTags) {
    if (activeTags.size === 0) return 100;
    const matches = [...activeTags].filter(tag => channelTags.includes(tag)).length;
    return Math.round((matches / activeTags.size) * 100);
  }

  // Display channels
  function displayChannels(channels) {
    const container = document.getElementById("channels");
    container.innerHTML = channels.map(channel => `
      <div class="relative border p-4 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all">
        ${activeTags.size > 0 ? `
          <div class="absolute top-2 right-2 flex items-center gap-1">
            <span class="px-2 py-1 text-xs font-bold bg-blue-100 text-blue-800 rounded-full">
              ${channel.matchScore} match${channel.matchScore !== 1 ? 'es' : ''}
            </span>
            <div class="h-2 w-16 bg-gray-200 rounded-full">
              <div class="h-full bg-blue-500 rounded-full transition-all" 
                   style="width: ${channel.matchPercent}%"></div>
            </div>
          </div>
        ` : ''}
        
        <h3 class="text-lg font-bold mb-2 pr-12">${channel.name}</h3>
        <p class="mb-3 text-gray-600">${channel.description}</p>
        <div class="flex flex-wrap gap-2 items-center">
          <a href="${channel.url}" 
             target="_blank" 
             rel="noopener noreferrer"
             class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Visit Channel →
          </a>
          <div class="flex flex-wrap gap-1">
            ${channel.tags.map(tag => `
              <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                ${tag}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // Reset filters
  function createResetButton() {
    const button = document.createElement("button");
    button.id = "reset-filters";
    button.className = "bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded-lg transition-colors";
    button.innerHTML = '<i class="fas fa-redo"></i>';
    button.addEventListener("click", () => {
      activeTags.clear();
      tagButtons.forEach(b => {
        b.classList.remove("active", "bg-blue-700");
        b.classList.add("bg-blue-500");
      });
      updateResults();
    });
    return button;
  }

  // Error handling
  function showError() {
    document.getElementById("channels").innerHTML = `
      <div class="col-span-full text-center p-6 bg-red-50 text-red-700 rounded-xl">
        <i class="fas fa-exclamation-triangle mb-2 text-2xl"></i>
        <p>Failed to load channels. Please check your internet connection.</p>
      </div>
    `;
  }
});
