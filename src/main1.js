import 'animate.css'
import labelFactory from './utils/labelFactory';
import * as handel from './utils';
import './utils/evnet1'

const cacheLabel = handel.getSiteData()
labelFactory.init({
  parentNode: document.querySelector('.label-list'),
  width: '80px',
  height: '80px',
  className: ['label'],
  oneRowCount: 5,
});

for (let i = 0; i < 8; i++) {
  labelFactory.create({
    name: i,
    currentIndex: i,
    top: parseInt(i / 5) * (80 + 20) + 'px',
    left: (i % 5) * (80 + 40) + 'px',
  });
}