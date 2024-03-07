/**
 * searchBar => input => inputText => fetchData => data
 * table (data)
 * 整体的逻辑：
 *  searchBar承载着获取数据的逻辑，获取到数据之后，交给table进行渲染视图。
 *  但是table不能作为子组件放在searchBar里面，因为这样的话searchBar的复用性就很低，
 *  因为table获取到数据渲染的视图也不同。
 *
 *  我的想法：为什么不能直接在父组件中声明好数据，然后由searchBar获取数据，获取完成之后再
 *  将props赋值，最后table直接从父组件里面用数据。现在一想，这种方案肯定不好。不如直接用render props
 *  来解决。
 *
 *  render props解决的流程是什么？
 *      1. 根组件提供获取数据的方式给searchBar组件
 *      2. searchBar组件内部通过props提供的获取数据方法获取数据
 *      3. 将获取到的数据通过props render传递给table
 *      4. table拿到数据进行渲染
 *  这样的方式有什么好处呢？
 *      searchBar组件集成性很强，其有很强的复用性和扩展性。
 *
 *
 */

class MySearchInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="search-input">
        <input placeholder={this.props.placeholder} onInput={this.props.setInputText} />
      </div>
    );
  }
}

class MySearchBar extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    // 需要提供给table的数据
    data: [],
    // 需要提供给filed的数据
    inputText: ''
  };

  // 获取数据
  async componentDidMount() {
    const result = await this.props.fetchData();
    this.setState({
      data: result
    });
  }

  setInputText(e) {
    this.setState({
      inputText: e.target.value.trim()
    });
  }

  render() {
    const { data, inputText } = this.state;
    return (
      <div className="search-bar-container">
        {/* 搜索框组件 */}
        <div className="search-input-container">
          <MySearchInput placeholder="请输入..." setInputText={this.setInputText.bind(this)} />
        </div>
        {/* props render部分 */}
        <div className="search-main-container">
          {this.props.render(
            inputText.length === 0
              ? data
              : data.filter(item => {
                  return `${item[this.props.filed]}`.includes(inputText);
                })
          )}
        </div>
      </div>
    );
  }
}

class MyTable extends React.Component {
  render() {
    return (
      <table border="1" width="300">
        <tbody>
          {this.props.tableData &&
            this.props.tableData.map(item => (
              <tr key={item.id}>
                {Object.keys(item).map(key => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

class App extends React.Component {
  state = {
    data: {
      students: [
        {
          id: 1,
          name: '郑聪',
          age: 20
        },
        {
          id: 2,
          name: '李智恩',
          age: 25
        },
        {
          id: 3,
          name: 'IU',
          age: 18
        }
      ],
      teachers: [
        {
          id: 4,
          name: '小明',
          course: '语文'
        },
        {
          id: 5,
          name: '小红',
          course: '数学'
        },
        {
          id: 6,
          name: '小高',
          course: '化学'
        }
      ]
    }
  };

  getStudentsData() {
    return this.state.data.students;
  }

  render() {
    return (
      <div className="search-filed-container">
        {/* 第一个组件 */}
        <MySearchBar
          // 获取数据的方法
          fetchData={this.getStudentsData.bind(this)}
          // table查询的条件
          filed="name"
          // render props
          render={data => {
            return <MyTable tableData={data} />;
          }}
        />
        {/* 第二个组件 */}
        <MySearchBar
          // 获取数据的方法
          fetchData={this.getStudentsData.bind(this)}
          // table查询的条件
          filed="age"
          // render props
          render={data => {
            return <MyTable tableData={data} />;
          }}
        />

        {/* 第三个组件 */}
        <MySearchBar
          // 获取数据的方法
          fetchData={this.getStudentsData.bind(this)}
          // table查询的条件
          filed="id"
          // render props
          render={data => {
            return <MyTable tableData={data} />;
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
