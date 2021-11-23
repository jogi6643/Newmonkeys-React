import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
export default class News extends Component {

    static defaultProps={
        country:'in',
        pageSize:5,
        category:'general',
    }
    static propTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }
  constructor() {
    super();
    console.log("Hello I am Contruct");
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
  }

  async componentDidMount(){
    //   let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51a8a4495f574562970cff0bf4a80ed5&page=1&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parseData = await data.json();
    //   this.setState({articles:parseData.articles,totalResults:parseData.totalResults,loading:false})
    //   console.log(parseData);
    this.updateNews()
  }

   async updateNews()
   {
    let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51a8a4495f574562970cff0bf4a80ed5&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState(
        {
            page:this.state.page-1,
            articles:parseData.articles,
            loading:false
        })
   }
  handlePreclick=async()=>{
    // let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51a8a4495f574562970cff0bf4a80ed5&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState(
    //     {
    //         page:this.state.page-1,
    //         articles:parseData.articles,
    //         loading:false
    //     })
    this.setState({page:this.state.page - 1})
    this.updateNews();

  }
  handleNextclick=async()=>{
    //   console.log('Next');
    // if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))
    // {

    // }
    // else
    // {
    // let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51a8a4495f574562970cff0bf4a80ed5&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState(
    //     {
    //         page:this.state.page + 1,
    //         articles:parseData.articles,
    //         loading:false
    //     })
    // }
    this.setState({page:this.state.page + 1})
    this.updateNews();
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News Monkeys -Top headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title.slice(0, 45):""}
                  description={element.description?element.description.slice(0, 88):""}
                  imageUrl={element.urlToImage?element.urlToImage:'https://assets.mspimages.in/wp-content/uploads/2021/11/Snapdragon-8-Gen-1.jpg'}
                  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" onClick={this.handlePreclick} className="btn btn-dark">	&#x2190; Priviews</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextclick} className="btn btn-dark">Next &#x2192;</button>
        </div>
      </div>
    );
  }
}
