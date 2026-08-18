$(document).on('click', '.product-removal button', function () {
  removeItem(this);
});

function removeItem(removeButton) {
  let parent = $(removeButton).closest('.product');

  parent.slideUp(300, function () {
    parent.remove();

    updateTotal();
  });
}