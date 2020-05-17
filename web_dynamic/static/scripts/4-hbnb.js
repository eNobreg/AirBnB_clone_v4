const activeAmenities = {};
const entryNames = [];
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
  // Update status circle
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function () {
  }).done(function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  // There's a shorthand way to do it with $.post but I can't figure it out
  //
  // $.post('http://localhost:5001/api/v1/places_search/', '{}', function (data) {
  //   console.log(data)
  // }, "json");
  //

  $('BUTTON').click(function () {
    const amenitiesIds = Object.keys(activeAmenities);
    console.log(amenitiesIds);
    console.log(activeAmenities);
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify({ amenities: amenitiesIds }),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        let entry;
        let pageContent = '';
        for (entry of data) {
          // Ternary operators to insert correct plural
          const bathroom = (entry.number_bathrooms > 1) ? ' Bathrooms</div>' : ' Bathroom</div>';
          const guests = (entry.max_guest > 1) ? ' Guests</div>' : ' Guest</div>';
          const rooms = (entry.number_rooms > 1) ? ' Bedrooms</div>' : ' Bedroom</div>';

          // Create html each loop
          const html = '<article>' +
                         '<div class="title_box">' +
                         '<h2>' + entry.name + '</h2>' +
                         '<div class="price_by_night">$' + entry.price_by_night + '</div>' +
                         '</div>' +
                         '<div class="information">' +
                         '<div class="max_guest">' + entry.max_guest + guests +
                         '<div class="number_rooms">' + entry.number_rooms + rooms +
                         '<div class="number_bathrooms">' + entry.number_bathrooms + bathroom +
                         '</div>' +
                         '<div class="description">' + entry.description + '</div>' + '</article>';

          pageContent += html;
          console.log(pageContent)
        // Append the HTML to the correct section
        $('section.places').html(pageContent);
        }
      }
    });
  });
});
