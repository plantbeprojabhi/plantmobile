import React, { Component } from 'react';
import { View, Text , ScrollView , Image,TouchableOpacity,FlatList,Dimensions} from 'react-native';
import {  Button } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Dialog, { DialogContent,DialogTitle } from 'react-native-popup-dialog';

const advDescp = {

  ADVISE:['Green SIM card for farmers is an initiative of the IFFCO Kisan Sanchar Ltd (IKSL). IKSL is a joint venture of IFFCO (Indian Farmers Fertilizers Cooperative) and AIRTEL. IKSL provides voice-based agricultural information in regional languages to empower rural farmers. This service was launched in 2008.',
          'Organic farming is a production system which avoids or largely excludes the use of synthetically compounded fertilizers, pesticides, growth regulators, genetically modified organisms and livestock food additives using use of crop residues, animal manures, legumes, green manures, off farm organic wastes, biofertilizers, mechanical cultivation.',
          'Super Absorbent Polymers, also known as SAP, hydrogel, absorbent polymers, absorbent gels, super soakers, super slurpers, water gel, is a new type of macro molecular synthetic water absorbing polymer material.'],
  FERTILIZERS:['pH greatly affects the uptake of nutrients in the soil by the plants . Ensure your soil pH is maintained at a pH which plants can thrive in.Although some plants can grow in more acidic soils, the optimum pH range is from 5.5 to 7.0.',
               'Soils with more organic content encourage better uptake of nutrients by root. It is therefore advisable to cover with soil rather than put it on the surface.',
                'With infertile soils farmers end up applying more fertilizers which cause more damage to the soil. Look for fertilizers that besides providing nutrition can also help increase your soil’s organic matter. Some organic fertilizers like Plantmate Bio organic fertilizer can help bui;d up organic matter and also with microbes in it it helps activates nutrients in the soil making them more available for crop uptake. Farmers therefore end up using less Synthetic fertilizers.' ],
  HARVESTING:['Walk around the field pushing the crops at random to see if the crop snaps or bounces back. If the stalks break that field should then be your number one harvest concern and to prevent loss of crop you should harvest it straight away. Typically, if 10% of stalks are succumbing to the push test then that field needs to be harvested urgently.',
            'Keep track of important field changes from planting. Note when a field pollinates and also keep abreast of any environmental factors such as drought during pollination that may affect the overall crop quality. In times of hardship or undue stress a corn crop exerts all its nutrients on growing the ears of the crop, this often results in fragile stalks.',
            'When walking around your fields and surveying them, be careful to note any disease, pest or rot that you come across. Make sure each is identified and make a note of how much crop has been affected. Again, if there is a significant outbreak there is likely going to be either a corrective measure or a slightly earlier harvest to prevent further loss.'
              ]  
}


export default class Advisory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs:[
        {uri:require('../../assets/images/advisory_vector.jpeg') , description:'Advise in farming for healthy and good yield.....' , type:'ADVISE'},
        {uri:require('../../assets/images/fertilizers_vector.jpg') , description:'Use and amount of use fertilizers and pestisides.....' , type:'FERTILIZERS'},
        {uri:require('../../assets/images/harvest_vector.jpg') , description:'Tools and general practice for harvesting and cultivation.....' , type:'HARVESTING'}],
      visible:false,
      title:"",
      details:''
    };
  }

  render() {
    return (
      <View>
        <View style={{borderBottomColor: '#217c27',borderBottomWidth: 1}} />

        <View style={{flex:1 , flexDirection:'row' ,justifyContent:'center',paddingTop:10}}>
          <Text style={{color:'#0c420c' , fontSize:25 }}> Advisory </Text>
          <FontAwesome5 name={"user-graduate"} brand style={{ paddingLeft:15,paddingTop:3,fontSize: 25, color:'#0c420c'}} />
        </View>

        <FlatList 
            extraData={this.state}
            data = {this.state.imgs}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={i => {
                const isSelected = true 

                return (
                    <View style={{flex:1,backgroundColor:'rgba(255,255,255,0)',borderWidth:1,borderRadius:5, borderColor:'#dbdbdb',marginLeft:15,marginRight:15,marginTop:15}}>
                      <TouchableOpacity style={{flex:1,flexDirection:'row'}} onPress={() => this.setState({visible: !this.state.visible , title:i.item.type , details:advDescp[i.item.type]})}>
                      
                        <View style={{flex:0.58 ,backgroundColor:'rgba(255,255,255,0)' }}>
                          <Text style={{paddingLeft:7,fontSize:18 ,marginBottom:10,color:'#0c420c'}}>{i.item.description}</Text>

                          <Button style={{alignSelf:'center',justifyContent:'center',backgroundColor:'#0c420c' , borderRadius:5 ,color:'white',width:155,height:30}}>
                            <Text style={{fontSize:18 , fontWeight:'bold',color:'white'}}>{i.item.type}</Text>
                          </Button>

                        </View>

                        <View style={{flex:0.42,justifyContent:'center'}}>
                          <Image style={{alignSelf:"center",paddingRight:7, width:150,height:100,borderRadius:5, margin:7}} source={i.item.uri} ></Image>
                        </View>
                        
                      </TouchableOpacity>
                    </View>
                )}}
            >
          </FlatList>

          <Dialog
            visible={this.state.visible}           
            width = '90%'
            onTouchOutside={() => {
              this.setState({ visible: false });
            }}
            style={{marginRight:50}}
          >
            

            <View style={{flexDirection:'column',marginRight: Dimensions.get('window').width*0.1 ,justifyContent:'space-around' , alignItems:'stretch' }}>

              <Text style={{fontSize:35 , fontWeight:'bold',color:'#0c420c',textAlign:'center' , paddingLeft:Dimensions.get('window').width*0.10}}>{this.state.title}</Text>

              <View style={{flexDirection:'row' , paddingTop:10}}>
                  <FontAwesome5 name={"hand-point-right"} brand style={{ paddingLeft:10,paddingRight:10,paddingTop:3,fontSize: 18, color:'#0c420c'}} />
                  <Text style={{fontSize:15.5 , textAlign:'justify',paddingRight:10}}> {this.state.details[0]} </Text>
              </View>

              <View style={{flexDirection:'row' , paddingTop:10}}>
                  <FontAwesome5 name={"hand-point-right"} brand style={{ paddingLeft:10,paddingRight:10,paddingTop:3,fontSize: 18, color:'#0c420c'}} />
                  <Text style={{fontSize:15.5 , textAlign:'justify',paddingRight:10}}> {this.state.details[1]} </Text>
              </View>

              <View style={{flexDirection:'row' , paddingTop:10 , paddingBottom:10}}>
                  <FontAwesome5 name={"hand-point-right"} brand style={{ paddingLeft:10,paddingRight:10,paddingTop:3,fontSize: 18, color:'#0c420c'}} />
                  <Text style={{fontSize:15.5 , textAlign:'justify',paddingRight:10}}> {this.state.details[2]} </Text>
              </View>


            </View>
          
         
         </Dialog>

      </View>
    );
  }
}
