import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import './ShelfPage.css';

//views
//link to the add page
//get request
const mapStateToProps = state => ({
  user: state.user,
  state
});

class ShelfPage extends Component {
  constructor(props){
    super(props)
      this.state ={ 
        show: false
      }
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER})
    this.props.dispatch({type:'GET_LIST'})
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleDelete = (item) => {
    this.props.dispatch({ 
        type: 'DELETE_ITEM', payload: item.id
    })
}

handleShow = (event) => {
  console.log('click', this.state.show);
  this.setState({
   show: this.show = !this.show
  })
}
handleChangeFor = (propertyName) => {
  return (event ) => {
    this.setState({
      newItem : {
        ...this.state.newItem,
        [propertyName] : event.target.value
      }
    })
  }
}

addItem = () => {
  this.props.dispatch({
    type: 'POST_ITEM',
    payload: this.state.newItem
  })
}


  render() {
    let content = null;

    let itemListArray = this.props.state.itemList.map ((item, index) => {
      return <div key={index} className="card">
                <img src = {item.image_url} alt="Item Picture"/>
                <p>{item.description}</p>
                <button onClick={()=>this.handleDelete(item)}>Delete</button> 
                <button onClick={()=>this.handleShow()}>click</button>
            </div>
    })   
    
    // if (this.show == true){
    //  return <input placeholder="description" onChange={this.handleChangeFor("description")}/>
    //   <input placeholder="image URL" onChange={this.handleChangeFor("imageURL")}/>
    //   <button onClick={this.addItem}>Submit</button>
    // }


    if (this.props.user.userName) {
      content = (
        <div>
          <p>
            Info Page
          </p>
          <div onClick={this.handleShow}>
          <input placeholder="description" onChange={this.handleChangeFor("description")}/>
          <input placeholder="image URL" onChange={this.handleChangeFor("imageURL")}/>
          <button onClick={this.addItem}>Submit</button>
          </div>
          <div>{itemListArray}</div>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }

      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ShelfPage);
