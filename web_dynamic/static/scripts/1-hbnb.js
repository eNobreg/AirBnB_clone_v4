const activeAmenities = {};
$(document).ready(function () {
  // Check for a change in the input
  $('input[type="checkbox"]').change(function () {
    // If the box is checked
    if (this.checked) {
      activeAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    // Check if the box isn't checked
    } else if (!this.checked) {
      delete activeAmenities[$(this).attr('data-id')];
    }
    // Returns a list of object names, updates on each checkbox change
    let names = Object.keys(activeAmenities).map((key) => {
      return activeAmenities[key];
    });
    names += '&nbsp';
    $('div.amenities H4').html(names);
  });
});
