import React, { Component } from 'react';
import { Modal, View, ScrollView,StyleSheet,Text,Image,PermissionsAndroid,Dimensions} from 'react-native';
// import { Button as nButton , Text as nText } from 'native-base'
import {Button} from 'native-base';
import ImagePicker from "react-native-image-picker";
import {TFLiteImageRecognition} from 'react-native-tensorflow-lite';
import Dialog, { DialogContent,DialogTitle } from 'react-native-popup-dialog';
import Instructions from '../Instructions'
import models from '../../constants/models';
import RemedyPage from '../Remedy';
import call from 'react-native-phone-call'
import predictionip from '../../constants/predictionip';
import axios from "axios";
import LoadScreen from "../LoadScreen";
import { Text as txt } from 'react-native-openanything';

const contact = {
  number: '18001801551', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}

export default class ResultOfPredictedDisease extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path : false,
      uri : false,
      resultObj : {},
      predicted : false,
      visible:true,
      showRemedy : false,
      fd : "",
      name : "",
      loading : false
    };


  }

  async checkIfLeaf(imagePath) {

    try {

      const checker = new TFLiteImageRecognition({
        model: `leaf.tflite`,  // Your tflite model in assets folder.
        labels: `leaf.txt` // Your label file
      })      

      var results = await checker.recognize({
        image: imagePath, // Your image path.
        inputShape: 224, // the input shape of your model. If none given, it will be default to 224.
      })
 
      if ( results[0].name !== 'leaf' ){
        console.log(resultObj)
        alert("Please Click Proper Leaf Image")

      }else{
        this.classifyImage(imagePath)
        // console.warn("Done")
      }

    } catch(err) {
      alert("Image Error")
    }

  }

  async classifyImage(imagePath) {

    var ts = this;
    ts.setState({loading : true})
    try {

        axios({
            method: "post",
            url: predictionip,
            data: this.state.fd,
            config: { headers: { "content-type": "multipart/form-data" } }
          })
            .then(function(response) {
              //handle success
              var name = response.data.pred;
              ts.setState({name ,predicted : true  ,loading : false})
              console.log("data is", data);

            })
            .catch(function(response) {
              //handle error
              console.log("[RESPONSE: ]", response);

            });

        
    } catch(err) {
      alert(err)
    }   
  }

  handleCall = async ()=>{
    var body = "Mr. Ram wants help for " + this.state.name + "\n QUERY ID: " + String( Math.round( Math.random()*51000 % 94999 ) )
    txt(phone = "8655513317", message = body, autoEncode = false)
    // call(contact).catch(console.error)
  }  

  async componentDidMount() {
    console.log("mounting hello");
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );

    console.log(granted);
  }

  setModalVisible(visible) {
    this.setState({predicted: visible});
  }

  getPhotos = async () => {
    ImagePicker.showImagePicker({}, response => {
      var fd = new FormData();

      fd.append("image", {
        uri: response.uri,
        type: "image/jpeg",
        name: response.fileName
      });

      this.setState({
        path : response.path,
        uri : response.uri,
        fd
      });
      
    });
};

  _renderMain(){

    const {navigation}=this.props
    group=navigation.getParam('group',1)
    console.log(group)
    return (
      <View>
          <Dialog
            visible={this.state.visible}           
            height="80%"
            width='95%'
            onTouchOutside={() => {
              this.setState({ visible: false });
              this.getPhotos();
            }}
            style={{flex:1,flexWrap:'wrap'}}
          >
          <View style={{flexDirection:'row' , justifyContent:'space-around' , backgroundColor:'#dbdbdb'}}>

            <Text style={{fontSize:28 , color:'green'}}>Do's</Text>
            <Text style={{fontSize:28, color:'red'}}>Dont's</Text>
          
          </View>
          
          <View style={{flex:1}}>
            <Instructions style={{flex:1,flexWrap:'wrap'}} ></Instructions>
          </View>
          
         
         </Dialog>
             
          <View style={{marginTop: 22}}>

            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.predicted}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <ScrollView style={{marginTop: 22}}>
                <View>

            <View style={{justifyContent:'center'}}>
              <View style={{alignSelf:'center', borderRadius:5 ,width:Dimensions.get('window').width-150 , borderWidth:1 , color:'#dbdbdb',margin:10}}>
                <Text style={{fontSize:25 , textAlign:'center'}}>Disease</Text>
                <Text style={{fontSize:15 , textAlign:'center', margin:5}}>
                  {this.state.name}
                </Text>
              </View>

                  {
                    this.state.showRemedy &&
                    <RemedyPage name={ this.state.name} />
                  }


                </View>
           
                <Button style={{marginBottom:15, alignSelf:'center',justifyContent:'center',backgroundColor:'#0c420c' , borderRadius:5 ,color:'white',width:Dimensions.get('window').width-200 ,height:55}}
                    onPress={() => {this.setModalVisible(!this.state.predicted);}}>
                  <Text style={{fontSize:18 , fontWeight:'bold',color:'white'}}>Close</Text>
                </Button>



                <Button style={{marginBottom:15,alignSelf:'center',justifyContent:'center',backgroundColor:'#0c420c' , borderRadius:5 ,color:'white',width:Dimensions.get('window').width-200,height:55}}
                    onPress={() => { this.setState( { showRemedy : true } )}}>
                  <Text style={{fontSize:18 , fontWeight:'bold',color:'white'}}>Show Tips/Remedy</Text>
                </Button>
                


                <Button style={{marginBottom:15,alignSelf:'center',justifyContent:'center',backgroundColor:'#0c420c' , borderRadius:5 ,color:'white',width:Dimensions.get('window').width-200,height:55}}
                    onPress={() => {this.setModalVisible(!this.state.predicted);this.props.navigation.navigate("forum")}}>
                  <Text style={{fontSize:18 , fontWeight:'bold',color:'white'}}>Go to Forum</Text>
                </Button>



                <Button style={{marginBottom:15,alignSelf:'center',justifyContent:'center',backgroundColor:'#0c420c' , borderRadius:5 ,color:'white',width:Dimensions.get('window').width-200,height:55}}
                    onPress={this.handleCall}>
                  <Text style={{fontSize:18 , fontWeight:'bold',color:'white'}}>Contact Helpline</Text>
                </Button>




              </View>
            </ ScrollView>
          </Modal>

        </View>

        <Button style={{marginBottom:5,alignSelf:'center',justifyContent:'center',backgroundColor:'#0c420c' , borderRadius:5 ,color:'white',width:Dimensions.get('window').width-100,height:55}}
            onPress={this.getPhotos}>
          <Text style={{fontSize:18 , fontWeight:'bold',color:'white'}}>Take Photo</Text>
        </Button>
        
        
        {/* <Button title="Take Photo" onPress={this.getPhotos} /> */}
        
        {
           this.state.uri != false &&
           <Image style={{margin:10, alignContent : 'center' , width: 400, height: 400 }}
                  source={{ uri : this.state.uri }}
           />
        }

        <Button style={{alignSelf:'center',justifyContent:'center',backgroundColor:'#0c420c' , borderRadius:5 ,color:'white',width:Dimensions.get('window').width-100,height:55}}
            onPress={() => this.checkIfLeaf(this.state.path)}>
          <Text style={{fontSize:18 , fontWeight:'bold',color:'white'}}>Result Of Predicted Disease</Text>
        </Button>
        
        {/* <Button title="Result Of Predicted Disease" onPress={() => this.checkIfLeaf(this.state.path)}></Button> */}
      </View>
    );


  }

  render() {
    
    if ( this.state.loading ){
      return <LoadScreen/>
    }else{
      return this._renderMain();
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonStyle : {
    marginTop: 10,
    paddingTop : 10,
    width : 50
  }
});