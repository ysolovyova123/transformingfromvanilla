const axios = require('axios');
import React from 'react';
import ReactDOM from 'react-dom';
import Details from '../src/details'

class Main extends React.Component {
  constructor () {
    super()
    this.state = {
      friends: []
    }
    this.destroy = this.destroy.bind(this)
    this.updateRating = this.updateRating.bind(this)
    this.create = this.create.bind(this)
  }

  async create() {
    await axios.post(`api/friends/`)
    const response = await axios.get('api/friends')
    const data = response.data // json data is actually stored on the data property
    this.setState({
      friends: data
    })
  }

  async destroy(id) {
    await axios.delete(`api/friends/${id}`)
    const response = await axios.get('api/friends')
    const data = response.data // json data is actually stored on the data property
    this.setState({
      friends: data
    })
  }

  async updateRating(id, newRating) {
    await axios.put(`api/friends/${id}`,{rating: newRating})
    const response = await axios.get('api/friends')
    const data = response.data // json data is actually stored on the data property
    this.setState({
      friends:data
    })
  }

  async componentDidMount () {
    const response = await axios.get('api/friends')
    const data = response.data // json data is actually stored on the data property
    this.setState({
      friends: data
    })
    console.log(data)
  }

  render() {
    if (this.state.friends.length > 0) {
    return (
    <div>
      <button onClick={() => this.create()}>Create A Friend</button>
      {this.state.friends.map(friend => {return (
      <Details key={friend.id} name={friend.name} rating={friend.rating} destroy = {this.destroy} id = {friend.id} updateRating = {this.updateRating} create = {this.create} />
    )})}
    </div>
    )}
    else {
      return <div>Loading</div>
    }
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('friendslist')
);


// const render = (friends)=> {
//   const ul = document.querySelector('ul');
//   const error = document.querySelector('#error');
//   error.innerText = '';
//   friends.sort((a, b)=> b.rating - a.rating);
//   const html = friends.map( friend => {
//     return `
//       <li data-id='${friend.id}'>
//         <h2>${ friend.name }</h2>
//         <span>${ friend.rating }</span>
//         <button data-id='${friend.id}'>+</button><button data-id='${friend.id}'>-</button><button data-id='${friend.id}'>x</button>
//       </li>
//     `;
//   }).join('');
//   ul.innerHTML = html;
// };

// const init = async()=> {
//   const response = await axios.get('/api/friends');
//   let friends = response.data;
//   render(friends);
//   const ul = document.querySelector('ul');
//   const form = document.querySelector('form');
//   const error = document.querySelector('#error');

//   ul.addEventListener('click', async(ev)=> {
//     if(ev.target.tagName === 'BUTTON'){
//       if(ev.target.innerHTML === 'x'){
//         const id = ev.target.getAttribute('data-id')*1;
//         await axios.delete(`/api/friends/${id}`);
//         friends = friends.filter(friend => friend.id !== id);
//         render(friends);
//       }
//       else {
//         const id = ev.target.getAttribute('data-id')*1;
//         const friend = friends.find(item => item.id === id);
//         const increase = ev.target.innerHTML === '+';
//         friend.rating = increase ? ++friend.rating : --friend.rating;
//         await axios.put(`/api/friends/${friend.id}`, { rating: friend.rating });
//         render(friends);
//       }
//     }
//   });

//   form.addEventListener('submit', async(ev)=> {
//     ev.preventDefault();
//     try {
//       const response = await axios.post('/api/friends');
//       friends.push(response.data);
//       render(friends);
//     }
//     catch(ex){
//       error.innerText = ex.response.data.error;
//     }
//   });
// };

// init();
