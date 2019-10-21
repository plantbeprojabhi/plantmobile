import React, { Component }from 'react';
import { View, Text, StyleSheet,FlatList,Image,TouchableOpacity,ScrollView,Dimensions} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import {Fab,Input,Item} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import backendip from '../../constants/backendip';

export default class AnswersToQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:props.navigation.getParam("card").title,
      imageUrl:'',
      type:'',
      description:'',
      id:'',
      comments:'',
      commentsArray : [],
      inputComment:''
    };
  }

  async addCommentList(){
    console.log('comments',this.state.comments)
    console.log('value',this.state.inputComment)
    var comms = this.state.comments
    var newComms = this.state.inputComment

    var newDictComment = {
      id : 100,
      answer : newComms,
      upvotes : '0',
      downvotes : '0',
      name : 'Gopu',
      type : this.state.type
    }

    var query = {
      replyf : newDictComment.answer,
      questno : this.state.id,
      questtype : newDictComment.type,
      username : newDictComment.name,
    }

    await axios.post( `${backendip}/reply2` , query )
    .then( data => console.log(data.data) )
    .catch(err => console.log(err))

    comms.push(newDictComment)

    this.setState({
      comments:comms,
      inputComment:''

    })

  }

  componentWillMount(){
    let myData = this.props.navigation.getParam("card");
    
    var coms = []
    axios.get(`${backendip}/listans?quno=${myData.id}`)
          .then( res =>{
            console.log("called api")
            var data = res.data['list1'];
            
            data.forEach(ele => {

              var query = {
                id : ele.ansno,
                answer : ele.answer,
                upvotes : ele.upvotes,
                downvotes : ele.downvotes,
                name : ele.usera,
                type : ele.type
              }

              
              coms.push( query );

            });
            
            var typeEle;
            if ( coms[0]  ){
              typeEle = coms[0].type
            }else{
              typeEle = 'Grapes'
            }

            this.setState({
              title:myData.title,
              imageUrl:myData.imageUrl,
              description:myData.description,
              id:myData.id,
              comments: coms,
              type:typeEle
              
            })
            console.log(this.state);

          }).catch(err => console.log(err , " error"))
  }

  render() {
    return (
      <View style={{flex:1}}>

      <View style={{flex:1}}>

        <ScrollView>

          <View style={{borderWidth:1 , borderRadius:5,borderColor:'#dbdbdb',margin:10 , marginBottom:5}}>
            <Text style={{textAlign:'center' ,fontSize:24 , color:'#0c420c'}}>Title : {this.state.title}</Text>
            <Image style={{alignSelf:"center",paddingRight:7, width:Dimensions.get('window').width-50 , height:200, margin:7}} source={{ uri : this.state.imageUrl }} ></Image>
          </View>
          
          <View style={{flexDirection:'row'}}>
            <Text style={{paddingLeft:15, textAlign:'center',fontSize:20 , color:'#0c420c'}}>{this.state.comments.length} Answers :-</Text>
            {/* <FontAwesome5 name={"home"} brand style={{ fontSize: 20, color:'#0c420c'}} /> */}
          </View>
                  
          <View style={{borderBottomColor: '#dbdbdb',borderBottomWidth: 2 ,marginBottom:5}} />

          <FlatList 
              extraData={this.state}
              data = {this.state.comments}
              numColumns={1}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={i => {
                const isSelected = true 
                return (
                  <View style={{flex:1,borderWidth:1,borderRadius:5, borderColor:'#dbdbdb',marginLeft:15,marginRight:15,marginBottom:10}}>
                    
                    <TouchableOpacity style={{flex:1}}>
                    
                      <View style={{flex:1 ,backgroundColor:'#dbdbdb' }}>
                        <Text style={{paddingLeft:7,fontSize:12 ,marginBottom:2,color:'#0c420c'}}>Name : {i.item.name}</Text>
                        <Text style={{paddingLeft:7,fontSize:18 ,color:'#0c420c'}}>{i.item.answer}</Text>                       
                      </View>
                      
                    </TouchableOpacity>
                  </View>
                )
              }}
            >
            </FlatList>
        </ScrollView>
      </View>

      <View >
        <View style={{flexDirection:'row'}}>
          <Item rounded style={{flex:0.98 , marginLeft:15,height:50,}}>
            <Input placeholder=" Enter the comments here ...." onChangeText={text => this.setState({inputComment:text})} value={this.state.inputComment}></Input>
          </Item>
  
          <View style={{height:50,width:50, marginLeft:10,backgroundColor:'#dbdbdb',borderRadius:30,justifyContent:'center'}}>
            <FontAwesome5 name={"arrow-right"} brand style={{alignSelf:'center', fontSize: 30, color:'#0c420c'}} 
              onPress={ () => this.addCommentList()}/>
          </View>
                  
        </View>    
      </View>
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