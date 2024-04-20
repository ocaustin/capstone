$(document).ready(function() {
    // Array to store testimonials
    let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
  
    // Function to display testimonials
    function displayTestimonials() {
      const testimonialList = $('#testimonialList');
      testimonialList.empty();
  
      testimonials.forEach(testimonial => {
        const testimonialElement = $('<div>').addClass('testimonial');
        const nameElement = $('<p>').addClass('testimonial-name').text(testimonial.name);
        const textElement = $('<p>').addClass('testimonial-text').text(testimonial.text);
        testimonialElement.append(nameElement, textElement);
        testimonialList.append(testimonialElement);
      });
    }
  
    // Function to add a new testimonial
    function addTestimonial(name, text) {
      testimonials.push({ name: name, text: text });
      localStorage.setItem('testimonials', JSON.stringify(testimonials));
      displayTestimonials();
    }
  
    // Event handler for form submission
    $('#testimonialForm').submit(function(event) {
      event.preventDefault();
  
      const name = $('#name').val();
      const text = $('#testimonial').val();
  
      addTestimonial(name, text);
  
      // Reset the form
      $('#name').val('');
      $('#testimonial').val('');
    });
  
    // Initial display of testimonials
    displayTestimonials();
  });