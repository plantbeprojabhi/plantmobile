import React, { Component } from 'react';
import { View,Image, Text ,FlatList,TouchableOpacity,AsyncStorage, ScrollView} from 'react-native';
import {Button} from 'native-base';
import LoginSignUp from '../LoginSignUp';
import { StackActions, NavigationActions } from 'react-navigation';

import strings from '../../constants/strings';

const routes = [
  {name:require("../../assets/images/apple_vector.jpg"), title:"apple"},
  {name:require("../../assets/images/corn_vector.jpg"), title:"corn"},
  {name:require("../../assets/images/grapes_vector.jpg"), title:"grape"},
  {name:require("../../assets/images/peach_vector.jpg"), title:"peach"},
  {name:require("../../assets/images/pepper_vector.jpg"), title:"pepper"},
  {name:require("../../assets/images/potato_vector.jpg"), title:"potato"},
  {name:require("../../assets/images/strawberry_vector.jpg"), title:"strawberry"},
  {name:require("../../assets/images/tomato_vector.jpg"), title:"tomato"},
];
  
const mages =  [
  {name:require("../../assets/images/apple_vector.jpg"), title:"Apple"},
  {name:require("../../assets/images/corn_vector.jpg"), title:"Corn"},
  {name:require("../../assets/images/grapes_vector.jpg"), title:"Grape"},
  {name:require("../../assets/images/peach_vector.jpg"), title:"Peach"},
  {name:require("../../assets/images/pepper_vector.jpg"), title:"Pepper"},
  {name:require("../../assets/images/potato_vector.jpg"), title:"Potato"},
  {name:require("../../assets/images/strawberry_vector.jpg"), title:"Strawberry"},
  {name:require("../../assets/images/tomato_vector.jpg"), title:"Tomato"},
  {name:require("../../assets/images/onions_vector.jpg"), title:"Onions"},
  {name:require("../../assets/images/mango_vector.jpg"), title:"Mango"},
  {name:require("../../assets/images/watermelon_vector.jpg"), title:"Melon"},
  {name:require("../../assets/images/orange_vector.jpg"), title:"Orange"}];

export default class CropSelectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apple:0,
      corn:0,
      grapes:0,
      peach:0,
      pepper:0,
      strawberry:0,
      tomato:0,
      onions:0,
      mango:0,
      melon:0,
      orange:0,
      changeState:0,
      borderr:0,
      defaultLan : 'en'
    };
  }

  async componentWillMount(){
    
    var res = null

    // await AsyncStorage.getItem('checkState', (err, result) => {
    //   //console.log("resulttttttttttt",result);
    //   res = JSON.parse(result)
    
    //   if(res != null){
    //     console.log("maiiiiiiiiiiiinResu",res.imgList)
    //     this.setState({changeState:1})

    //     this.props.navigation.navigate('homePage',{imgs:{imgs:res.imgList,changeState:this.state.changeState}})
    //   }
    
    // });

    // await AsyncStorage.getItem('defaultLan', (err, result) => {
    
    //   if(res != null){

    //     this.setState({ defaultLan : res })
    //     strings.setLanguage(res);
    //     this.setState({})

    //   }else{
    //     AsyncStorage.setItem('defaultLan', 'en');
    //   }
    
    // });

    
  }

  async homePageFunction(){
    var imgList = []
    var imgDictList = []

    for(i=0 ; i<mages.length ; i++){
      if(this.state[mages[i].title]){
          imgList.push(mages[i].name)
          var imgDict = {
              url:mages[i].name,
              title:mages[i].title
          }
          imgDictList.push(imgDict)
      }
    }

    var finaleList = {
      loginSignUpState:1,
      state:1,
      imgList:imgDictList
    }

    await AsyncStorage.setItem('checkState', JSON.stringify(finaleList))

    console.log('imgDIct', imgDictList)
    // this.props.navigation.navigate('homePage',{imgs:{imgs:imgList,changeState:1}})

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'noPage'}, {imgs:{imgs:imgList,changeState:1}} )],
    });
    
    this.props.navigation.dispatch(resetAction);
  }

  _setEn = async () =>{

    await AsyncStorage.setItem('defaultLan', 'en');
    strings.setLanguage('en');
    this.setState({ defaultLan : 'en' })

  }

  _setHi = async () =>{

    await AsyncStorage.setItem('defaultLan', 'hi');
    strings.setLanguage('hi');
    this.setState({ defaultLan : 'hi' })

  }



  render() {
    console.disableYellowBox = true
    
    return (
      <ScrollView>
      <View style={{alignContent:'center'}}>

        <FlatList 
          extraData={this.state}
          numColumns={3}
          data = {mages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={i => {
              return (
                  <View style={{ flex:1, flexDirection:"column", borderWidth:this.state[i.item.title] , margin:5, borderColor:"black", borderRadius:25}}>
                    <TouchableOpacity onPress={()=> this.state[i.item.title] ? this.setState({[i.item.title]: 0 , borderr:0}):this.setState({[i.item.title]: 2, changeState:1,borderr:1})}>
                      <Image style={{alignSelf:"center", width:65,height:65,margin:7}} source={i.item.name} ></Image>
                      <Text style={{textAlign:"center", fontSize:18, marginLeft:15, marginRight:15,borderRadius:5, padding:3,color:"black"}}>{strings[i.item.title]}</Text>
                      {/* <CheckBox {strings[i.item.title]} style={{position:'absolute' , left:0 }} checked={this.state[i.item.title] } on={true}></CheckBox> */}
                    </TouchableOpacity>
                  </View>
              )}}
        >
      </FlatList>

     
      <Button style={{marginTop:10,alignSelf:'center' , width:100 , justifyContent:'center'}} 
        onPress={()=>this.homePageFunction()}>
        <Text style={{textAlign:'center' , color:'white'}}>Submit</Text></Button>

        {
          this.state.defaultLan == 'en' ?

          <Button style={{marginTop:10,alignSelf:'center' , width:100 , justifyContent:'center'}} 
          onPress={ this._setHi }>
          <Text style={{textAlign:'center', fontSize : 20 , color:'white'}}>हिंदी</Text></Button>  :

          <Button style={{marginTop:10,alignSelf:'center' , width:100 , justifyContent:'center'}} 
          onPress={this._setEn}>
          <Text style={{textAlign:'center', fontSize : 18 , color:'white'}}>English</Text></Button>   

        }
       
      </View>
      </ScrollView>
    );
  }
}

