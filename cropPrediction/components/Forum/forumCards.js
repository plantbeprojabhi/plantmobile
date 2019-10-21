import React, { Component }from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const users = [ 'Jacob' , 'Ram Manohor' , 'Pooja Patil' , 'Riya Sharma' , 'Chetan Aroha' ]
const locations = [ 'Raigad' , 'Pune' , 'Ahmedabad' , 'Latur' , 'Panchgani' , 'Vasai' , 'Dahanu' ]

export default class ForumCards extends Component {
  constructor(props)  {
      super(props);
      console.log(this.props, "========")
      this.state = {
        location : locations[ parseInt(Math.random()*100 + 1) % 7 ],
        username : users[ parseInt(Math.random()*100 + 1) % 5 ]
      }

  }

  componentWillMount(){

    if ( (this.props.location) != null ){
      this.state.location = this.props.location;
    }
  }

  render() {
    console.warn(this.props.description)
      return (
        
        <TouchableOpacity onPress={() => this.props.navigation.navigate('answersToQuestions',{card:{id:this.props.fourmid,title:this.props.titleName,imageUrl:this.props.imageUrl,description:this.props.description}})}
        >

        <Card
            // title={this.props.titleName}
            image={{ uri : this.props.imageUrl }}>
            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
            <Text>
              { this.state.username }
            </Text>
            <Text >
              { this.state.location }
            </Text>
            </View>
            <Text style={{color:'black',fontSize:20}} >
            { this.props.titleName.toUpperCase() }
            </Text>
            {/* <View style = {styles.lineStyle} /> */}
            
            {/* <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between',paddingTop:8,paddingBottom:5}}>

              <View style={{flexDirection:'row'}}>
                <FontAwesome5 name={"thumbs-up"} brand style={{ paddingLeft:15,paddingTop:3,fontSize: 20, color:'#0c420c'}} />
                <Text style={{paddingLeft:15,color:'black',fontSize:20}} >4</Text>
              </View>
              
              <View style={{flexDirection:'row'}}>
                <FontAwesome5 name={"thumbs-down"} brand style={{ paddingLeft:15,paddingTop:3,fontSize: 20, color:'#0c420c'}} />
                <Text style={{paddingLeft:15,color:'black',fontSize:20}} >4</Text>
              </View>

              <View style={{flexDirection:'row'}}>
                <FontAwesome5 name={"share-alt"} brand style={{ paddingLeft:15,paddingTop:3,fontSize: 20, color:'#0c420c',paddingRight:15,}} />
                <Text style={{paddingLeft:15,paddingRight:15,color:'black',fontSize:20}} >4</Text>
              </View>

            </View> */}

            </Card>

        </TouchableOpacity>
        
      );
  }
}
// const ForumCards = ({ titleName, imageUrl,description }) => {
  
//     return (
//         <Card
//             title={titleName}
//             image={{uri:imageUrl}}>
//             <Text style={{marginBottom: 10}}>
//             { description }
//             </Text>
//             <View style = {styles.lineStyle} />
//             <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between',paddingTop:20,paddingBottom:10}}>

//             <Icon
//             name='thumbs-up'
//             type='font-awesome'
//             color='gray' />
//             <Icon
//             name='thumbs-down'
//             type='font-awesome'
//             color='gray' />                
//             <Icon
//             name='share-alt'
//             type='font-awesome'
//             color='gray' />

//             </View>

//             </Card>
//     );
//   };
  const styles = StyleSheet.create({
    lineStyle:{
          borderWidth: 0.5,
          borderColor:'black',
          margin:0,
     }
   });
  // export default ForumCards;