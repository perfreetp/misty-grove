import { syntheticColposcopy } from './imaging.js';

/**
 * 图像解析与缓存。
 * 合成演示影像（syn:seed:phase）按需生成一次并常驻缓存；
 * 导入的真实图像直接返回其 dataURL。
 */
const urlCache = new Map();
const imgCache = new Map();
const inflight = new Map();

export function isSynthetic(src) {
  return typeof src === 'string' && src.startsWith('syn:');
}

/** 取得可用于 <img>/drawImage 的地址 */
export function resolveImage(src, lesions = [], geometry = null, tzType = 'I') {
  if (!src) return null;
  if (!isSynthetic(src)) return src;
  if (urlCache.has(src)) return urlCache.get(src);
  const [, seedStr, phase] = String(src).split(':');
  const seed = Number(seedStr) || 7;
  const url = syntheticColposcopy({ seed, phase, geometry, lesions, tzType });
  urlCache.set(src, url);
  return url;
}

export function loadImage(src, lesions = [], geometry = null, tzType = 'I') {
  if (!src) return Promise.resolve(null);
  const url = resolveImage(src, lesions, geometry, tzType);
  if (!url) return Promise.resolve(null);
  if (imgCache.has(url)) return Promise.resolve(imgCache.get(url));
  if (inflight.has(url)) return inflight.get(url);
  const p = new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      imgCache.set(url, img);
      inflight.delete(url);
      resolve(img);
    };
    img.onerror = () => {
      inflight.delete(url);
      resolve(null);
    };
    img.src = url;
  });
  inflight.set(url, p);
  return p;
}

export function clearImageCache() {
  urlCache.clear();
  imgCache.clear();
  inflight.clear();
}
