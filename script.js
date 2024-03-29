document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('downloadForm');
    const videoUrlInput = document.getElementById('videoUrl');
    const downloadResult = document.getElementById('downloadResult');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const videoUrl = videoUrlInput.value.trim();

        if (!videoUrl) {
            downloadResult.innerText = "Please enter a valid TikTok video URL.";
            return;
        }

        try {
            // Send a POST request to the backend to download the video
            const response = await fetch('/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ videoUrl })
            });

            const data = await response.json();

            if (data.success) {
                downloadResult.innerHTML = `<a href="${data.video}" download>Download Video</a>`;
            } else {
                downloadResult.innerText = "Failed to download video. Please try again later.";
            }
        } catch (error) {
            console.error('Error:', error);
            downloadResult.innerText = "An unexpected error occurred. Please try again later.";
        }
    });
});
