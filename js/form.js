$('#hidden-contact').click(function () {
    $('a[href="#contact"]').click();
});

$('#submit-form').click( function(e) {
    e.preventDefault();
    $.ajax({
        url: 'form.php',
        type: 'post',
        data: $('#contact-form').serialize(),
        success: function(data) {
            $('#contact-form input').each(function() {
                $(this).val('')
            })
            $('a[href="#home"]').click();
        },
    });
});

$('input[name="name"]').addClass('current-field')

function nextField() {
    var current = $('.current-field');
    $('.current-field').removeClass('current-field')
    current.closest('div').next('div').find('input').addClass('current-field')
}

$('#contact-form input').focus( function() {
    $('.current-field').removeClass('current-field')
    $(this).addClass('current-field')
})

$(function(){
    var shift = false,
        capslock = false;

    $('#keyboard li').click(function(){
        var $this = $(this),
            character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

        // Shift keys
        if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
            $('.letter').toggleClass('uppercase');
            $('.symbol span').toggle();

            shift = (shift === true) ? false : true;
            capslock = false;
            return false;
        }

        // Caps lock
        if ($this.hasClass('capslock')) {
            $('.letter').toggleClass('uppercase');
            capslock = true;
            return false;
        }

        // Delete
        if ($this.hasClass('delete')) {
            var val = $('.current-field').val();

            $('.current-field').val(val.substr(0, val.length - 1));
            return false;
        }

        // Special characters
        if ($this.hasClass('symbol')) character = $('span:visible', $this).val();
        if ($this.hasClass('space')) character = ' ';
        if ($this.hasClass('tab')) return;
        if ($this.hasClass('return')) character = "\n";

        // Uppercase letter
        if ($this.hasClass('uppercase')) character = character.toUpperCase();

        // Remove shift once a key is clicked.
        if (shift === true) {
            $('.symbol span').toggle();
            if (capslock === false) $('.letter').toggleClass('uppercase');

            shift = false;
        }

        // Add the character

        console.log($('.current-field'))
        $('.current-field').val($('.current-field').val() + character);
    });

    $('#keyboard .tab').click(function(){
        nextField();
    })

});
