import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Image, ScrollView } from 'react-native';
import { Text , Button } from 'native-base'
import t from 'tcomb-form-native';
import ImagePicker from "react-native-image-picker";
import strings from '../../constants/strings';
import axios from "axios";
import backendip from '../../constants/backendip';
import LoadScreen from '../LoadScreen';

const Form = t.form.Form;


export default class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        question : '',
        qname : '',
        type : 'default',
        fund : t.struct({}),
        start : false,
        imageLink : "",
        fd : false,
        uri : false,
        changeLoadState : true
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

  
    this.formOption = {
      fields: {
          type :{
              label: strings.NameOfCrop
          },
          qname :{
              label: strings.Name
          },
          question: {
          label: strings.Question
          },
          location : {
            label : strings.Location
          }
      }
  }

    var work = t.enums({
          Apple : strings.Apple,
          Potato : strings.Potato ,
          Strawberry :  strings.Strawberry,
          Tomato :  strings.Tomato,
          Corn :  strings.Corn,
          Grape :  strings.Grape,
          Pepper :  strings.Pepper,
          Peach : strings.Peach,
          Others : "Others"
      })

      var fund = t.struct({
        qname: t.String,
        type: work,
        question : t.String,
        location : t.String
      });

      this.setState({fund , start : true})  

  }


  async componentDidMount(){

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    
    console.log(granted);


  }


  handleChange = (value) => {
    this.setState({value});
    }

  handleSubmit = async () => {
      const value = this._form.getValue();

      this.setState({changeLoadState : false})

      var link = await this._uploadToImgur();

      axios.post(`${backendip}/askqts`, {
        yourq: value.question,
        type : value.type,
        name : value.qname,
        image_path : link,
        location : value.location
      }).then(res =>{
        console.log(res.data)
        this.props.navigation.navigate('forum')
      }).catch(err => console.log(err))

      console.log(value , "link")
  }

  _uploadToImgur = () => {
        return new Promise((resolve, reject) => {
          console.log("Uploading...");
          var url = `${backendip}/upload`;
          var fd = this.state.fd;
          if( ! fd  ){
            reject("noimage")
          }
          const ts = this;
          axios({
            method: "post",
            url: url,
            data: fd,
            config: { headers: { "content-type": "multipart/form-data" } }
          })
            .then(function(response) {
              //handle success
              var data = response.data.link;
              ts.setState({ imageLink: data });
              console.log("data is", data);
              resolve(data);
            })
            .catch(function(response) {
              //handle error
              console.log("[RESPONSE: ]", response);
              reject(response);
            });
        });
    };

    _getPhotos = async () => {
      var fd = new FormData();
      ImagePicker.showImagePicker({}, response => {
        console.log(response.uri);

        this.setState({
          imageData: {
            uri: response.uri,
            type: "image/jpeg",
            name: response.fileName
          }
        });

        fd.append("file", {
          uri: response.uri,
          type: "image/jpeg",
          name: response.fileName
        });

        this.setState({ fd , uri : response.uri });

        console.log(fd, "image data");

        // this._uploadToImgur();s
        console.log("LOADED");
    });

  }

  render() {
    return (
      <ScrollView>

      {
      this.state.changeLoadState ?
        <View style={styles.container} >

          {
            this.state.start &&
            <Form 
            type={ this.state.fund }
            value={ this.state.value }
            onChange={ this.handleChange }
            options={this.formOption}
            ref={c => this._form = c} 
            />
          }


          <Button rounded full style={styles.button} onPress={ this._getPhotos }>
              <Text style={ styles.text } > { strings.UploadImage } </Text>
          </Button>

          {
            this.state.uri != false &&
            <Image style={{margin:10, alignContent : 'center' , width: 250, height: 250 }}
                    source={{ uri : this.state.uri }}
            />
          }
          
          <Button rounded full style={styles.button} onPress={ this.handleSubmit }>
              <Text style={ styles.text } > { strings.Submit } </Text>
          </Button>

        </View>
       :
       <LoadScreen/>
      }


      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
        padding: 10,
        backgroundColor: '#ffffff',
      },
    text : {
        fontSize : 25,
        fontWeight: 'bold'
        
    },
    button : {
      padding : 10,
      marginTop : 10,
      backgroundColor:'#0c420c'
    }
});