import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import strings from '../../constants/strings';
import { Container,Fab, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class BottomTab extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.tabName = this.props.tab;
    this.forumBg = 'rgb(237, 255, 237)' ;
    this.homePageBg = 'rgb(237, 255, 237)' ;
    switch( this.tabName){
        case "forum":
        this.forumBg = 'rgb(216, 255, 216)';
        break;
        case "homePage":
        this.homePageBg = 'rgb(216, 255, 216)';
        break;
    }
    this.state = {
        defaultLan : ""
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


  render() {
    return (

        <Footer style={{bottom: 0}}>
          <FooterTab >
            <Button style={{backgroundColor:this.homePageBg, borderRadius:0}}
              onPress={() => this.navigation.navigate('homePage')}>
                <FontAwesome5 name={"home"} brand style={{ fontSize: 20, color:'#0c420c'}} />
                <Text style={{color:'#0c420c'}}> { strings.Homepage } </Text>
            </Button>
            <Button style={{backgroundColor:this.forumBg, borderRadius:0}}
              onPress={() => this.navigation.navigate('forum')}>
                <FontAwesome5 name={"address-card"} brand style={{ fontSize: 20, color:'#0c420c'}} />
                <Text style={{color:'#0c420c'}}>{ strings.Forum }</Text>
            </Button>
            <Button active style={{ backgroundColor:'rgb(237, 255, 237)' , borderRadius:0}}>
                <FontAwesome5 name={"chart-line"} brand style={{ fontSize: 20, color:'#0c420c'}} />
                <Text style={{color:'#0c420c'}}> { strings.Prediction } </Text>
            </Button>
          </FooterTab>
        </Footer>

    );
  }
}