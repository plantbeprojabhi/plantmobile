import React, { Component } from 'react'
import { Text, StyleSheet,Dimensions, View,Image,ScrollView,BackHandler} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import {Fab,Icon,Button} from 'native-base';
import Toggle from '../ToggleComponent'
import Images from 'assets/images'
import plants from '../../constants/plants';
// More info on all the options is below in the API Reference... just some common use cases shown here

  


const options = {
    title: 'Select your image',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    takePhotoButtonTitle:"Capture Image",
    chooseFromLibraryButtonTitle:"Pick image from Gallery"
  };
 
  
export default class CropDetailPage extends Component {

    constructor(props){
        super(props);
        this.state={
            img:null,
            index:null,
            numberOfLines:3,
            expanded:false,
            active: false 

        }

    }
   
    componentWillMount(){
      console.log("will mount soon")
    }

    componentDidMount(){
      console.log(this.state, "details compostate")
      BackHandler.addEventListener('hardwareBackPress', this.f);
    }
    
    componentWillUnmount(){
          BackHandler.removeEventListener('hardwareBackPress', this.f);
    }
    
    f = () => {
      this.props.navigation.navigate('homePage')
      return true;
    }



    showPicker=()=>{
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
        
          if (response.didCancel) {
            console.log('User cancelled image picker');
            this.setState({numberOfLines:8})
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
        
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        
            this.setState({
              img: source,
            });
          }
        });
      }

     showDetails(cropName){

      for (x=0;x< 8; x++){
        if(plants[x].name==cropName){
          this.state.index=x;
          console.log("Plant chosen ",x,cropName)
          break;
        }
        console.log(plants[x].name)
      }
      return(
        <View>
        <Image source={plants[this.state.index].image} style={{height:250,width:'100%'}}resizeMode="cover" />
        <Toggle title="Planting" text={plants[this.state.index].planting} />
        <Toggle title="Care" text={plants[this.state.index].care} />
        <Toggle title="Pest/Diseases" text={plants[this.state.index].pest_diseases} />
        <Toggle title="Harvest" text={plants[this.state.index].harves} />
        
        </View>
      )
    }
 
  render() {


    const { navigation } = this.props;

    const cropName=navigation.getParam('name',"no crop")

    console.log("the CropName IS..............",cropName)
    return (
      <ScrollView>

        {this.showDetails(cropName)}

        <Button style={{marginTop:20,alignSelf:'center',justifyContent:'center',backgroundColor:'#0c420c' , borderRadius:5 ,color:'white',width:Dimensions.get('window').width-100,height:55}}
            onPress={()=>this.props.navigation.navigate("resultOfPredictedDisease",{group:plants[this.state.index].group})}>
          <Text style={{fontSize:18 , fontWeight:'bold',color:'white'}}>Select Image</Text>
        </Button>


      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({})
