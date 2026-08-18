// Sensor checkbox visual handled by CSS, but you can capture values like this:
$('.sensor-box input').on('change', function () {
    console.log($(this).val(), this.checked);
});

// Pill toggle
$('.pill').on('click', function () {
    $(this).toggleClass('active');
});

// Range updates
$('#rangeMiles').on('input', function () {
    $('#rangeMilesVal').text('0–' + $(this).val() + '+');
});
$('#torqueRange').on('input', function () {
    $('#torqueVal').text('40–' + $(this).val());
});
$('#weightRange').on('input', function () {
    $('#weightVal').text('35–' + $(this).val());
});
$('#loadRange').on('input', function () {
    $('#loadVal').text('200–' + $(this).val());
});
$('#heightRange').on('input', function () {
    let inches = $(this).val();
    let feet = Math.floor(inches / 12);
    let rem = inches % 12;
    $('#heightVal').text("5'0\"–" + feet + "'" + rem + '"');
});
$('#priceRange').on('input', function () {
    $('#priceVal').text('$1,500–$' + $(this).val() + '+');
});

// Reset
$('.reset-btn').on('click', function () {
    $('.pill').removeClass('active');
    $('input[type=checkbox]').prop('checked', false);
    $('input[type=range]').each(function () {
        this.value = this.defaultValue;
        $(this).trigger('input');
    });
});