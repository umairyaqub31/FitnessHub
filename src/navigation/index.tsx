import * as React from 'react';
import BottomTabNavigator from "./TabNavigator";
import TrainerBottomTabNavigator from './Trainer/TabNavigator';
import { AuthStackNavigator } from "./StackNavigator";
import { RoleStackNavigator } from './RoleStackNavigator';
import { Host } from 'react-native-portalize';
import {connect} from 'react-redux';

class Navigation extends React.Component{


  render(){
    return(
      <Host>
        {this.props.user && this.props.user.roleId === 3 ? 
            <BottomTabNavigator/> : this.props.user && this.props.user.roleId === 2 ?
            <TrainerBottomTabNavigator/>
        :
          //  <AuthStackNavigator />
          <RoleStackNavigator/>
        }
      </Host>
    
    )
  }
}

const mapStateToProps = ({ User }) => ({ user: User.user });


export default connect(mapStateToProps,null)(Navigation);

