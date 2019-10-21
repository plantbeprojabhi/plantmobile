import React, { Component } from 'react';
import { View, Text,StyleSheet,Image ,ScrollView,Dimensions } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import {Card,CardItem, Thumbnail, Button, Icon, Left,Body,Right,Content,Container} from 'native-base';
import Images from "assets/images"
export default class LoginSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
  
    const {headerTitle,textFormat,headerTitle2,imageFormat}=styles  
    return (
      <ScrollView>

        <View style={{flex:1, flexDirection: 'row'}}>
        
          <View style={{flex:0.5}} >

              <View style={{flexDirection:'row',marginTop:10 }}>
                <Thumbnail source={Images.right}style={{marginLeft:10,height:25,width:25}}  />
                <Text style={{marginLeft:10 , flex:0.9}}>Take picture in a well lighted area</Text>
              </View>
              
              <Image source={Images.light} style={imageFormat}/>
              
              <View style={{flexDirection:'row',marginTop:10}}>
                <Thumbnail source={Images.right}style={{marginLeft:10,height:25,width:25}}  />
                <Text style={{marginLeft:10, flex:0.9}}>Take picture at proper distance</Text>
              </View>
              
              <Image source={Images.distance} style={imageFormat}/>
              
              <View style={{flexDirection:'row',marginTop:10}}>
                <Thumbnail source={Images.right}style={{marginLeft:10,height:25,width:25}}  />
                <Text style={{marginLeft:10, flex:0.9}}>Click a clean and clear picture</Text>
              </View>
              
              <Image source={Images.notblurry} style={imageFormat}/>    
          </View>


          <View style={{flex:0.5}}>

            <View style={{flexDirection:'row',marginTop:10}}>
              <Thumbnail source={Images.wrong}style={{marginLeft:10,height:25,width:25}}  />
              <Text style={{marginLeft:10, flex:0.9}} >Don't click in dark environment</Text>       
            </View>
            
            <Image source={Images.dark} style={imageFormat}/>
            <View style={{flexDirection:'row',marginTop:10}}>
              <Thumbnail source={Images.wrong}style={{marginLeft:10,height:25,width:25}}  />
              <Text style={{marginLeft:10, flex:0.9}}>Don't click picture far and small </Text>
            </View>

            <Image source={Images.far} style={imageFormat}/>

            <View style={{flexDirection:'row',marginTop:10}}>
              <Thumbnail source={Images.wrong}style={{marginLeft:10,height:25,width:25}}  />
              <Text style={{marginLeft:10, flex:0.9}}>Don't click blurry image</Text>  
            </View>
              
            <Image source={Images.blurry} style={imageFormat}/>

          
          </View>
        </View>

      </ScrollView>
      );
  }
}

const styles=StyleSheet.create({
  headerTitle:{
    justifyContent:'center',
    alignItems:'center',
    fontSize:30,
    fontWeight:'bold',
    color:"green"
  },
  headerTitle2:{
  marginLeft:30,
    color:"red"
  },
  textFormat:{
      flex:1,
      flexWrap:'wrap',
      marginLeft:10
  },
  imageFormat:{
    height:130,
    width:140,
    borderRadius:10,
    marginLeft:10,
    marginTop:10,
    alignSelf: 'center',   
  }
})