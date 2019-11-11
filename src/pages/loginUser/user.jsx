import React,{Component} from 'react';
import memoryUtils from '../../utils/memoryUtils';

class User extends Component{
  render(){
    const user = memoryUtils.user
    return(
      <div >
      {user.userNo}
     </div>
    );
}
}

export default User;
