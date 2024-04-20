$(document).ready(function () {
  // Code to show the instructions modal
  const modal = $('<div>').addClass('modal');
  const modalContent = $('<div>').addClass('modal-content');
  const title = $('<h2>').text('Instructions');
  const likingInstructions = $('<p>').text('To like a project, double-click on the project image. A heart emoji will appear on the liked project.');
  const savingInstructions = $('<p>').text('To save a project for later, single-click on the project image. The project will be saved and a confirmation message will be shown.');
  const okButton = $('<button>').text('OK').click(function () {
    modal.remove();
  });

  modalContent.append(title, likingInstructions, savingInstructions, okButton);
  modal.append(modalContent);
  $('body').append(modal);

  // Dropdown menu functionality
  $('.dropbtn').click(function() {
    $('.dropdown-content').toggle();
  });
});

$(document).ready(function () {
  // Array to store saved projects
  let savedProjects = JSON.parse(localStorage.getItem('savedProjects')) || [];

  // Function to save a project
  function saveProject(project, imageSrc) {
    const existingProject = savedProjects.find(p => p.name === project);
    if (!existingProject) {
      savedProjects.push({ name: project, imageSrc: imageSrc });
      localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
      showConfirmationModal('Project saved for later.');
    } else {
      showConfirmationModal('Project is already saved.');
    }
  }

  // Function to show the confirmation modal
  function showConfirmationModal(message) {
    const modal = $('<div>').addClass('modal');
    const modalContent = $('<div>').addClass('modal-content');
    const messageElement = $('<p>').text(message);
    const okButton = $('<button>').text('OK').click(function () {
      modal.remove();
    });

    modalContent.append(messageElement, okButton);
    modal.append(modalContent);
    $('body').append(modal);
  }

  // Function to show the "liked" modal and add heart emoji overlay
  function showLikedModal(project, imageSrc) {
    const modal = $('<div>').addClass('modal');
    const modalContent = $('<div>').addClass('modal-content');
    const messageElement = $('<p>').text(`You liked ${project}!`);
    const okButton = $('<button>').text('OK').click(function () {
      modal.remove();
    });

    modalContent.append(messageElement, okButton);
    modal.append(modalContent);
    $('body').append(modal);

    // Toggle the visibility of the heart emoji for the liked project
    const projectImageContainer = $(`.project-image-container img[alt="${project}"]`).parent();
    projectImageContainer.find('.heart').toggle();
  }

  // Variables to track click events
  let clickTimer = null;
  let doubleClickDelay = 300; // Adjust the delay as needed

  // Variable to track the state of fun stuff
  let isFunStuffActive = false;

  // Function to toggle image visibility
  function toggleImages() {
    $('.project-images img').toggle();
  }

  // Function for chained effect
  function chainedEffect() {
    $('body')
      .animate({ marginTop: '50px' }, 500)
      .animate({ marginRight: '50px' }, 500)
      .animate({ marginBottom: '50px' }, 500)
      .animate({ marginLeft: '50px' }, 500)
      .animate({ margin: '0' }, 500);
  }

  // Function to activate/deactivate fun stuff
  function toggleFunStuff() {
    isFunStuffActive = !isFunStuffActive;

    if (isFunStuffActive) {
      // Activate fun stuff
      toggleImages();
      chainedEffect();
      $('.project-images img').off('click', handleProjectImageClick);
    } else {
      // Deactivate fun stuff
      toggleImages();
      $('body').stop(true, false).css('margin', '0');
      $('.project-images img').on('click', handleProjectImageClick);
    }
  }

  // Event handler for project image click
  function handleProjectImageClick() {
    if (!isFunStuffActive) {
      const project = $(this).attr('alt');
      const imageSrc = $(this).attr('src');

      if (clickTimer === null) {
        clickTimer = setTimeout(function () {
          clickTimer = null;
          // Single click event
          saveProject(project, imageSrc);
        }, doubleClickDelay);
      } else {
        clearTimeout(clickTimer);
        clickTimer = null;
        // Double click event
        showLikedModal(project);
      }
    }
  }

  // Event handler for "fun stuff" button click
  $('.fun-button').click(toggleFunStuff);

  // Attach event handler to project images
  $('.project-images img').on('click', handleProjectImageClick);
});