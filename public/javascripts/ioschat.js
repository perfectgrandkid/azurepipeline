$(function () {
  $('#chat__form').on('submit', function(e) {
    e.preventDefault();
    var message = $('#text-message').val();
    $('#text-message').val('');
    var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    $('.chat').append('<div class="mine messages"><div class="message last"><div class="date">' + date + '</div><div>' + message + '</div></div>')
  })
});