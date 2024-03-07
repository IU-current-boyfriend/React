// // class Welcome extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     const { children } = props;
// //     // console.log("chidlren: =>", children.props.children); // children属性内部存放的是React元素
// //   }
// //   render() {
// //     return <div>{this.props.name}</div>;
// //   }
// // }

// // class App extends React.Component {
// //   render() {
// //     return (
// //       <div>
// //         <Welcome name="Tom">
// //           {
// //             <>
// //               <h1> This is Tom </h1>
// //               <h2> My age 20 </h2>
// //             </>
// //           }
// //         </Welcome>
// //       </div>
// //     );
// //   }
// // }

// // ReactDOM.render(<App />, document.getElementById("app"));

// // 组合组件，通过props传递的类型可以是任何类型。
// class Modal extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div className="modal-container">
//         {/* header组件 */}
//         <div className="modal-header-container">{this.props.header}</div>
//         {/* 侧边栏组件 */}
//         <div className="modal-side-container">{this.props.side}</div>
//         {/* 主体组件 */}
//         <div className="modal-main-container">{this.props.children}</div>
//       </div>
//     );
//   }
// }
// class HeaderComponent extends React.Component {
//   render() {
//     return <h1>This is Modal Header</h1>;
//   }
// }
// class SideComponent extends React.Component {
//   render() {
//     return <div>This is Modal Side </div>;
//   }
// }
// class MainComponent extends React.Component {
//   render() {
//     return <div>This is Modal Main</div>;
//   }
// }

// class App extends React.Component {
//   render() {
//     return (
//       //   <Modal header={HeaderComponent} side={SideComponent}>
//       //     {MainComponent}
//       //   </Modal> 错误的写法
//       <Modal header={<HeaderComponent />} side={<SideComponent />}>
//         {<MainComponent />}
//       </Modal>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById('app'));

// 用户按钮状态的切换

// class Toggle extends React.Component {
//   state = {
//     btnStatus: false
//   };
//   // Toggle.prototype
//   // { __proto__: Toggle.prototype }
//   // setBtnStatus() {
//   //   console.log('this: =>', this);
//   //   this.setState({
//   //     btnStatus: !this.state.btnStatus
//   //   });
//   // }
//   // setBtnStatus = () => {
//   //   console.log('this: =>', this);
//   //   this.setState({
//   //     btnStatus: !this.state.btnStatus
//   //   });
//   // };
//   setBtnStatus() {
//     console.log('this: =>', this);
//     this.setState({
//       btnStatus: !this.state.btnStatus
//     });
//   }
//   render() {
//     return (
//       <div className="btn-container">
//         {/* <button onClick={this.setBtnStatus.bind(this)}>{this.state.btnStatus ? '关闭' : '打开'}</button> */}
//         {/* <button onClick={this.setBtnStatus}>{this.state.btnStatus ? '关闭' : '打开'}</button> */}
//         {/* 缺点在于：每次Toggle组件在渲染的时候，() => props作为props传递一个新的函数给子组件，会导致子组件组件重新渲染 */}
//         <button onClick={() => this.setBtnStatus()}>{this.state.btnStatus ? '关闭' : '打开'}</button>
//       </div>
//     );
//   }
// }

// ReactDOM.render(<Toggle />, document.getElementById('app'));

class WarningBanner extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.warn) return null;
    return <div className="warning">Warning!</div>;
  }
  componentDidUpdate() {
    console.log('组件更新');
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>{this.state.showWarning ? 'Hide' : 'Show'}</button>
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById('app'));
