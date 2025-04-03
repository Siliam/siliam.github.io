// Image lazy loading
document.addEventListener("DOMContentLoaded", function() {
  // Get all images that should be lazy loaded
  const lazyImages = document.querySelectorAll('.carousel-item img, .avatar-container img');
  
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports loading attribute
    lazyImages.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  } else {
    // Fallback for browsers that don't support loading attribute
    const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    
    lazyImages.forEach(function(lazyImage) {
      // Store original src in data-src
      lazyImage.dataset.src = lazyImage.src;
      // Set a placeholder
      lazyImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
      lazyImageObserver.observe(lazyImage);
    });
  }
});
