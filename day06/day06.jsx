/**
 *  状态持久化概念与组件更新问题
 * 
 *  默认情况下，由于APP的state更新，导致
 *  APP函数重新执行。返回的JSX中，有调用Child
 *  组件行为，那么，Child函数也会重新执行。
 *  不管Child的props有没有状态更新，Child都会重新
 *  执行，用memo可以让React记住上一次Child的状态，
 *  当Child所涉及到的状态发生更新的时候，才会重新执行Child.
 * 
 *  const child = memo((props) => {}) => {};
 * 
 *  memo的核心对引用进行比较 => 浅比较
 *  childData在每次App函数重新执行的时候，都会赋值一个新的引用，
 *  所以memo对比props.childData的时候，引用地址会不同（值不同），
 *  所以child函数每次都会被执行。
 * 
 * 
 *  const childData = useMemo(() => ({count2}), [count2])
 *  useMemo，当count2发生更新的时候，useMemo会重新执行一次回调，
 *  返回一个新的值，赋值给childData。
 *  useMemo他用计算属性的方式缓存值，依赖项更新的时候，此会重新计算一次，
 *  并返回新的值。这样保证了依赖项不更新的时候，变量永远得到的是之前的值。
    *  1. 缓存状态（数据）的作用，以解决组件函数重新执行的问题。
    *  2. 计算属性
 * 
 * 
 *  useCallback和useMemo差不多，[]依赖不填的原因在于，函数一般都是静态的。
 *  const cbSetCount2 = useCallback(() => {
 *      setCount(count => count + 2) 
 *  };
 *  , [])
 * 
 * 
 *  什么是渐进式：inject、provide就是渐进式，
 *  类似一个包，做工程管理。让你觉得你需要的时候，你就从包里
 *  导入，不需要的话就从剔除，功能上的划分和渐进，不是工具上
 *  的划分和渐进。
 * 
 * 
 * 
 *  当组件是否更新自定义逻辑的时候，需要自己写PureComponent
 *  主要功能函数：shouldComponentUpdate(nextProps, nextState)
 *  true = > update render   false => noUpdate render
 *  
 * 
 * 
 * 
 */