/**
 *
 * 现在的需求是有两个计数组件，但是组件触发计数的行为不同:
 * 1. 现在遇见的问题：
 *   CounterClick组件和CounterHover组件内部除render函数内部的JSX元素不同，而其它逻辑都是相同的。
 * 对于这种相同的逻辑，我们是否能够抽离复用呢？能够想到的解决方案：高阶组件，但是高阶组件不适合现在的场景，
 * 因为render内部的JSX元素结构不同。
 *   那么解决方案是什么呢？
 *  1. 我们将这些可以复用的逻辑（状态）提升到父组件中，然后通过props来处理。这也是React中俗称的“状态提升”
 *  2. 将子组件可以复用的逻辑提升到父组件中，但是问题是两个组件虽然是逻辑抽离复用了，但是状态会被共享。
 *   我们的需求是：复用的逻辑依旧可以复用，但是状态是独立的，是单独存在的。
 *   那么解决方案是什么呢？可以利用render props
 *  1. 通过this.props.children的方式解决
 *  2. 通过props的方式传递render（render名称可以随意取）函数解决
 *
 *
 */

// class CounterClick extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   state = {
//     count: 0
//   };

//   addCount() {
//     this.setState({
//       count: this.state.count + 1
//     });
//   }

//   reduceCount() {
//     this.setState({
//       count: this.state.count - 1
//     });
//   }

//   render() {
//     return (
//       <div className="counter-click-cotainer">
//         <h2 className="title">{this.state.count}</h2>
//         <div className="btns-group">
//           <button className="add-btn" onClick={this.addCount.bind(this)}>
//             ADD
//           </button>
//           <button className="reduce-btn" onClick={this.reduceCount.bind(this)}>
//             REDUCE
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// class CounterHover extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   state = {
//     count: 0
//   };

//   addCount() {
//     this.setState({
//       count: this.state.count + 1
//     });
//   }

//   reduceCount() {
//     this.setState({
//       count: this.state.count - 1
//     });
//   }

//   render() {
//     return (
//       <div className="counter-hover-cotainer">
//         <h2 className="title">{this.state.count}</h2>
//         <div className="btns-group">
//           <button className="add-btn" onMouseEnter={this.addCount.bind(this)}>
//             ADD
//           </button>
//           <button className="reduce-btn" onMouseEnter={this.reduceCount.bind(this)}>
//             REDUCE
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

/**
 * this.props.children方式实现：
 *
 *
 */

// class CounterClick extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div className="counter-click-cotainer">
//         <h2 className="title">{this.props.count}</h2>
//         <div className="btns-group">
//           <button className="add-btn" onClick={this.props.addCount}>
//             ADD
//           </button>
//           <button className="reduce-btn" onClick={this.props.reduceCount}>
//             REDUCE
//           </button>
//         </div>
//       </div>
//     );
//   }
// }
// class CounterHover extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div className="counter-hover-cotainer">
//         <h2 className="title">{this.props.count}</h2>
//         <div className="btns-group">
//           <button className="add-btn" onMouseEnter={this.props.addCount}>
//             ADD
//           </button>
//           <button className="reduce-btn" onMouseEnter={this.props.reduceCount}>
//             REDUCE
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// class CommonCounterComponent extends React.Component {
//   state = {
//     count: 0
//   };
//   state = {
//     count: 0
//   };
//   addCount() {
//     this.setState({
//       count: this.state.count + 1
//     });
//   }
//   reduceCount() {
//     this.setState({
//       count: this.state.count - 1
//     });
//   }
//   render() {
//     return (
//       <div className="common-component-container">
//         {this.props.children({
//           count: this.state.count,
//           addCount: this.addCount.bind(this),
//           reduceCount: this.reduceCount.bind(this)
//         })}
//       </div>
//     );
//   }
// }

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div className="warpper">
//         {/* CounterClick组件 */}
//         <CommonCounterComponent>
//           {({ count, addCount, reduceCount }) => <CounterClick count={count} addCount={addCount} reduceCount={reduceCount} />}
//         </CommonCounterComponent>
//         {/* CounterHover组件 */}
//         <CommonCounterComponent>
//           {props => <CounterHover {...props} />}
//           {/* {({ count, addCount, reduceCount }) => <CounterHover count={count} addCount={addCount} reduceCount={reduceCount} />} */}
//         </CommonCounterComponent>
//         {/* <CounterClick count={this.state.count} addCount={this.addCount.bind(this)} reduceCount={this.reduceCount.bind(this)} />
//         <CounterHover count={this.state.count} addCount={this.addCount.bind(this)} reduceCount={this.reduceCount.bind(this)} /> */}
//       </div>
//     );
//   }
// }

class CounterClick extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="counter-click-cotainer">
        <h2 className="title">{this.props.count}</h2>
        <div className="btns-group">
          <button className="add-btn" onClick={this.props.addCount}>
            ADD
          </button>
          <button className="reduce-btn" onClick={this.props.reduceCount}>
            REDUCE
          </button>
        </div>
      </div>
    );
  }
}
class CounterHover extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="counter-hover-cotainer">
        <h2 className="title">{this.props.count}</h2>
        <div className="btns-group">
          <button className="add-btn" onMouseEnter={this.props.addCount}>
            ADD
          </button>
          <button className="reduce-btn" onMouseEnter={this.props.reduceCount}>
            REDUCE
          </button>
        </div>
      </div>
    );
  }
}

class CommonCounterComponent extends React.Component {
  state = {
    count: 0
  };
  addCount() {
    this.setState({
      count: this.state.count + 1
    });
  }
  reduceCount() {
    this.setState({
      count: this.state.count - 1
    });
  }
  render() {
    return (
      <div className="common-component-container">
        {this.props.render({
          count: this.state.count,
          addCount: this.addCount.bind(this),
          reduceCount: this.reduceCount.bind(this)
        })}
      </div>
    );
  }
}

/***
 * props render方式实现：
 *
 */
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="warpper">
        {/* CounterClick组件 */}
        <CommonCounterComponent render={props => <CounterClick {...props} />}></CommonCounterComponent>
        {/* CounterHover组件 */}
        <CommonCounterComponent render={props => <CounterHover {...props} />}></CommonCounterComponent>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
