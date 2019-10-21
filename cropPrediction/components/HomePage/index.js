import React, { Component } from 'react';
import { View, Text , ScrollView , Image,TouchableOpacity,FlatList, AsyncStorage } from 'react-native';
import { Container,Fab, Content, Footer, FooterTab, Button, Icon,Input,Item } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Advisory from './Advisory';
import strings from '../../constants/strings';
import BottomTab from '../BottomTab';


export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        imgs : [{ url: 27, title: 'Pepper' }],
        changeState : -1,
        defaultLan : "en"
    };
  }

  async componentWillMount(){

    await AsyncStorage.getItem('defaultLan', (err, res) => {
    
      if(res != null){

        this.setState({ defaultLan : res })
        console.log("setting lan ", res)
        strings.setLanguage(res);
        this.setState({})
      }
    });

    

  }

  componentDidMount(){
    let imgs = this.props.navigation.getParam("imgs");


    console.log('datatatatata' , imgs)

    if (imgs.changeState == 1){
      this.setState({imgs:imgs.imgs , changeState:0})
    }

    console.log( "home page state" , this.state.imgs)
  }

  render() {

    if(this.changeState != -1){
      return (

        <View style={{flex:1}}>

          <View style={{flex:1}}>

            <ScrollView >
              <FlatList 
                horizontal
                extraData={this.state}
                data = {this.state.imgs}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={i => {
                    const isSelected = true 
                    console.log(i)
                    return (
                        <View style={{ flex:1 , margin:5}}>
                          <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate('cropDetailPage',{name:i.item.title} )}} >
                            <Image style={{alignSelf:"center", width:75,height:75,borderRadius:38, margin:7}} source={i.item.url} ></Image>
                            <Text style={{textAlign:'center' , color:'#0c420c' , fontSize:15}} >{strings[i.item.title]}</Text>
                          </TouchableOpacity>
                        </View>
                    )}}
              >
              </FlatList>

              <Advisory style={{marginTop:10}}></Advisory>
            
            </ScrollView>

          </View>

          <View style={{marginTop:20}}>
            <BottomTab tab="homePage" navigation={ this.props.navigation } />
          </View>
          
        </View>
      );
    }
    
  }
}
