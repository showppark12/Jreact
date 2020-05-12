import React from 'react';
import './App.css';
import api from './api.js'
import Postview from './Component/Postview'


class App extends React.Component{
  constructor(props){
  super(props)
    this.state={
      title:'',
      content:'',
      results:[]
    }
  }

  componentDidMount(){
    this.getPosts()
  }

  getPosts = async () => {
    const _results= await api.getAllPosts()
    this.setState({results:_results.data});
  }

  handlingChange = (event) =>{
    this.setState({[event.target.name]:event.target.value});
  }

  hadnlingSubmit = async (event) =>{
    event.preventDefault() //이것이 새로고침을 막아주는 기능이고 새로고침을 client에게 보여주지않기위해서 리액트를쓰는거지
    let result = await api.createPost({
      title:this.state.title,
      content:this.state.content
    })
    console.log("완료됨", result.data)
    this.setState({title:'',content:''})
    this.getPosts();
  }

  handleDelete = async (event) =>{
    await api.deletePost(event.target.value)
    this.getPosts()
  }



  render(){
    return (
      <div className="App">
          <div className= "PostingSection">
            <h2>블로그 글 작성하기</h2>
            <form onSubmit={this.hadnlingSubmit}>
            <input
            name="title"
            value={this.state.title}
            onChange={this.handlingChange}
            />
            <br/>
            <textarea
            name="content"
            value={this.state.content}
            onChange={this.handlingChange}
            />
            <button type="submit">제출하기</button>
            </form>

          </div>
          <div className="ViewSection">
            {
              this.state.results.map((post) =>
              <>
              <Postview key= {post.id} id= {post.id} title={post.title} content={post.content}/>
              <button value ={post.id} onClick ={this.handleDelete}>삭제하기</button>
              </>
              )

            }
          </div>
      </div>
    );
  }
}

export default App;
