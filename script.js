document.addEventListener('DOMContentLoaded', function() {
    const interestBubbles = document.querySelectorAll('.interest-bubble');
    const contentArea = document.getElementById('content-area');

    interestBubbles.forEach(bubble => {
        bubble.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            const category = this.getAttribute('data-category');
            loadCategoryContent(category);
        });
    });

    function loadCategoryContent(category) {
        // Define your category content here (replace with your actual content)
        let content = '';

        switch (category) {
            case 'Opinion Pieces':
                content = `<h2>Opinion Pieces</h2>
                           <ul>
                               <li><a href="https://www.youtube.com/c/Hbomberguy" target="_blank">Hbomberguy</a> - In-depth video essays critiquing media and culture.</li>
                           </ul>`;
                break;
            case 'Software':
                content = `<h2>Software</h2>
                           <ul>
                               <li><a href="https://www.youtube.com/c/t3dotgg" target="_blank">t3dotgg Theo</a> - Insights on web development and the T3 stack.</li>
                               <li><a href="https://www.youtube.com/c/ThePrimeagen" target="_blank">ThePrimeagen</a> - Programming tutorials focusing on Vim and TypeScript.</li>
                               <li><a href="https://www.youtube.com/c/FunFunFunction" target="_blank">Funfunfunction MPJ</a> - Engaging JavaScript and functional programming content.</li>
                               <li><a href="https://www.youtube.com/c/Methmethmethod" target="_blank">Methmethmethod</a> - JavaScript and web development tutorials.</li>
                               <li><a href="https://www.youtube.com/c/TheCodingTrain" target="_blank">TheCodingTrain Daniel Shiffman</a> - Creative coding tutorials with p5.js.</li>
                           </ul>`;
                break;
            case "Dr. Petter's Software":
              content = `<h2>Dr. Petter's Software</h2>
              <p>Dr. Petter is a talented developer known for creating tools that enhance game development and sound design. Here are some of his notable contributions:</p>
              <ul>
                  <li>
                      <a href="https://drpetter.se/project/musagi/" target="_blank">Musagi</a> - A music composition tool for creating chiptune music with a tracker-style interface. Perfect for game developers looking to add unique soundtracks to their projects.
                  </li>
                  <li>
                      <a href="https://drpetter.se/project/sfxr/" target="_blank">SFXR</a> - A simple sound effects generator that allows users to create retro-style sound effects quickly and easily. Ideal for indie game developers.
                  </li>
                  <li>
                      <a href="https://drpetter.se/project/sfxtreme/" target="_blank">SFXTreme</a> - An advanced version of SFXR that offers more features and customization options for sound effect generation.
                  </li>
                  <li>
                      <a href="https://drpetter.se/project/sculptris/" target="_blank">Sculptris</a> - A digital sculpting tool that allows users to create 3D models in an intuitive and easy-to-use environment, making it accessible for artists and game developers alike.
                  </li>
              </ul>`;
              break;
            case 'Crypto':
                content = `<h2>Crypto</h2>
                           <ul>
                               <li><a href="https://www.youtube.com/results?search_query=What+is+Bitcoin" target="_blank">What is Bitcoin?</a> - Overview of Bitcoin and its significance.</li>
                               <li><a href="https://www.youtube.com/results?search_query=What+is+Ethereum" target="_blank">What is Ethereum?</a> - Introduction to Ethereum and smart contracts.</li>
                               <li><a href="https://www.youtube.com/results?search_query=SHIB" target="_blank">SHIB</a> - Information about the Shiba Inu cryptocurrency.</li>
                               <li><a href="https://www.youtube.com/results?search_query=Vitalik+Buterin" target="_blank">Vitalik Buterin</a> - Insights from the co-founder of Ethereum.</li>
                           </ul>`;
                break;
            case 'Programming':
                content = `<h2>Programming</h2>
                           <ul>
                               <li><a href="https://www.youtube.com/c/ChiliTomatoNoodle" target="_blank">ChiliTomatoNoodle</a> - Programming tutorials and insights.</li>
                               <li><a href="https://www.youtube.com/c/ThinMatrix" target="_blank">ThinMatrix</a> - Game development tutorials using Java.</li>
                               <li><a href="https://www.youtube.com/c/DerekBanas" target="_blank">DerekBanas</a> - Comprehensive programming tutorials.</li>
                           </ul>`;
                break;
            case 'Game Dev':
                content = `<h2>Game Dev</h2>
                           <ul>
                               <li><a href="https://www.youtube.com/results?search_query=Foundation+Game+Design+with+HTML5+and+JavaScript+Rex+van_der_Spuy" target="_blank">Foundation Game Design with HTML5 and JavaScript</a> - Course by Rex van der Spuy.</li>
                           </ul>`;
                break;
            case 'Topics':
                content = `<h2>Topics</h2>
                           <ul>
                               <li><a href="https://www.youtube.com/results?search_query=Creepypasta" target="_blank">Creepypasta</a> - Explore the world of creepypasta stories.</li>
                               <li><a href="https://www.youtube.com/results?search_query=True+Crime" target="_blank">True Crime</a> - Delve into true crime stories and documentaries.</li>
                           </ul>`;
                break;
            default:
                content = `<p>Content for ${category} is coming soon!</p>`;
        }

        contentArea.innerHTML = content;
    }
});
