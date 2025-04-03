$(document).ready(function() {
  // Navigation Bubbles
  $('.nav-bubble').click(function() {
    const target = $(this).data('target');
    $('html, body').animate({
      scrollTop: $('#' + target).offset().top
    }, 800);
  });

  // Update active bubble on scroll
  $(window).scroll(function() {
    let current = '';
    $('section').each(function() {
      const sectionTop = $(this).offset().top;
      const sectionHeight = $(this).height();
      if ($(window).scrollTop() >= (sectionTop - sectionHeight / 3)) {
        current = $(this).attr('id');
      }
    });

    $('.nav-bubble').removeClass('active');
    $('.nav-bubble[data-target="' + current + '"]').addClass('active');
  });

  // Scroll indicators
  $('.scroll-indicator-1').click(function() {
    $('html, body').animate({
      scrollTop: $('#cv').offset().top
    }, 800);
  });
  
  $('.scroll-indicator-2').click(function() {
    $('html, body').animate({
      scrollTop: $('#research').offset().top
    }, 800);
  });

  // Timeline animation functions
  function isInViewport(element) {
    const rect = element[0].getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  function handleTimelineAnimation() {
    $('.timeline-item').each(function(index) {
      if (isInViewport($(this))) {
        $(this).addClass('visible');
        
        // Add a staggered delay for a cascade effect
        const $item = $(this);
        setTimeout(function() {
          $item.css({
            'opacity': '1',
            'transform': 'translateX(0)'
          });
        }, 150 * index);
      }
    });
  }

  // Initialize timeline with appropriate icons
  function initTimeline() {
    const icons = [
      'fa-briefcase',     // Work
      'fa-user-graduate', // Education
      'fa-university',    // PhD
      'fa-laptop-code',   // MS degree
      'fa-graduation-cap' // BS degree
    ];
    
    $('.timeline-item').each(function(index) {
      // Create the icon element if it doesn't exist
      if ($(this).find('.timeline-icon').length === 0) {
        $(this).append(
          $('<div>', { class: 'timeline-icon' }).append(
            $('<i>', { class: 'fas ' + icons[index % icons.length] })
          )
        );
      }
      
      // Add hover effect for timeline content
      const $content = $(this).find('.timeline-content');
      $content.hover(
        function() {
          $(this).parent().find('.timeline-item::after').css('transform', 'scale(1.2)');
        },
        function() {
          $(this).parent().find('.timeline-item::after').css('transform', 'scale(1)');
        }
      );
    });
  }

  // Call timeline functions
  initTimeline();
  handleTimelineAnimation();
  $(window).scroll(handleTimelineAnimation);

  // Research Tabs
  $('.research-tab').click(function() {
    const target = $(this).data('tab');
    
    $('.research-tab').removeClass('active');
    $(this).addClass('active');
    
    $('.research-content').removeClass('active');
    $('#' + target).addClass('active');
  });

  // Carousel functionality
  function setupCarousel(trackSelector) {
    const $track = $(trackSelector);
    const $prevButton = $track.parent().find('.carousel-prev');
    const $nextButton = $track.parent().find('.carousel-next');
    const $items = $track.find('.carousel-item');
    const itemWidth = $items.first().outerWidth(true);
    
    let position = 0;
    let visibleItems = Math.floor($track.parent().width() / itemWidth);
    let maxPosition = Math.max(0, $items.length - visibleItems);
    
    // Add hover effect
    $items.hover(
      function() {
        $(this).css('transform', 'translateY(-10px)');
      },
      function() {
        $(this).css('transform', 'translateY(0)');
      }
    );
    
    function updateCarouselPosition() {
      $track.css('transform', `translateX(${-position * itemWidth}px)`);
      
      // Disable/enable buttons based on position
      $prevButton.css('opacity', position === 0 ? '0.5' : '1');
      $nextButton.css('opacity', position >= maxPosition ? '0.5' : '1');
    }
    
    $prevButton.click(function() {
      position = Math.max(0, position - 1);
      updateCarouselPosition();
    });
    
    $nextButton.click(function() {
      position = Math.min(maxPosition, position + 1);
      updateCarouselPosition();
    });
    
    // Initial setup
    updateCarouselPosition();
    
    // Update on window resize
    $(window).resize(function() {
      visibleItems = Math.floor($track.parent().width() / itemWidth);
      maxPosition = Math.max(0, $items.length - visibleItems);
      position = Math.min(position, maxPosition);
      updateCarouselPosition();
    });
  }

  // Set up each carousel
  setupCarousel('.books-track');
  setupCarousel('.movies-track');
  setupCarousel('.tech-track');

  // Form interactions
  $('input, textarea').focus(function() {
    $(this).css({
      'borderColor': 'var(--electric-blue)',
      'boxShadow': '0 0 8px rgba(77, 155, 230, 0.5)'
    });
  }).blur(function() {
    $(this).css({
      'borderColor': '',
      'boxShadow': ''
    });
  });

  $('.submit-btn').click(function(e) {
    e.preventDefault();
    
    // Simple validation
    let valid = true;
    $('input, textarea').each(function() {
      if (!$(this).val().trim()) {
        valid = false;
        $(this).css({
          'borderColor': 'var(--dark-red)',
          'boxShadow': '0 0 8px rgba(142, 44, 44, 0.5)'
        });
      }
    });
    
    if (valid) {
      // Animation for successful submission
      const $btn = $(this);
      $btn.html('<i class="fas fa-check"></i> Message Sent!');
      $btn.css('backgroundColor', 'var(--teal)');
      
      // Clear form
      setTimeout(function() {
        $('input, textarea').val('');
        
        setTimeout(function() {
          $btn.html('Send Message <i class="fas fa-paper-plane"></i>');
          $btn.css('backgroundColor', '');
        }, 2000);
      }, 1000);
    }
  });

  // RPG Dialogue System
  const $dialogueText = $('#dialogue-text');
  const $continueIndicator = $('#continue-indicator');
  const $avatar = $('#avatar');
  
  // Dialogue content - add more dialogues as needed
  const dialogues = [
    "Hello, World!", // Already loaded in HTML
    "I'm Ismail.\nWelcome to my little space on the web.\nMake yourself at home!",
    "I am currently a postdoctoral researcher at the ScienesPo médialab, investigating misinformation spread on social media.",
    "Before that, I worked on teaching computers how to interpret multimedia content, and trained dr.. models to better understand human conversations!",
    "Outside of work, I mostly generate entropy by consuming good art and literature, and creating bad art and literature.",
    "I'm a big fan of the internet, spreadsheets, cooking, video games, video essays, TCGs, cheese, and Python (in no particular order).",
    "Feel free to scroll through this page to learn more about my research work, my interests, and to contact me if you feel so inclined :)"
  ];
  
  // Avatar expressions matching each dialogue
  const expressions = [
    "assets/imgs/avatar-1.png", // First expression already set in HTML
    "assets/imgs/avatar-1.png",
    "assets/imgs/avatar-1.png",
    "assets/imgs/avatar-1.png",
    "assets/imgs/avatar-2.png",
    "assets/imgs/avatar-1.png",
    "assets/imgs/avatar-2.png"
  ];
  
  let currentDialogue = 0; // Start at 0 since first message is loaded
  let isTyping = false;
  let typingInterval;
  
  // Function to type out the text character by character
  function typeWriter(text) {
    if (isTyping) return;
    
    isTyping = true;
    $dialogueText.text('');
    let charIndex = 0;
    
    // Add typing animation
    typingInterval = setInterval(function() {
      if (charIndex < text.length) {
        $dialogueText.text($dialogueText.text() + text.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        $continueIndicator.css('opacity', 1);
        isTyping = false;
      }
    }, 15); // typing speed
  }
  
  // Click handler to advance to next dialogue
  $('.dialogue-box').click(function() {
    if (isTyping) {
      // If currently typing, complete the current text immediately
      clearInterval(typingInterval);
      $dialogueText.text(dialogues[currentDialogue]);
      $continueIndicator.css('opacity', 1);
      isTyping = false;
      return;
    }
    
    // Move to next dialogue
    currentDialogue++;
    if (currentDialogue >= dialogues.length) {
      currentDialogue = 0; // Loop back to the beginning
    }
    
    // Change avatar expression
    $avatar.attr('src', expressions[currentDialogue]);
    
    $continueIndicator.css('opacity', 0);
    typeWriter(dialogues[currentDialogue]);
  });
  
  // Add a hover effect on the dialogue box
  $('.dialogue-box').hover(
    function() {
      $(this).css('borderColor', 'var(--gold)');
    },
    function() {
      $(this).css('borderColor', 'var(--lavender-dark)');
    }
  );


    // JRPG Menu interactions for Research section
    $(document).ready(function() {
      // Initialize - hide all arrows except for the active item
      $('.menu-selector').css('opacity', '0');
      $('.menu-option.active .menu-selector').css('opacity', '1');
      
      // JRPG Menu Selection
      $('.menu-option').click(function() {
        const target = $(this).data('tab');
        
        // Update active menu option
        $('.menu-option').removeClass('active');
        // Hide all arrows first
        $('.menu-selector').css('opacity', '0');
        
        // Set this option as active and show its arrow
        $(this).addClass('active');
        $(this).find('.menu-selector').css('opacity', '1');
        
        // Hide all content panels with a fade out
        $('.research-content').removeClass('active');
        
        // Play a selection sound (optional)
        playMenuSound('select');
        
        // Add a small delay before showing the new content (for transition effect)
        setTimeout(function() {
          // Show the selected content panel with a fade in
          $('#' + target).addClass('active');
          
          // Optional animation for the paper items
          animatePaperItems();
        }, 200);
      });
      
      // Hover effect for menu options
      $('.menu-option').hover(
        function() {
          // On hover in
          if (!$(this).hasClass('active')) {
            playMenuSound('hover');
            $(this).find('.menu-selector').css('opacity', '0.7');
          }
        },
        function() {
          // On hover out
          if (!$(this).hasClass('active')) {
            // Hide the selector arrow if not active
            $(this).find('.menu-selector').css('opacity', '0');
          }
        }
      );
      
      // Paper title click handling
      $('.paper-title-link').click(function(e) {
        e.preventDefault();
        const paperTitle = $(this).text();
        console.log('Paper clicked: ' + paperTitle);
        // Here you can add code to show a modal with paper details or redirect to the paper
        alert('You clicked on: ' + paperTitle + '\n\nThis would typically link to the full paper or its details.');
      });
      
      // Animate paper items when they appear
      function animatePaperItems() {
        $('.active .paper-item').each(function(index) {
          const $item = $(this);
          $item.css({
            'opacity': '0',
            'transform': 'translateX(-20px)'
          });
          
          setTimeout(function() {
            $item.css({
              'transition': 'all 0.4s ease',
              'opacity': '1',
              'transform': 'translateX(0)'
            });
          }, 100 + (index * 150));
        });
      }
      
      // Function to play menu sounds (can be implemented if you want to add sounds)
      function playMenuSound(type) {
        // This is a placeholder for actual sound implementation
        // You could add actual sound effects here
        console.log('Playing ' + type + ' sound');
        
        // Example of how you might implement sounds if you add them later:
        /*
        const sounds = {
          hover: new Audio('assets/sounds/menu-hover.mp3'),
          select: new Audio('assets/sounds/menu-select.mp3')
        };
        
        if (sounds[type]) {
          sounds[type].currentTime = 0;
          sounds[type].play();
        }
        */
      }
      
      // Show initial research content when page loads
      setTimeout(function() {
        animatePaperItems();
      }, 100);
    });

  // Populate all carousels
  populateCarousel('movies', favoritesData.movies);
  populateCarousel('books', favoritesData.books);
  populateCarousel('games', favoritesData.games);
  populateCarousel('series', favoritesData.series);
  populateCarousel('albums', favoritesData.albums);
  populateCarousel('anime', favoritesData.anime); // true for tech items with icons
  
  // Initialize all carousels after populating them
  initializeCarousels();
  
  /**
   * Populates a carousel with the given items
   * @param {string} carouselId - ID prefix for the carousel (e.g., 'movies')
   * @param {Array} items - Array of item objects to populate the carousel with
   * @param {boolean} isIconBased - Whether this carousel uses icons instead of images
   */
  function populateCarousel(carouselId, items, isIconBased = false) {
    const $carousel = $(`#${carouselId}-card .card-carousel`);
    const $indicators = $(`#${carouselId}-card .carousel-indicators`);
    
    // Clear existing content
    $carousel.empty();
    $indicators.empty();
    
    // Add each item to the carousel
    items.forEach((item, index) => {
      // Create carousel item
      const $item = $('<div>', { class: 'carousel-item' });
      
      // Create image container
      const $imageContainer = $('<div>', { class: 'item-image' });
      
      // Add image or icon
      if (isIconBased) {
        $imageContainer.append($('<i>', { class: item.icon }));
      } else {
        $imageContainer.append($('<img>', { 
          src: item.image, 
          alt: item.title 
        }));
      }
      
      // Create details container
      const $details = $('<div>', { class: 'item-details' });
      $details.append($('<h4>').text(item.title));
      $details.append($('<p>').text(item.description));
      
      // Assemble carousel item
      $item.append($imageContainer);
      $item.append($details);
      
      // Add to carousel
      $carousel.append($item);
      
      // Add indicator
      const $indicator = $('<span>', { 
        class: index === 0 ? 'indicator active' : 'indicator',
        'data-index': index
      });
      $indicators.append($indicator);
    });
  }
  
  /**
   * Initializes all carousels with navigation and interactivity
   */
  function initializeCarousels() {
    $('.favorite-card').each(function() {
      const $card = $(this);
      const $carousel = $card.find('.card-carousel');
      const $items = $carousel.find('.carousel-item');
      const $prevBtn = $card.find('.card-prev');
      const $nextBtn = $card.find('.card-next');
      const $indicators = $card.find('.indicator');
      
      // If no items, hide navigation
      if ($items.length === 0) {
        $prevBtn.hide();
        $nextBtn.hide();
        return;
      }
      
      let currentIndex = 0;
      const itemCount = $items.length;
      
      // Make first item active
      $items.first().addClass('active');
      
      // Initialize carousel position
      updateCarousel();
      
      // Previous button click handler
      $prevBtn.on('click', function() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel('prev');
        updateIndicators();
        playCardSound('slide');
      });
      
      // Next button click handler
      $nextBtn.on('click', function() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel('next');
        updateIndicators();
        playCardSound('slide');
      });
      
      // Indicator click handler
      $indicators.on('click', function() {
        const newIndex = $(this).data('index');
        if (newIndex !== currentIndex) {
          const direction = newIndex > currentIndex ? 'next' : 'prev';
          currentIndex = newIndex;
          updateCarousel(direction);
          updateIndicators();
          playCardSound('slide');
        }
      });
      
      // Update carousel position
      function updateCarousel(direction) {
        // Calculate the translation value based on current index
        const translationValue = -currentIndex * 100 + '%';
        
        // Apply the translation to the carousel
        $carousel.css('transform', 'translateX(' + translationValue + ')');
      }
      
      // Update indicator dots
      function updateIndicators() {
        $indicators.removeClass('active');
        $indicators.eq(currentIndex).addClass('active');
      }
      
      // Add touch swipe support
      let startX, endX;
      const minSwipeDistance = 50;
      
      $carousel.on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
      });
      
      $carousel.on('touchend', function(e) {
        endX = e.originalEvent.changedTouches[0].clientX;
        
        const distance = endX - startX;
        
        if (Math.abs(distance) >= minSwipeDistance) {
          if (distance > 0) {
            // Swipe right, go to previous
            $prevBtn.click();
          } else {
            // Swipe left, go to next
            $nextBtn.click();
          }
        }
      });
    });
  }
  
  // Function to play card navigation sounds (optional)
  function playCardSound(type) {
    // This is a placeholder - you could implement actual sounds here
    console.log('Playing ' + type + ' sound');
  }
  
  // Add animations when scrolling to the favorites section
  function animateCardsOnScroll() {
    const $cards = $('.favorite-card');
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    
    $cards.each(function(index) {
      const cardTop = $(this).offset().top;
      
      // Check if card is in viewport
      if (cardTop < (scrollTop + windowHeight * 0.9) && cardTop > scrollTop) {
        setTimeout(() => {
          $(this).addClass('animated');
        }, index * 150);
      }
    });
  }
  
  // Initial animation check and scroll listener
  animateCardsOnScroll();
  $(window).on('scroll', animateCardsOnScroll);


  $('.input-with-icon').each(function() {
    const $icon = $(this).find('.icon-left');
    const $input = $(this).find('input, textarea');
    
    // Move icon before input for proper CSS positioning
    $icon.detach().prependTo($(this));
  });
  
  // Input field focus effects for icons
  $('.input-with-icon input, .input-with-icon textarea').on('focus', function() {
    $(this).parent().find('.icon-left').css({
      'color': 'var(--gold)',
      'transform': 'scale(1.2)'
    });
  });
  
  $('.input-with-icon input, .input-with-icon textarea').on('blur', function() {
    if (!$(this).val()) {
      $(this).parent().find('.icon-left').css({
        'color': 'var(--teal)',
        'transform': 'scale(1)'
      });
    }
  });
  
  // Simulate form submission
  $('.submit-btn').on('click', function(e) {
    e.preventDefault();
    
    // Basic validation
    let isValid = true;
    $('.input-with-icon input, .input-with-icon textarea').each(function() {
      if (!$(this).val().trim()) {
        isValid = false;
        $(this).css('border-color', '#ff4757');
        $(this).parent().parent().find('.form-highlight').css({
          'width': '100%',
          'background': 'linear-gradient(90deg, #ff4757, #ff6b81)'
        });
        
        // Shake effect for empty fields
        $(this).css('animation', 'shake 0.5s ease');
        setTimeout(() => {
          $(this).css('animation', '');
        }, 500);
      }
    });
    
    if (isValid) {
      const $btn = $(this);
      $btn.html('<i class="fas fa-circle-notch fa-spin"></i> Sending...');
      
      // Get form data
      const name = $('#name').val();
      const email = $('#email').val();
      const message = $('#message').val();
      
      // Send data using AJAX with Formspree
      $.ajax({
        url: 'https://formspree.io/mail@harrando.me',
        method: 'POST',
        data: {
          name: name,
          email: email,
          message: message
        },
        dataType: 'json',
        success: function(response) {
          console.log('Success:', response);
          $btn.html('<i class="fas fa-check"></i> Message Sent!');
          $btn.addClass('submit-success');
          
          // Clear form
          $('.input-with-icon input, .input-with-icon textarea').val('');
          
          // Reset button after delay
          setTimeout(function() {
            $btn.html('Send Message <i class="fas fa-paper-plane"></i>');
            $btn.removeClass('submit-success');
          }, 3000);
        },
        error: function(xhr, status, error) {
          console.error('Error:', error);
          $btn.html('<i class="fas fa-times"></i> Error!');
          $btn.css({
            'background': 'var(--gold)'
          });
          
          // Reset button after delay
          setTimeout(function() {
            $btn.html('Send Message <i class="fas fa-paper-plane"></i>');
            $btn.css({
              'background': 'var(--dark-lavender)'
            });
          }, 3000);
        }
      });
    }
  });
    
  // Animation when section comes into view
  function animateContactForm() {
    const $form = $('.contact-form');
    const formTop = $form.offset().top;
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    
    if (formTop < (scrollTop + windowHeight * 0.8) && !$form.hasClass('animated')) {
      $form.addClass('animated');
      
      // Animate form groups sequentially
      $('.form-group').each(function(index) {
        const $group = $(this);
        $group.css({
          'opacity': 0,
          'transform': 'translateY(20px)'
        });
        
        setTimeout(function() {
          $group.css({
            'transition': 'all 0.5s ease',
            'opacity': 1,
            'transform': 'translateY(0)'
          });
        }, 100 * index);
      });
      
      // Animate button last
      $('.submit-btn').css({
        'opacity': 0,
        'transform': 'translateY(20px)'
      });
      
      setTimeout(function() {
        $('.submit-btn').css({
          'transition': 'all 0.5s ease',
          'opacity': 1,
          'transform': 'translateY(0)'
        });
      }, 400);
    }
  }
  
  // Check animation on load and scroll
  animateContactForm();
  $(window).on('scroll', animateContactForm);


  // Page load animation
  $('body').css('opacity', '0');
  setTimeout(function() {
    $('body').css({
      'transition': 'opacity 1s ease',
      'opacity': '1'
    });
  }, 100);


  
