class Test extends React.Component {
  state = {
    count: 0
  };

  componentDidMount() {
    this.setState({ count: this.state.count + 1 });

    console.log(this.state.count); // 0

    setTimeout(() => {
      this.setState({ count: this.state.count + 1 });

      console.log('setTimeout: ' + this.state.count); // 1
    }, 0);
  }

  //   render() {}
  render() {
    return <div>123</div>;
  }
}

// ReactDOM.render(<Test />, document.getElementById('app'));
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<Test />);
