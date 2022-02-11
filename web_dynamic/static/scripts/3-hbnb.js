$(document).ready(function () {
  const amenNames = [];
  const amenIds = [];

  $('input:checkbox').change(
    function () {
      if ($(this).is(':checked')) {
        const dataID = ($(this).parent().parent().attr('data-id'));
        const name = ($(this).parents('li').attr('data-name'));
        amenIds.push(dataID);
        amenNames.push(name);
      } else {
        amenIds.pop('data-id');
        amenNames.pop('data-name');
        console.log(amenNames);
      }
      if (amenNames.length === 0) {
        $('.amenities h4').html('&nbsp;');
      } else {
        $('.amenities h4').text(amenitiesNames.join(', '));
      }
    });
});

$(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (data.status === 'OK') {
      $('.api_status').addClass('available');
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        dataType: 'json',
        data: JSON.stringify({ amenities: {} }),
        complete: function (data) {
          const placesAms = data.responseJSON;
          for (const place of placesAms) {
            const html =
                            `<article> \
                                <div class="title_box"> \
                                    <h2> ${place.name} </h2> \
                                    <div class="price_by_night"> $${place.price_by_night} </div> \
                                </div> \
                                <div class="information"> \
                                    <div class="max_guest"> ${place.max_guest} Guest</div> \
                                    <div class="number_rooms"> ${place.number_rooms} Bedroom</div> \
                                    <div class="number_bathrooms"> ${place.number_bathrooms} Bathroom</div> \
                                </div> \
                                <div class="description"> \
                                    ${place.description} \
                                </div> \
                            </article>`;
            $('.places').append(jQuery.parseHTML(html));
          }
        }
      });
    } else {
      $('.api_status').removeClass('available');
    }
  });
});