$(window).scroll(function() {
  let current = '';
  let scrollPos = $(window).scrollTop();
  let windowHeight = $(window).height();
  
  // Special case for the welcome section at the top
  if (scrollPos < $('#cv').offset().top - 100) {
    current = 'welcome';
  } else {
    // Check other sections
    $('section').each(function() {
      const sectionTop = $(this).offset().top;
      const sectionHeight = $(this).height();
      if (scrollPos >= (sectionTop - windowHeight/3)) {
        current = $(this).attr('id');
      }
    });
  }

  // Update active bubble
  $('.nav-bubble').removeClass('active');
  $('.nav-bubble[data-target="' + current + '"]').addClass('active');
});
$(window).scroll(function() {
  let current = '';
  let scrollPos = $(window).scrollTop();
  let windowHeight = $(window).height();
  
  // Special case for the welcome section at the top
  if (scrollPos < $('#cv').offset().top - 100) {
    current = 'welcome';
  } else {
    // Check other sections
    $('section').each(function() {
      const sectionTop = $(this).offset().top;
      const sectionHeight = $(this).height();
      if (scrollPos >= (sectionTop - windowHeight/3)) {
        current = $(this).attr('id');
      }
    });
  }

  // Update active bubble
  $('.nav-bubble').removeClass('active');
  $('.nav-bubble[data-target="' + current + '"]').addClass('active');
});

