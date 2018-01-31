function fillArray(value, len) {
  if (len == 0) return [];
  var a = [value];
  while (a.length * 2 <= len) a = a.concat(a);
  if (a.length < len) a = a.concat(a.slice(0, len - a.length));
  return a;
}


function fetchImages() {

  var token = '7060436.be13e05.6691ed79dd50421f95a09dc182c3fb10',
  username = 'lilemoji', // rudrastyh - my username :)
  num_photos = 33;

  const classes = ["item--medium", "item--large"];
  const images = [];
  $.ajax({ // the first ajax request returns the ID of user rudrastyh
    url: 'https://api.instagram.com/v1/users/search',
    dataType: 'jsonp',
    type: 'GET',
    data: { access_token: token, q: username }, // actually it is just the search by username
    success: function (data) {
      console.log(data);
      $.ajax({
        url: 'https://api.instagram.com/v1/users/' + data.data[0].id + '/media/recent', // specify the ID of the first found user
        dataType: 'jsonp',
        type: 'GET',
        data: { access_token: token, count: num_photos },
        success: function (data2) {
          console.log(data2);
          for (x in data2.data) {
            images.push(data2.data[x].images.standard_resolution.url)
          }
          const digits = Array.from({ length: 50 }, () => [randomNumber(4), randomNumber(4), images[randomNumber(images.length - 1)]]).concat([Array(50).fill([1,1,"https://scontent.cdninstagram.com/vp/2cb1fad54c6dbda717cbd73621adcd1a/5B04EC5A/t51.2885-15/s640x640/sh0.08/e35/20766900_1595134723863970_2451162905551306752_n.jpg"])])
    
          const html = digits.map(generateHTML).join('');
          gallery.innerHTML = html;
          const items = document.querySelectorAll('.item');
          items.forEach(item => item.addEventListener('click', handleClick));
          overlayClose.addEventListener('click', close);
        },
        error: function (data2) {
          console.log(data2);
        }
      });
    },
    error: function (data) {
      console.log(data);
    }
  });
};






// const imageURLS = fetchImages();

const gallery = document.querySelector('.gallery');
const overlay = document.querySelector('.overlay');
const overlayImage = overlay.querySelector('img');
const overlayClose = overlay.querySelector('.close');

function generateHTML([h, v, src]) {

return `
  <div class="item">
    <img src="${src}">
    <div class="item__overlay">
      <button>View →</button>
    </div>
  </div>
`;
}
function randomNumber(limit) {
return Math.floor(Math.random() * limit) + 1;
}
function handleClick(e) {
const src = e.currentTarget.querySelector('img').src;
overlayImage.src = src;
overlay.classList.add('open');
}
function close() {
overlay.classList.remove('open');
}

fetchImages();
