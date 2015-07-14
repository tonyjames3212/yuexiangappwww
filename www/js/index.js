$(document).ready(function() {
    $('#addBtn').click(function() {
        if($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).find('.icon-add').css('transform', 'rotate(0deg)');;
            // $(this).find('.icon-add').removeClass('rotate');
            $('#addWrapper').fadeOut();
        }else {
            $(this).addClass('open');
            $(this).find('.icon-add').css('transform', 'rotate(45deg)');;
            // $(this).find('.icon-add').addClass('rotate');
            $('#addWrapper').fadeIn();
        }
    });
});