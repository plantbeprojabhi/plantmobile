import React, { Component }from 'react';
import { View, Text, StyleSheet,FlatList } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'
import { Container,Fab, Content, Footer, FooterTab, Button} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import  ForumCards  from './forumCards'
import axios from 'axios';
import BottomTab from '../BottomTab';
import LoadScreen from '../LoadScreen';
import backendip from '../../constants/backendip';

//onPress={() => this.props.naviagtion.navigate('answersToQuestions',{card:{titleName:item.title,imageUrl:item.imageUrl,description:item.description}})}

// const data = [
//   {id:1,title:"What is This?",description:"Corn is a starchy vegetable and cereal grain that has been eaten all over the world for centuries.", imageUrl:require('../../assets/base_plants/corn.jpg')},
//   {id:2,title:"Tomato Problem" , description:"Corn is a starchy vegetable and cereal grain that has been eaten all over the world for centuries." ,imageUrl:require('../../assets/base_plants/apple.jpg')},
//   {id:3,title:"Corn leaf Pink?",description:"Corn is a starchy vegetable and cereal grain that has been eaten all over the world for centuries.", imageUrl:require('../../assets/base_plants/grape.jpg')},
//   {id:4,title:"Tomato Leaf turning pale yellow?",description:"Corn is a starchy vegetable and cereal grain that has been eaten all over the world for centuries.",  imageUrl:require('../../assets/base_plants/corn.jpg')},
//   {id:5,title:"Help needed Tomato?",description:"Corn is a starchy vegetable and cereal grain that has been eaten all over the world for centuries.",imageUrl:require('../../assets/base_plants/apple.jpg')},
//   {id:6,title:"Cherry plant spots",description:"Corn is a starchy vegetable and cereal grain that has been eaten all over the world for centuries.",  imageUrl:require('../../assets/base_plants/grape.jpg')},
// ];


export default class Forum extends Component {
  constructor(props) {
    console.log("hello shit")
    super(props);
    this.state = {
      data : [],
      loaded : false,
      active:false
    };
  }

  async componentDidMount(){

    var qdata = []
    console.log(`${backendip}/allqts`)
    await axios.get(`${backendip}/allqts`).then( res => {

      let data = res.data;
      console.log(" getting data" ,  data[0])
      data.forEach(ele => {
        
        let query = {
          id : ele.qno,
          title : ele.questions,
          description : "",
          type : ele.type,
          imageUrl : ele.image_path,
          location : ele.location

        }
        console.log(query)
        if ( ele.questions !== null )
          qdata.push( query );

      });
      
    })

    this.setState({data:qdata , loaded : true})
  }

  render() {
    
    return (

      <View style={{flex:1}}>

      <View style={{flex:1}}>
        {
          this.state.loaded ?
          <View>
            <FlatList
              numColumns={1}
              data={this.state.data}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                  <View>
                    <ForumCards navigation={this.props.navigation} location={item.location} fourmid={item.id} titleName={item.title}  imageUrl={item.imageUrl} description={item.description} />
                  </View>
            )}
            />
          </View> :
          <LoadScreen/>
        }  
      </View>

      <View style={{marginTop:20}}>
        <BottomTab tab="forum" navigation={ this.props.navigation } />
      </View>

      {/* this.props.navigation.navigate('questionForm') */}

      {/* <Fab
        active={this.state.active}
        containerStyle={{ }}
        style={{ backgroundColor: 'white' , marginBottom:45}}
        position="bottomRight"
        onPress={ () => this.setState({active : !this.state.active}) }>

        <FontAwesome5 name={"plus"} brand style={{ fontSize: 30, color:'#0c420c'}} />

        <Button style={{ backgroundColor: '#0c420c', marginBottom:52 }}
          onPress={() => this.props.navigation.navigate('questionForm')}>
          <FontAwesome5 name={"cloud-upload-alt"} brand style={{ fontSize: 20, color:'#ffffff'}} /> 
        </Button>
            
        <Button style={{ backgroundColor: '#0c420c', marginBottom:52 }}>
          <FontAwesome5 name={"exchange-alt"} brand style={{ fontSize: 20, color:'#ffffff'}} />
        </Button>
      </Fab> */}


      <Fab
        active={this.state.active}
        containerStyle={{ }}
        style={{ backgroundColor: 'white' , marginBottom:45}}
        position="bottomRight"
        onPress={() => this.props.navigation.navigate('questionForm')}>

        <FontAwesome5 name={"plus"} brand style={{ fontSize: 30, color:'#0c420c'}} />
        
      </Fab>
      

    </View>
    );
  }
}
const styles = StyleSheet.create({
  lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
        margin:0,
   }
 });

//  this.props.navigation.navigate('forumQuery', {
//   forumId:item.id,
// });




        // {/* <View>
        //   <FlatList
        //     contentContainerStyle={{
        //       flexDirection: 'column',
        //       width: '100%'
        //     }}
        //     data={data}
        //     keyExtractor={item => item.id.toString()}
        //     renderItem={({ item }) => (
        //   <View>
        //    <ForumCards navigation={this.props.navigation} fourmid={item.id} titleName={item.title}  imageUrl={item.imageUrl} description={item.description}  />
        //   </View>
        //   )}
        //   />
        // </View> */}