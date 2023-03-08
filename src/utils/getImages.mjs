import {create} from 'apisauce';
import {decode} from 'html-entities';

/**
 *
 * @param {String} sub
 * @returns {Promise<[{id: String, title: String, url:String}]>}
 */
const getImages = async (sub) => {
  const imgList = [];
  const api = create({
    baseURL: 'https://www.reddit.com',
    headers: {Accept: 'application/json'},
  });

  await api.get(`/r/${sub}/hot.json`, {g: 'GLOBAL', show: 'all'}).then(res => {
    for (const post of res.data.data.children) {
      if (post.data?.post_hint === 'image') {
        imgList.push({
          id: post.data.id,
          title: decode(post.data.title),
          url: post.data.url,
        });
      }
    }
  });

  return imgList;
};

export default getImages;
