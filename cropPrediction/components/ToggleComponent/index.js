import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Toggle extends Component {

    constructor(props){
        super(props)
        
        this.state={
            title:props.title,
            text:props.text,
            numberOfLines:3,
            expanded:false,
            iconState:'chevron-circle-down'
        }
    }
    toggleButton(){
        if (this.state.expanded==false){
          this.setState({numberOfLines:300,expanded:true,iconState:"chevron-circle-up"})
        }
        else{
          this.setState({numberOfLines:3,expanded:false,iconState:"chevron-circle-down"})
        }
      }
    
  render() {
      const {title}=styles
    return (
        <View>
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={title} >{this.state.title}                      
</Text>
<Icon onPress={()=>this.toggleButton()} name={this.state.iconState} style={{fontSize:20,   fontWeight:'bold',color:"#4fd140",marginRight:10
}} />
</View>
        <Text numberOfLines={this.state.numberOfLines} ellipsizeMode="tail" onPress={()=>{
          this.toggleButton()
  }} > {this.state.text}</Text>
  </View>
    )
  }
}

const styles = StyleSheet.create({

    title:{
        fontSize:20,
        fontWeight:'bold',
        color:"#4fd140",
        fontFamily:"sans-serif-medium"
    }
})
