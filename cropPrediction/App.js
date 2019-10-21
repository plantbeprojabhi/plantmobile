/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Button, Item, Input, Icon } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator, createAppContainer,  createDrawerNavigator} from "react-navigation";

import strings from './constants/strings';

import LoginSignUp from './components/LoginSignUp';
import Forum from './components/Forum';
import CropSelectionPage from './components/CropSelectionPage';
import SideBar from './components/SideBar';
import HomePage from './components/HomePage';
import InfoAndSelectImage from './components/InfoAndSelectImage';   //rename ur calss and folder path
import ResultOfPredictedDisease from './components/ResultOfPredictedDisease'; //rename ur calss and folder path
import YieldPrediction from './components/YieldPrediction';
import CropDetailPage from './components/CropDetailPage';
import AnswersToQuestions from './components/AnswersToQuestions';
import ForumQuery from './components/ForumQuery';
import Instruction from'./components/Instructions';
import QuestionForm from './components/QuestionForm';
import NoPage from './components/NoPage/NoPage';
import PredictionFromServer from './components/PredictionFromServer';

//-----------------------Drawer navigation Bar ---------------------------------------
console.disableYellowBox = true;

const Mdn = createDrawerNavigator({
  cropSelectionPage:{screen:CropSelectionPage},
},
{
  contentComponent: SideBar,
},
);

const page1 = createDrawerNavigator({
  forumQuery:{screen:ForumQuery},
},
{
  contentComponent: SideBar,
},
);

// const page2 = createDrawerNavigator({
//   loginSignUp:{screen:LoginSignUp},
// },
// {
//   contentComponent: SideBar,
// },
// );

const page3 = createDrawerNavigator({
  answersToQuestions:{screen:AnswersToQuestions},
},
{
  contentComponent: SideBar,
},
);
const page4 = createDrawerNavigator({
  cropDetailPage:{screen:CropDetailPage},
},
{
  contentComponent: SideBar,
},
);
const page5 = createDrawerNavigator({
  homePage:{screen:HomePage},
},
{
  contentComponent: SideBar,
},
);
const page6 = createDrawerNavigator({
  loginSignUp:{screen:LoginSignUp},
},
{
  contentComponent: SideBar,
},
);

const page7 = createDrawerNavigator({
  forum:{screen:Forum},
},
{
  contentComponent: SideBar,
},
);
const page8 = createDrawerNavigator({
  infoAndSelectImage:{screen:InfoAndSelectImage},
},
{
  contentComponent: SideBar,
},
);
const page9 = createDrawerNavigator({
  resultOfPredictedDisease:{screen:ResultOfPredictedDisease},
},
{
  contentComponent: SideBar,
},
);

const page10 = createDrawerNavigator({
  yieldPrediction:{screen:YieldPrediction},
},
{
  contentComponent: SideBar,
},
);
const page11 = createDrawerNavigator({
  instruction:{screen:Instruction},
},
{
  contentComponent: SideBar,
},
);

const page12 = createDrawerNavigator({
  questionForm:{screen: QuestionForm},
},
{
  contentComponent: SideBar,
},
);

const page13 = createDrawerNavigator({
  noPage:{screen: NoPage},
},
{
  contentComponent: SideBar,
},
);

const page14 = createDrawerNavigator({
  predictionFromServer:{screen: PredictionFromServer},
},
{
  contentComponent: SideBar,
},
);


//-----------------------Main App navigation ---------------------------------------


const AppNavigator = createStackNavigator({
  noPage : page13,
  loginSignUp:{screen:LoginSignUp},  
  profile: Mdn,
  profile1:page1,
  // profile2:page2,
  profile3:page3,
  profile4:page4,
  profile5:page5,
  profile6:page6,
  profile7:page7,
  profile8:page8,
  profile9:page9,
  profile10:page10,
  profile11:page11,
  profile12:page12,
  profile14:page14
  },
  {
  defaultNavigationOptions: ({navigation}) => {
    return {
      headerLeft:( 
        <FontAwesome5 name={"bars"} brand style={{paddingLeft:15 , fontSize: 30, color:'white'}} onPress={() => navigation.toggleDrawer()}/>
      ),
      title:("Farmitra"),
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize:30,
        color: "white",
      },
      headerStyle: {
        
        borderBottomColor:"white",
        borderBottomWidth:1,
        backgroundColor: "#0c420c"
      }
    };
  },      
  headerLayoutPreset: 'center'
});

export default createAppContainer(AppNavigator);