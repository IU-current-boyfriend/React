// const { createRoot } = ReactDOM;
// const { useState, memo, useMemo, useCallback } = React;
import {
  useState,
  root,
  memo,
  useMemo,
  useCallback
} from './react';




// 一切的一切都要从都要从一个现象说起:
/**
 * 
 *  无论是count1状态，还是count2状态发生变化，App组件都会重新被调用，
 *  然后返回全新的JSX元素。整个流程就会存在以下疑问点：
 *  1. App每次调用都会返回全新的JSX元素，DOM元素也都会重新渲染吗？
 *    虽然App每次调用都会返回全新的JSX元素，但是DOM元素并不都是全部重新渲染构建，
 *  因为React底层会通过虚拟DOM的算法对DOM结构进行优化。既然App每次调用的时候都会
 *  返回新的JSX元素，那么Count组件作为App的子组件自然也会重新被调用，但是组件内部
 *  在渲染的时候，React依然会进行虚拟DOM的优化。
 *    其实这是两个概念：当状态发生变化，组件重新被调用，组件内部重新渲染。
 *    我们现在需要注意的事：
 *       组件重新被调用时，可能并不会因为组件内部需要用到的状态发生改变而被调用，而是
 *  因为其它状态发生变化，导致组件被调用。如果是这种场景（例如下面的场景），那么子组件
 *  其实没有必要被调用调用，因为组件内部无论是逻辑还是视图都未发生变化。所以，理论上我们
 *  要组织这种组件被调用，很显然此时组件的调用是一种浪费。
 * 
 * 
 *  按照我们现在代码结构来看：
 *    对于Count组件来说，我们的预期：只有count1状态发生变化的时候，Count组件才要重新
 *  被渲染。此时就可以使用到memo:
 * 
 *  memo api可以看出来，回调函数将返回JSX元素，可以说就是返回一个组件。
 *  当组件依赖的依赖发生变化的时候，组件将会重新被调用和执行，而不被依赖的依赖
 *  发生变化的时候，组件将不会被调用和执行。
 * 
 * 
 *  但是现在需求变了，我想当某些依赖发生变化的时候，再去重新渲染组件，如果依赖
 *  没有发生变化的时候，则不需要重新渲染组件。
 *  memo是什么呢？memo是组件依赖的依赖发生变化时，则会重新渲染组件。
 *  而我现在是想指定某些依赖发生变化时，则会重新渲染组件，也就是说，这些依赖可能不被组件所依赖。
 * 
 *  比如说：
 *    我现在想的是：
 *      状态count1和count3发生变化的时候，重新渲染CountComponent组件。但是现在memo api
 *  就无法满足我们的需求了，因为count3状态并不被组件CountComponent组件所依赖。所以，我们现在
 *  要用useMemo api和memo api配合使用满足需求。
 * 
 * 
 *  useMemo就等于计算属性，如果count1和count3发生变化，则返回全新的值。如果没有发生变化，则返回旧的值
    ,至于组件是否能够被重新渲染，则取决于memo通过对props的对比进行确定。


    如果是函数呢？
 *    
 */

// const CountComponent = memo((props) => {
//   console.log('count render...');
//   return (
//     <div className="count-container">
//       <h2>count component: {props.count1} </h2>
//     </div>
//   );
// })


// const CountComponent = memo(props => {
//   console.log('count render...');
//   // console.log('props: =>', props);
//   return (
//     <div className="count-container">
//       <h2>count1 component: {props.countComponentData.count1}</h2>
//       <h2>count3 component: {props.countComponentData.count3}</h2>
//       <button onClick={props.setType}>SET TYPE</button>
//     </div>
//   );
// });

// function App() {
//   const [count1, setCount1] = useState(0);
//   const [count2, setCount2] = useState(0);
//   const [count3, setCount3] = useState(0);

//   // useMemo就等于计算属性，如果count1和count3发生变化，则返回全新的值。如果没有发生变化，则返回旧的值
//   // 至于组件是否能够被重新渲染，则取决于memo通过对props的对比进行确定。
//   const countComponentData = useMemo(() => ({
//     count1,
//     count3,
//   }), [count1, count3]);


//   // 每次点击SET TYPE按钮，CountComponent组件都会执行，这也很正常，因为每次APP调用，都会重新
//   // 声明一个全新的setType函数，setType函数引用变化，CountComponent就会重新渲染，即便使用了
//   // memo api。


//   // const setType = () => {
//   //   console.log('setType method executor...');
//   // };

//   // 所以，这里需要使用useCallback api, 其实useCallback也类似useMemo，都是缓存依赖
//   // 然后交由memo进行对比处理，决定是否重新渲染组件。useCallback不填依赖的原因在于，
//   // 函数一般都是静态的，不像状态那种是动态的，所以那种依赖变化，需要重新生成一个函数的逻辑就很奇怪。

//   const setType = useCallback(() => { setCount1(count => count + 1) }, []);



//   return (
//     <div className="warpper">
//       <h2>count1: {count1}</h2>
//       <h2>count2: {count2}</h2>
//       <h2>count3: {count3}</h2>
//       {/* <Count count1={count1} /> */}
//       {/* <CountComponent count1={count1} /> */}
//       <button onClick={() => setCount1(count => count + 1)}>ADD COUNT1</button>
//       <button onClick={() => setCount2(count => count + 1)}>ADD COUNT2</button>
//       <button onClick={() => setCount3(count => count + 1)}>ADD COUNT3</button>
//       <CountComponent countComponentData={countComponentData} setType={setType} />
//     </div>
//   );
// };




// function CountComponent(props) {
//   console.log('count render...');
//   // console.log('props: =>', props);
//   return (
//     <div className="count-container">
//       <h2>count1 component: {props.countComponentData.count1}</h2>
//       <h2>count3 component: {props.countComponentData.count3}</h2>
//     </div>
//   );
// }


// const root = createRoot(document.getElementById('app'));




// 重写memo、useMemo、useCallback部分:


// const CountComponent = memo((props) => {
//   console.log('count render...');
//   return (
//     <div className='count-container'>
//       <h1>count component: {props.count1}</h1>
//     </div>
//   );
// });

const CountComponent = memo((props) => {
  console.log('count render...');
  return (
    <div className='count-container'>
      <h1>count1: {props.childrenData.count1}</h1>
      <h2>count2: {props.childrenData.count2}</h2>
    </div>
  );
});


// function CountComponent(props) {
//   return (
//     <div className='count-container'>
//       <h1>count component: {props.count1}</h1>
//     </div>
//   );
// }


function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const childrenData = useMemo(() => ({ count1, count2 }), [count1, count2]);

  return (
    <div className='warpper'>
      <h1>count1: {count1}</h1>
      <h1>count2: {count2}</h1>
      <h1>count3: {count3}</h1>
      <CountComponent childrenData={childrenData} />
      <button onClick={() => setCount1(count => count + 1)}>ADD COUNT1</button>
      <button onClick={() => setCount2(count => count + 1)}>ADD COUNT2</button>
      <button onClick={() => setCount3(count => count + 1)}>ADD COUNT3</button>
    </div>
  );
}

root.render(<App />);

export default App;
