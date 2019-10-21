import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import Remedy from '../../constants/disrem';
import Tips from '../../constants/tips';

export default class RemedyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name : this.props.name,
        remedy : false,
        tip : ''
    };


  }

  trim = (strng) =>{

    var ans = '';

    for ( s in strng ){
        if ( strng[s] != '_' )
        ans += strng[s];
    }

    return ans;

  }

  getName = ( strng = this.state.name ) =>{
    var ans = ""
    for (s in strng ){
      if ( strng[s] === '_' )
      break;
      ans += strng[s];
    }
    return ans;
  }

  componentDidMount(){

    Remedy.forEach(ele => {
        const a = this.trim( ele.name ), b = this.trim(this.state.name)
        console.log(a , b )
        if ( a === b ){
            if( ele.remedy !== null ){
                console.log(ele.remedy)
                this.setState( { remedy : ele.remedy } )
            }
        }
    });
    
    const name = this.getName( )

    Tips.forEach( ele =>{

      if ( ele.plant === name ){
        this.setState({ tip : ele.tips })
      }

    })

  }

  render() {
    return (

      <View>

        {
          this.state.remedy &&
          <View style={{alignSelf:'center',borderRadius:5 ,width:Dimensions.get('window').width-50, borderWidth:1 , color:'#dbdbdb',margin:10}}>
              <Text style={{fontSize:25 , textAlign:'center'}}>Remedy</Text>
              <Text style={{fontSize:15 , textAlign:'center', margin:5}}>
              { this.state.remedy }
              </Text>
          </View>

        }

        <View style={{alignSelf:'center',borderRadius:5 ,width:Dimensions.get('window').width-50, borderWidth:1 , color:'#dbdbdb',margin:10}}>
            <Text style={{fontSize:25 , textAlign:'center'}}>Tips</Text>
            <Text style={{fontSize:15 , textAlign:'center', margin:5}}>
            { this.state.tip }
            </Text>
        </View>

        </View>

    );
  }
}
