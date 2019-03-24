$(function () {
  $('#chat__form').on('submit', function(e) {
    e.preventDefault();
    var message = $('#text-message').val();
    $('#text-message').val('');
    var date = new Date();
    var now = date.toJSON().slice(0,10).replace(/-/g,'/') + " " + date.getHours() + ":" + date.getMinutes();
    $('.chat').append('<div class="mine messages"><div class="message last"><div>' + message + '</div></div><div class="time">' + now + '</div>')
  })
});