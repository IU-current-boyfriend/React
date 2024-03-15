import _ from 'lodash';
/***
 * 一切的一切还是要从obj.a = 1000的形式说起：
 * 
 * 比如说，我现在有个对象obj
 * const obj = {
 *  a: 100,
 *  b: 200
 * }
 * 如果说，我想给obj对象里面的a属性赋值的话，我可以怎么做呢？
 * 这不很简单吗？直接obj.a = 1000;不就可以了！！！
 *  
 * 确实是这样的，但是仔细想一想obj.a = 1000有什么缺点吗？
 * 1. 语义化不明确。
 *    说到语义化不明确的话，有些人可能不喜欢听了，直接赋值的操作语义化还不行？那你真的是矫情～～不过，你仔细想一想，
 * 语义化确实不好。但是语义化不好的原因在于相比于其他方式，比如说，我现在有一个函数，这个函数的名称是setCount。那么当你
 * 看到这个函数名称的时候，你就会大概了解到这个函数的意思是操作count变量。
 *
 * 2. 不能做扩展
 *    直接赋值的操作只能单一的处理赋值逻辑，并不能扩展其它功能。如果说，我想在赋值操作之后扩展一些其它的逻辑，那么直接赋值的操作
 * 就没有办法实现。那么有些人肯定要说，proxy代理不是可以实现吗？是的，proxy可以实现，但是proxy不也是封装了一层吗？还是我们上面的
 * setCount函数，如果我们将obj.a = 1000的操作封装为一个函数，那么是不是在函数中既可以处理赋值的操作，也可以扩展其它的逻辑。
 * 
 * 3. 不易维护
 *    这个不易维护，我现在是深有体会。设想：一个项目中很多地方都用有obj.a = 100的操作，现在产品让你修改为obj.a = 1000的逻辑。好嘛！！整个
 * 项目中有100处这个obj.a = 100，你就改吧，一改一个不吭声，而且改遗漏了就是bug，就得背锅。你去改吧，真的艹了～～
 * 
 * 
 * 
 */


/**
 * 所以呀，根据我们上面的需求来说，我们要封装obj.a = 100的逻辑行为：
 *    但是，这种封装的扩展性太差，因为obj.a的赋值操作已经被我们固定死了。我们想要的是赋值的行为
 * 是动态的，而非静态赋值。如何设置为动态的赋值呢？很简单，我们通过函数参数的传递，来动态赋值。
 * 
 */
// const obj = {
//   a: 1,
//   b: 2
// }

// function setObjA() {
//   obj.a = 1000;
// };

// setObjA();

// console.log('obj: =>', obj.a);


/**
 * 动态赋值：
 *    现在看看我们优化后的代码，通过函数的参数传递，来实现动态赋值。
 * 但是现在还是有些问题，我们知道函数参数传递机制中：实际参数和形式参数传递参数时，
 * 实际上对于引用类型的数据来说，传递的是引用。这也就意味着，如果外界传递的是引用
 * 类型的数据，而在函数内部我们将会影响到函数外部的数据。
 *    这会导致什么呢？这会导致函数不纯，其实这点和学习React组件单项数据流类似，组件
 * 是不能够修改props属性，组件相当于函数，props相当于函数的形式参数，props是用户
 * 传递的配置项，组件（函数）是不能够影响到外界的配置项。
 * 
 * 
 */
// const obj = {
//   a: 1,
//   b: 2
// }
  
// function setObj(origin, key, value) {
//   origin[key] = value;
// };
  
// setObj(obj, 'a', 1000);
  
// console.log('obj: =>', obj.a);

/***
 * 
 * 为了能够让函数变的更纯，我们还需要修改一下代码：
 *    修改的思路也很简单，真的是很有意思，其思路和React中props的用法很像：
 *    我们在函数内部clone一份外界传递进来的配置项，在函数内部使用。（这个思路是不是和clone一份props，然后赋值给组件的state使用很像）。
 */
// const obj = {
//   a: 1,
//   b: 2
// }
  
// function setObj(origin, key, value) {
//   const target = _.cloneDeep(origin);
//   target[key] = value;
//   console.log('target: =>', target.a); // 1000
// };
  
// setObj(obj, 'a', 1000);
// console.log('origin: =>', obj.a); // 1


/**
 * 
 * 经过我们的优化，现在setObj函数已经变的纯一些，函数内部并不会影响到外界的配置项。
 * 但是，现在带来的问题是：
 *      我们没有办法获取到更改之后的数据了，比如说，我外界想要使用target对象。但我现在是没有办法获取到target对象，因为它存在于函数内部。
 * 解决的办法也很简单，我们将其target对象提供给外界。提供的方式是通过返回对象的形式提供给外界使用
 *  
 */
// const obj = {
//   a: 1,
//   b: 2
// }
  
// function setObj(origin, key, value) {
//   const target = _.cloneDeep(origin);
//   target[key] = value;
//   return {
//     target
//   }
// };
  
// const { target } = setObj(obj, 'a', 1000);
// console.log('target: =>', target);

