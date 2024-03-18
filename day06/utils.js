
export function isEqual(o1, o2) {
  // 两个值都是基本数据类型，直接通过===比较就好，但是要确保两个都是基本值
  if (isBasicData(o1, o2)) return o1 === o2;
  // 两个值都是数组，对比两个数组是否相同
  if (isAllArray(o1, o2)) return isEqualArray(o1, o2);
  // 两个值类型不统一，并且是引用数据类型
  return isEqualObject(o1, o2);
}

export function isEqualObject(o1, o2) {
  const queueOne = Object.keys(o1);
  const queueTwo = Object.keys(o2);
  if (queueOne.length !== queueTwo.length) return false;
  for (let key of queueOne) {
    if (!o2.hasOwnProperty(key) || o2[key] !== o1[key]) {
      return false;
    }
  }
  return true;
}


export function isEqualArray(o1, o2) {
  return JSON.stringify(o1) === JSON.stringify(o2);
}


export function isAllArray(o1, o2) {
  return (Array.isArray(o1) && Array.isArray(o2));
}


export function isBasicData(o1, o2) {
  if (o1 === null || o2 === null) return true;
  // 获取o1，o2类型
  const types = [typeof o1, typeof o2];
  // 根据o1，o2类型决定返回值
  return !(types.includes(o1) === 'function' || types.includes('object'));
}

export function isFunction(fn) {
  return typeof fn === 'function';
}