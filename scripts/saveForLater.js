$(document).ready(function () {
    // Array to store saved projects
    let savedProjects = JSON.parse(localStorage.getItem('savedProjects')) || [];

    // Function to update the saved projects container
    function updateSavedProjects() {
        const savedProjectsContainer = $('.saved-projects-container');
        savedProjectsContainer.empty();

        savedProjects.forEach(project => {
            const projectElement = $('<div>').addClass('saved-project');
            const imageSrc = project.imageSrc.replace('images/', '../images/');
            const imageElement = $('<img>').attr('src', imageSrc).attr('alt', project.name);
            const deleteButton = $('<button>').text('Delete').click(function () {
                deleteProject(project.name);
            });
            projectElement.append(imageElement, deleteButton);
            savedProjectsContainer.append(projectElement);
        });
    }

    // Function to delete a project
    function deleteProject(projectName) {
        savedProjects = savedProjects.filter(p => p.name !== projectName);
        localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
        updateSavedProjects();
    }

    // Initial update of the saved projects container
    updateSavedProjects();
});