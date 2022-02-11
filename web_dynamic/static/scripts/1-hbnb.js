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