// Also make sure this runs on page load to set the initial state
$(document).ready(function() {
  // Trigger the scroll event on page load to set initial active state
  $(window).trigger('scroll');
});


});


// Mobile detection
function isMobile() {
  return window.innerWidth <= 768;
}

// Adjust section heights for mobile
function adjustSectionHeights() {
  if (isMobile()) {
    // Allow sections to have natural height on mobile instead of forcing 100vh
    $('section').css('min-height', 'auto');
    $('section').css('padding-bottom', '60px'); // Space for the bottom navigation
    
    // Specific adjustment for the welcome section to ensure it's at least viewport height
    $('#welcome').css('min-height', '100vh');
  } else {
    // Reset for desktop
    $('section').css('min-height', '100vh');
    $('section').css('padding-bottom', '40px');
  }
}

// Enhanced mobile carousel handling
function enhanceMobileCarousels() {
  if (isMobile()) {
    // Simplify carousel navigation on mobile with swipe gestures
    $('.card-carousel-container').each(function() {
      let startX, endX;
      const minSwipeDistance = 30;
      
      $(this).on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
      });
      
      $(this).on('touchend', function(e) {
        endX = e.originalEvent.changedTouches[0].clientX;
        const distance = endX - startX;
        
        if (Math.abs(distance) >= minSwipeDistance) {
          const $card = $(this).closest('.favorite-card');
          if (distance > 0) {
            // Swipe right, go to previous
            $card.find('.card-prev').click();
          } else {
            // Swipe left, go to next
            $card.find('.card-next').click();
          }
        }
      });
    });
  }
}

