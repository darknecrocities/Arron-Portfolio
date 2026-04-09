/**
 * Blogs App Logic
 * Handles dynamic population of the blog section and modal interaction
 */

function initBlogsApp() {
  const blogList = document.querySelector('.blog-list');
  const modalContainer = document.querySelector('#blog-modal');
  const modalCloseBtn = document.querySelector('#blog-modal-close');
  const modalOverlay = document.querySelector('#blog-overlay');
  
  const modalImg = document.querySelector('#blog-modal-img');
  const modalTitle = document.querySelector('#blog-modal-title');
  const modalCategory = document.querySelector('#blog-modal-category');
  const modalDate = document.querySelector('#blog-modal-date');
  const modalText = document.querySelector('#blog-modal-text');
  const modalLink = document.querySelector('#blog-modal-link');

  if (!blogList || !modalContainer) return;

  if (!window.BLOGS_DATA) {
    console.warn('Blog data not found. Retrying in 1s...');
    setTimeout(initBlogsApp, 1000);
    return;
  }

  // --- RENDERING ---
  blogList.innerHTML = '';

  window.BLOGS_DATA.forEach((blog, index) => {
    const li = document.createElement('li');
    li.className = 'blog-post-item';
    li.dataset.index = index;

    li.innerHTML = `
      <div class="blog-banner-box">
        <img src="${blog.image}" alt="${blog.title}" loading="lazy">
      </div>

      <div class="blog-content">
        <div class="blog-meta">
          <p class="blog-category">${blog.category}</p>
          <span class="dot"></span>
          <time datetime="${blog.date}">${blog.date}</time>
        </div>

        <h3 class="h3 blog-item-title">${blog.title}</h3>
        <p class="blog-text">${blog.description}</p>
        
        <div class="blog-item-link">
          <span>Read more</span>
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </div>
      </div>
    `;

    li.addEventListener('click', () => openBlogModal(blog));
    blogList.appendChild(li);
  });

  // --- MODAL LOGIC ---
  function openBlogModal(blog) {
    modalImg.src = blog.image;
    modalImg.alt = blog.title;
    modalTitle.innerText = blog.title;
    modalCategory.innerText = blog.category;
    modalDate.innerText = blog.date;
    modalText.innerHTML = blog.content;
    modalLink.href = blog.link;

    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
  }

  function closeBlogModal() {
    modalContainer.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeBlogModal);
  modalOverlay.addEventListener('click', closeBlogModal);
}

document.addEventListener('DOMContentLoaded', initBlogsApp);
