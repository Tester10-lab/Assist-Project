function increaseValue(button, limit) {
    let btn = $(button);
    let product = btn.closest('.product');

    if (product.length === 0) {
        let number = btn.parent().find('.number');

        let value = parseInt(number.html(), 10);
        if (isNaN(value)) value = 0;

        if (limit && value >= limit) return;

        number.html(value + 1);
        return;
    }

    let qtyEl = product.find('.number');
    let target = product.find('.product-line-price span');

    let qty = parseInt(qtyEl.text());
    let price = parseFloat(product.find('.product-price').text());

    qty++;
    qtyEl.text(qty);
    target.text((price * qty).toFixed(2));

    updateTotal();
}

function decreaseValue(button, limit = 1) {
    let btn = $(button);
    let product = btn.closest('.product');

    if (product.length === 0) {
        let number = btn.parent().find('.number');

        let value = parseInt(number.html(), 10);
        if (isNaN(value)) value = 0;

        if (limit && value <= limit) return;

        number.html(value - 1);
        return;
    }

    let qtyEl = product.find('.number');
    let target = product.find('.product-line-price span');

    let qty = parseInt(qtyEl.text());
    let price = parseFloat(product.find('.product-price').text());

    if (qty > 1) {
        qty--;
        qtyEl.text(qty);
        target.text((price * qty).toFixed(2));
    }

    updateTotal();
}

function updateTotal() {
    let subtotal = 0;
    $.each($('.product'), function (i, el) {
        subtotal += parseFloat($(el).find('.product-line-price').text());
    });

    $('.sub-total .dollar').text('$' + subtotal.toFixed(2));
    let shipping = parseFloat($('.shipping-total .dollar').text());

    let total = subtotal + shipping;

    $('.total .dollar').text('$' + total.toFixed(2));
}