// Improve scrolling behavior on mobile
function improveMobileScrolling() {
  if (isMobile()) {
    // Smoother scroll to section on mobile
    $('.nav-bubble').click(function() {
      const target = $(this).data('target');
      const offset = $('#' + target).offset().top;
      
      $('html, body').animate({
        scrollTop: offset
      }, 600);
      
      return false;
    });
  }
}

// Toggle research tabs more effectively on mobile
function mobileResearchTabs() {
  if (isMobile()) {
    $('.menu-option').click(function() {
      // Scroll to content after tab change on mobile
      setTimeout(function() {
        const contentTop = $('.jrpg-content').offset().top - 20;
        $('html, body').animate({
          scrollTop: contentTop
        }, 300);
      }, 300);
    });
  }
}

$(document).ready(function() {
  // Run mobile adjustments
  adjustSectionHeights();
  enhanceMobileCarousels();
  improveMobileScrolling();
  mobileResearchTabs();
  
  // Re-run on window resize
  $(window).resize(function() {
    adjustSectionHeights();
  });
});


document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
        document.querySelector('.mobile-menu').classList.add('active');
    });
    
    document.querySelector('.mobile-menu-close').addEventListener('click', function() {
        document.querySelector('.mobile-menu').classList.remove('active');
    });
    
    // Mobile menu item click
    document.querySelectorAll('.mobile-menu-items li').forEach(function(item) {
        item.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const element = document.getElementById(target);
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
            
            document.querySelector('.mobile-menu').classList.remove('active');
        });
    });
});

