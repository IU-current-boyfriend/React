/**
 * 如何重写useState呢？
 *    实际上和我们学习obj.a => useState思路相同,但是代码的设计我们需要变一下。
 * 
 */

import _ from 'lodash';

const {
  createRoot
} = ReactDOM;


const states = [];
const stateSetters = [];
const dependenceArr = [];

let startIndex = 0;
let depsIndex = 0;


export const root = createRoot(document.getElementById('app'));

export function useState(initialValue) {
  // 1. 通过createState函数创建状态
  // 2. 通过createStateSetter函数创建设置状态函数
  // 3. 返回相应的状态和设置状态的方法
  states[startIndex] = createState(initialValue, startIndex);
  if (!stateSetters[startIndex]) {
    createStateSetter(startIndex, (setterFn) => {
      setterFn && stateSetters.push(setterFn);
    });
  }
  const _state = states[startIndex];
  const _stateSetter = stateSetters[startIndex];

  startIndex++;
  return [
    _state,
    _stateSetter
  ]
};

function createState(initialValue, index) {
  return states[index] || _.clone(initialValue);
};

function createStateSetter(index, callback) {
  const _stateSetter = (newValue) => {
    // newValue可能是一个函数的形式，如果是函数形式，则需要赋值的就是函数执行后的返回值
    typeof (newValue) === 'function'
      ? states[index] = newValue(states[index])
      : states[index] = newValue;
    // 重新执行渲染
    render();
  };
  callback && callback(_stateSetter);
  return _stateSetter;
};

export function useReducer(reducer, initialValue) {
  /**
   * 1. 创建状态state
   */
  const [_state, _setState] = useState(initialValue);

  if (typeof reducer !== 'function') {
    throw new TypeError('reducer function must be a function...');
  }

  const _dispatch = (action) => {
    const newValue = reducer(_state, action);
    _setState(newValue);
  }

  return [
    _state,
    _dispatch
  ]
};

export function useEffect(callback, deps) {
  // deps不存在的情况
  if (callback && deps === undefined) {
    callback();
    return;
  };
  // callback不是回调函数
  if (typeof callback !== 'function') {
    throw new TypeError('useEffect first parameter must be a function...');
  };
  const isChanged = dependenceArr[depsIndex]
    ? deps.some((dep, index) => dep !== dependenceArr[depsIndex][index])
    : true;


  if (isChanged) callback();

  dependenceArr[depsIndex] = deps;

  depsIndex++;
};

async function render() {
  startIndex = 0;
  depsIndex = 0;
  const App = (await (import('./day052.jsx'))).default;
  root.render(<App />);
}