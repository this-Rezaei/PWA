import React, { Component } from 'react' 
import axios from 'axios';

export class Article extends Component {
    constructor(props) {
        super(props) 
        this.state = {
             articleList:[] ,
             isOffline:false
        }
    } 
    async componentDidMount(){  
          var url = 'http://localhost/api/article-list';
          axios.get(url)
          .then(response=>{
              this.setState({
                 articleList:response.data.data   
              }) 
              localStorage.setItem('articles',JSON.stringify(response.data.data ))
              
          })
          .catch(error=>{
              let apiData = localStorage.getItem('articles')
              console.log(apiData,'============')
              this.setState({
                articleList: JSON.parse(apiData),
                isOffline:true  
             })  
          })   
     } 
 
    render() {  
        return ( 
            <div className="table">
                {
                    (this.state.isOffline)? <div className="error">Offline</div>:null
                }
                <table border="1">
                <thead>
                <tr>
                   <td width="20%">Id</td>
                   <td width="50%">Name</td>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.articleList.map((item)=>{
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td> 
                                <td>{item.name}</td> 
                            </tr>
                        )
                    })
                }
                </tbody>
                </table> 
            </div>
        )
    }
}

export default Article
