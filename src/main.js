// Post Like functionality
document.addEventListener('DOMContentLoaded', () => {
  // Handle post like button clicks
  const likeButtons = document.querySelectorAll('.post-action:nth-child(1)');
  likeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const icon = button.querySelector('i');
      const span = button.querySelector('span');

      if (icon.classList.contains('far')) {
        // Like the post
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#0a66c2';
        span.style.color = '#0a66c2';
        span.textContent = 'Liked';

        // Update the likes count in the post stats
        const postStats = button.closest('.feed-post').querySelector('.post-stats span');
        const currentStats = postStats.textContent;
        const likesMatch = currentStats.match(/(\d+) Likes/);
        if (likesMatch) {
          const currentLikes = parseInt(likesMatch[1]);
          const newLikes = currentLikes + 1;
          postStats.textContent = currentStats.replace(`${currentLikes} Likes`, `${newLikes} Likes`);
        }
      } else {
        // Unlike the post
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
        span.style.color = '';
        span.textContent = 'Like';

        // Update the likes count in the post stats
        const postStats = button.closest('.feed-post').querySelector('.post-stats span');
        const currentStats = postStats.textContent;
        const likesMatch = currentStats.match(/(\d+) Likes/);
        if (likesMatch) {
          const currentLikes = parseInt(likesMatch[1]);
          const newLikes = currentLikes - 1;
          postStats.textContent = currentStats.replace(`${currentLikes} Likes`, `${newLikes} Likes`);
        }
      }
    });
  });

  // Handle comment like button clicks
  const commentLikeButtons = document.querySelectorAll('.comment-action:nth-child(1)');
  commentLikeButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.style.color === 'rgb(10, 102, 194)') {
        button.style.color = '';
      } else {
        button.style.color = '#0a66c2';
      }
    });
  });

  // Handle comment input
  const commentInputs = document.querySelectorAll('.add-comment input');
  commentInputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && input.value.trim() !== '') {
        const commentSection = input.closest('.post-comments');
        const commentTemplate = `
          <div class="comment">
            <img src="src/assets/profile.jpeg" alt="Profile" class="comment-author-img">
            <div class="comment-content">
              <div class="comment-header">
                <h4>Rukesh Babu Gantla</h4>
                <span class="comment-time">Just now</span>
                <button class="more-button">
                  <i class="fas fa-ellipsis-h"></i>
                </button>
              </div>
              <p>${input.value}</p>
              <div class="comment-actions">
                <button class="comment-action">Like</button>
                <button class="comment-action">Reply</button>
              </div>
            </div>
          </div>
        `;

        // Insert the new comment before the add-comment div
        const addCommentDiv = input.closest('.add-comment');
        addCommentDiv.insertAdjacentHTML('beforebegin', commentTemplate);

        // Update the comments count in the post stats
        const feedPost = commentSection.closest('.feed-post');
        const postStats = feedPost.querySelector('.post-stats span');
        const currentStats = postStats.textContent;
        const commentsMatch = currentStats.match(/(\d+) Comments/);
        if (commentsMatch) {
          const currentComments = parseInt(commentsMatch[1]);
          const newComments = currentComments + 1;
          postStats.textContent = currentStats.replace(`${currentComments} Comments`, `${newComments} Comments`);
        }

        // Clear the input
        input.value = '';

        // Add event listener to the new like button
        const newLikeButton = commentSection.querySelector('.comment:last-of-type .comment-action:nth-child(1)');
        newLikeButton.addEventListener('click', () => {
          if (newLikeButton.style.color === 'rgb(10, 102, 194)') {
            newLikeButton.style.color = '';
          } else {
            newLikeButton.style.color = '#0a66c2';
          }
        });
      }
    });
  });

  // Handle follow buttons
  const followButtons = document.querySelectorAll('.follow-button, .follow-button-small');
  followButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('following')) {
        // Unfollow
        if (button.classList.contains('follow-button-small')) {
          button.innerHTML = '<i class="fas fa-plus"></i>';
        } else {
          button.innerHTML = '<i class="fas fa-plus"></i> Follow';
        }
        button.classList.remove('following');
        button.style.backgroundColor = '';
        button.style.color = '#0a66c2';
      } else {
        // Follow
        if (button.classList.contains('follow-button-small')) {
          button.innerHTML = '<i class="fas fa-check"></i>';
        } else {
          button.innerHTML = '<i class="fas fa-check"></i> Following';
        }
        button.classList.add('following');
        button.style.backgroundColor = '#0a66c2';
        button.style.color = '#ffffff';
      }
    });
  });

  // Handle post creation button
  const postButton = document.querySelector('.post-button');
  postButton.addEventListener('click', () => {
    alert('Create a new post functionality would be implemented here!');
  });

  // Handle search input
  const searchInput = document.querySelector('.search-container input');
  searchInput.addEventListener('focus', () => {
    searchInput.parentElement.style.border = '2px solid #0a66c2';
  });

  searchInput.addEventListener('blur', () => {
    searchInput.parentElement.style.border = '';
  });
});

// Simulate loading more posts when scrolling to the bottom
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    // This would typically be an AJAX call to load more posts
    // For demonstration, we'll just add a dummy post after a delay

    // Avoid multiple simultaneous calls
    if (window.isLoadingPosts) return;
    window.isLoadingPosts = true;

    setTimeout(() => {
      const middleContainer = document.querySelector('.middle-container');

      // Clone the last post
      const lastPost = document.querySelector('.feed-post:last-child');
      const newPost = lastPost.cloneNode(true);

      // Modify some content to make it look different
      const postContent = newPost.querySelector('.post-content p');
      postContent.textContent = 'This is a newly loaded post when you scrolled to the bottom of the page. LinkedIn uses infinite scrolling to load more content as you scroll down.';

      // Add it to the DOM
      middleContainer.appendChild(newPost);

      // Allow more posts to be loaded again
      window.isLoadingPosts = false;
    }, 1000);
  }
});
