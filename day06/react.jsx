/**
 * 如何重写useState呢？
 *    实际上和我们学习obj.a => useState思路相同,但是代码的设计我们需要变一下。
 * 
 */

import _ from 'lodash';

import {
  isEqual,
  isEqualObject,
  isEqualArray,
  isAllArray,
  isBasicData,
  isFunction
} from './utils';



const {
  createRoot
} = ReactDOM;


const states = [];
const stateSetters = [];
const dependenceArr = [];
const useMemoDepsArr = [];

let startIndex = 0;
let depsIndex = 0;
let useMemoStartIndex = 0;


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
  useMemoStartIndex = 0;
  const App = (await (import('./day062.jsx'))).default;
  root.render(<App />);
}

// ============================== memo、useMemo、useCallback重写



export const memo = (Fc) => {
  return class extends PurComponent {
    render() {
      return Fc && Fc(this.props);
    }
  }

}

class PurComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isEqual(nextProps, this.props) ||
      !isEqual(nextState, this.state)
    )
  }
}


export const useMemo = (Fc, deps) => {
  // 讲究手动收集依赖，然后再次调用的时候，对比依赖变化
  // 实际上逻辑和state重写差不多
  if (!isFunction(Fc)) throw TypeError('useMemo api first parmas must be a Function...');
  /**
   * 数据结构:
   *  [
   *   0: [cb(), deps],
   *   1: [cb(), deps]
   *  ]
   * 
   */

  /**
   * 判断依赖容器内部存在元素
   */

  if (useMemoDepsArr[useMemoStartIndex]) {
    // 取出存储的依赖
    const [_memo, _memoDeps] = useMemoDepsArr[useMemoStartIndex];
    // 对比依赖,判断依赖是否发生变化,这样比较是错误的,需要保证索引值的准确性
    // const isDepChanged = deps.every(dep => _memoDeps.includes(dep));
    const isDepChanged = deps.every((dep, index) => dep === _memoDeps[index]);
    // 依赖发生变化，重新执行回调函数
    if (!isDepChanged) return collectUseMemoDep(Fc, deps);
    // 依赖未发生变化
    useMemoStartIndex++;
    return _memo;
  } else {
    // 容器内部不存在元素，收集依赖
    return collectUseMemoDep(Fc, deps);
  }
};


const collectUseMemoDep = (Fc, deps) => {
  const _memo = Fc();
  useMemoDepsArr[useMemoStartIndex] = [
    _memo,
    deps && deps
  ];
  useMemoStartIndex++;
  return _memo;
}



export const useCallback = () => {

};