/***
 * 
 * 很好，现在的代码能够在外界获取到修改后的target对象了。
 * 但是现在的代码还有问题：
 *  1. 想要修改obj内部的属性，并需要重复的调用setObj函数。
 *  2. 重复调用setObj函数之后，由于setObj函数返回的是对象形式，那么外界在使用target对象的时候，将会发生属性名称不存在的问题。 
 * 
 * 
 * 对于问题2来说，我们先不去解决，我们先来看看问题1：
 *    如果我想要修改属性a和属性b，那么我就要重复调用两次setObj函数，setObj函数内部就要针对于origin对象clone两次。这样
 * 做的话有必要吗？
 *    我们setObj函数第一步目的是为了clone一份Origin对象使用。那么我们为什么不能让setObj函数想外部提供一个接口，这个
 * 接口可以帮我们修改需要修改的属性值呢？我想怎么做呢？比如说像下面这种形式：
 *  
 * const [ obj, setObjA ] = useSetObj(obj, 'a');
 * setObjA(1000);
 * console.log(obj.a); // 1000 
 * 
 * 你看我上面方式，是不是比下面的方式好太多。首先我们直接解决了问题2，因为我们useSetObj返回的是数组的形式，所以就不存在
 * 对象解构属性名称不存在的问题。
 * 
 * 其实useSetObj函数的语义化很好，useSetObj(obj, 'a')表示调用设置obj.a属性的函数，然后给你返回obj对象，和设置属性a的专属方法，
 * 你通过这个专属方法可以设置obj对象的属性a。
 * 
 * 这种思想真的超级棒，这种集成封装的思想是我们需要学习的。上面的代码就类似什么，调用useSetObj函数传入你想要修改的属性名称，它就会
 * 给你返回针对于修改某个属性的专属方法和属性本身，你就可以用它提供的接口去修改属性。这种方式在项目后期扩展和维护的时候，肯定要比obj.a = 100
 * 的形式好很多。
 * 
 */

// const obj = {
//   a: 1,
//   b: 2
// }
  
// function setObj(origin, key, value) {
//   const target = _.cloneDeep(origin);
//   target[key] = value;
//   return {
//     target
//   }
// };
  
// const { target } = setObj(obj, 'a', 1000);
// const { target } = setObj(obj, 'b', 2000);
// console.log('target: =>', target);

/**
 * 既然这种方式这么优秀，我们赶紧来实现一下：
 *   其实实现的思路就是利用闭包函数。
 * 
 */
// const obj = {
//   a: 1,
//   b: 2
// }
  
// function useSetObj(origin) {
//   const _target = _.clone(origin);
//   const _setTarget = (propertyName, value) => {
//     _target[propertyName] = value;
//   }
//   return [
//     _target,
//     _setTarget
//   ]
// }

// const [ newObj, setNewObj ] = useSetObj(obj);
// setNewObj('a', 1000);
// console.log('obj: =>', newObj);

// setNewObj('b', 2000);

// console.log('obj: =>', newObj);

// continue...todo

/**
 * 
 * 现在还有一个场景：关于useEffect
 * 现在有很多数据：
 *  const obj1 = {}
 *  const obj2 = {}
 *  const obj3 = {}
 *
 * const [data1, setData1] = useSetObj(obj1);
 * const [data2, setData2] = useSetObj(obj2);
 * const [data3, setData3] = useSetObj(obj3);
 * 
 * useEffect(() => {
 *  //执行回调函数
 * }, [data1]) 
 * 
 * useEffect是如何知道data1变化的呢？如果我们把useSetObj函数包装之后的data1、data2、data3就这样丢到外界去，
 * 那么useEffect如何能够感应到data1、data2、data3的变化呢？所以说，我们还需要对useSetObj函数进行加工，我们想办法
 * 能够让useEffect感知到data1的变化，其实思路也很简单，data1是如何变化的？那肯定是通过setData1去操作改变的，所以
 * 我们想办法将data1和setData1对应存储起来，当setData1被调用的时候，就说明data1发生了变化，此时useEffect就能够重新
 * 执行回调函数。
 * 
 *
 * 如果要保存，而且还需要对应保存，那么我们就需要创建三个东西：
 * 1. 存储state状态的容器
 * 2. 存储设置state状态的容器
 * 3. 索引值，对应存储
 * 
 */
// const states = [];
// const stateSetters = [];
// let startIndex = 0;

// const useState = (initialValue) => {
//   // 1. 创建states状态，需要判断是否存在state，如果不存在的话，储存状态；如果存在的话，直接取出状态
//   states[startIndex] = states[startIndex] ||  _.cloneDeep(initialValue);
//   // 2. 创建设置states状态的函数
//   /**
//    * 这里因为是一个闭包函数，闭包函数执行的时候，会根据作用域查找startIndex的值，但是由于
//    * startIndex的值会被缓存，所以闭包函数在执行的时候，都会是最新的startIndex值。我们想有个
//    * 局部的startIndex值，这样闭包函数每次执行的时候才能缓存startIndex的值。
//    *    解决方式也很简单，立即执行函数，通过函数参数的传递解决问题
//    */
//   // stateSetters[startIndex] = (newValue) => {
//   //   states[startIndex] = newValue;
//   // }
//   if (!stateSetters[startIndex] !== 'function') {
//     stateSetters[startIndex] = ((index) => {
//       return (newValue) => {
//         states[index] = newValue;
//       }
//     })(startIndex);
//   }
  
//   // 3. 获取对应的状态和设置状态的方法
//   const _state = states[startIndex];
//   const _setState = stateSetters[startIndex];

//   // 自增索引值
//   startIndex ++;

//   return [
//     _state,
//     _setState
//   ]
// };


// function App() {
//   const [ count1, setCount1 ] = useState(0);
//   const [ count2, setCount2 ] = useState(0);
//   return (
//     <div className="app-container">
//       <h1>count1: { count1 }</h1>
//       <h2>count2: { count2 }</h2>
//       <button onClick={ setCount1(count1 + 1) }>ADD COUNT1</button>
//       <button onClick={ setCount2(count2 + 2) }>ADD COUNT2</button>
//     </div>
//   );
// }


// // render函数，用于重新渲染视图
// function render() {
//   startIndex = 0;
//   App();
// };

// render();

// ReactDOM.render(
//   App(),
//   document.getElementById('app'),
// );


/**
 * 到目前为止，obj.a => 推导到 => useState的逻辑已经完成，好好的总结一下吧。
 */