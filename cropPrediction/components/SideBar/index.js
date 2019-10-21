import React from "react";
import { AppRegistry, Image, StatusBar,Text , StyleSheet ,TouchableOpacity} from "react-native";
import { Button,Container,List,ListItem,Content,Icon,Thumbnail, View} from "native-base";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


//const routes = ["Cam", "Ram"];

const routes = [
                {title:"cropSelectionPage",name:"CropSelectionPage", icon:"user"},
                {title:"homePage" , name:"HomePage" , icon:"question-circle"},
                {title:"loginSignUp",name:"LoginSignUp", icon:"filter"},
                {title:"forum",name:"Forum", icon:"comments"},
                // {title:"infoAndSelectImage",name:"InfoAndSelectImage", icon:"comment-dots"},
                {title:"predictionFromServer",name:"Check Disease", icon:"comment-dots"},
                // {title:"answersToQuestions",name:"AnswersToQuestions", icon:"comment-dots"},
              ];



export default class SideBar extends React.Component {
  render() {
    return (
     
      <Container>
        <Content>  
        
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 35 }}
            renderRow={data => {
              return (
                <ListItem button onPress={() => this.props.navigation.navigate(data.title)}>
                  <FontAwesome5 name={data.icon} brand style={{ fontSize: 25, color:'black'}} />
                  <Text blurRadius={1} style={{color:'black' , fontSize:25, paddingLeft:5 ,paddingRight:5, elevation:3,fontFamily:"courbd"}}>{data.name}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>



    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:80
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});