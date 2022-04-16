import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const currentTime = localStorage.getItem('videoplayer-current-time');

if (currentTime) {
  player.setCurrentTime(currentTime);
}

const onTime = e => {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(e.seconds));
};

player.on('timeupdate', throttle(onTime, 1000));
