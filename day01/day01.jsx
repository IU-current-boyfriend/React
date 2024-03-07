// class MyComponent extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   state = {
//     listData: [
//       {
//         id: 0,
//         content: "one",
//       },
//       {
//         id: 1,
//         content: "two",
//       },
//       {
//         id: 2,
//         content: "three",
//       },
//     ],
//   };

//   render() {
//     return (
//       <div className="wrapper">
//         {this.state.listData.map((item) => (
//           <div key={item.id}>
//             <span className="id"> {item.id} </span>
//             <span className="content"> {item.content} </span>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

// ReactDOM.render(<MyComponent />, document.getElementById("app"));

// 不可变对象
// const oH1 = <h1> This is h1 </h1>;
// 修改内容
// oH1.props.children = "This is new H1";
// 也就是说，oH1不能够分配属性children，因为对象是只读的，不可变immutable对象。
// day01.jsx:41 Uncaught TypeError: Cannot assign to read only property 'children' of object '#<Object
// console.log("oH1: =>", oH1);

// const oH2 = React.createElement(
//   "h2",
//   {
//     className: "h2-container",
//   },
//   "This is H2"
// );
// oH1.props.children = "This is new H2";
// console.log("oH2: =>", oH2);

const olem = React.createElement();
console.log('olem: =>', olem);
// class IntervalRender extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div className="interval-container">
//         <span>hello interval ==== </span>
//         <span>{new Date().toLocaleTimeString()}</span>
//       </div>
//     );
//   }
// }

// function setIntervalMehtod() {
//   setInterval(() => {
//     ReactDOM.render(<IntervalRender />, document.getElementById("app"));
//   });
// }

// setIntervalMehtod();

// ReactDOM.render(<IntervalRender />, document.getElementById("app"));
