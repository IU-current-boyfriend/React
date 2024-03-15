/**
 * 首先我们来熟悉一下React中的useState、useReducer，然后再来重写这些Api:
 * 
 * 
 */


// const { 
//   useState,
//   useReducer,
//   useEffect
// } = React;
import {
  useState,
  useReducer,
  useEffect,
  root,
} from './react.jsx';


// const { createRoot } = ReactDOM;

// const root = createRoot(document.getElementById('app'));


function App() {
  // const [ count1, setCount1 ] = useState(0);
  // const [ count2, setCount2 ] = useState(100);

  const reducer = (count, { type, pyload }) => {
    switch (type) {
      case 'add':
        return count + pyload;
      case 'minus':
        return count - pyload;
      default:
        return count;
    }
  }

  const [count, dispatch] = useReducer(reducer, 0);


  useEffect(() => {
    console.log('deps count... ');
  }, [count]);

  useEffect(() => {
    console.log('deps count2... ');
  }, [count]);


  // useEffect(() => {
  //   console.log('deps emprty ...');
  // });


  // const reducer = (count, { type, pyload }) => {
  //   switch(type) {
  //     case 'add':
  //       return count + 1;
  //     case 'minus':
  //       return count - 2;
  //     default:
  //       return count;
  //   }
  // }

  // const [ count1, dispatch ] = useReducer(reducer, 0);

  // useEffect(() => {
  //   console.log('default effect callback executor...');
  // }, []);

  // useEffect(() => {
  //   console.log('count1 effect callback executor...');
  // }, [ count1 ]);


  return (
    // <div className="app-wrapper">
    //   <h1>{ count1 }</h1>
    //   <button onClick={ () => setCount1(count1 + 1) }>ADD COUNT1</button>
    //   <button onClick={ () => setCount1(count1 - 1) }>MINUS COUNT1</button>
    //   <hr />
    //   <h1>{ count2 }</h1>
    //   <button onClick={ () => setCount2((count2) => count2 + 1)}>ADD COUNT2</button>
    //   <button onClick={ () => setCount2((count2) => count2 - 1)}>MINUS COUNT2</button>
    // </div>
    <div className="app-wrapper">
      <h1>{count}</h1>
      <button onClick={() => dispatch({ type: 'add', pyload: 1 })}>ADD COUNT</button>
      <button onClick={() => dispatch({ type: 'minus', pyload: 2 })}>MINUS COUNT</button>
    </div>
  );
}

root.render(<App />);

export default App;