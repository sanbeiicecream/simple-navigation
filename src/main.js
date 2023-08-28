import 'animate.css'
import labelFactory from './utils/labelFactory';
import utils from './utils/utils';
import './utils/evnets'

if (!utils.getSiteData()?.length) {
  utils.resetData([
    { name: '哔哩哔哩~', url: 'https://www.bilibili.com', icon: '', id: '0', delete: 0 },
    { name: 'AcFun', url: 'https://www.acfun.cn/', icon: '', id: '1', delete: 0 }
  ])
}
const cacheLabel = utils.getSiteData()

labelFactory.init({
  container: document.querySelector('.label-list'),
  width: '80px',
  height: '80px',
  className: ['label']
});

cacheLabel.forEach(item => {
  labelFactory.Label.listCount++
  labelFactory.create({
    data: item
  });
})
