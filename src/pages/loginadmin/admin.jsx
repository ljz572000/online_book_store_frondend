import React,{Component} from 'react';
import memoryUtils from '../../utils/memoryUtils';

class Admin extends Component{
  render(){
    const user = memoryUtils.user;
    if (JSON.stringify(user) === "{}") {
      this.props.history.replace('/login');
      return(<div></div>);
    }
    else {
      return(
        <div >
        {user.userNo}
       </div>
      );
    }
}
}

export default Admin;
