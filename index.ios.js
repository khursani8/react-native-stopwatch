import React from 'react'
import formatTime from 'minutes-seconds-milliseconds'
import {
  Text,
  View,
  TouchableHighlight,
  AppRegistry,
  StyleSheet,

} from 'react-native'

var StopWatch = React.createClass({
  getInitialState:function(){
    return {
      timeElapsed:null,
      running:false,
      startTime:null,
      laps:[]
    }
  },
  render:function(){
      return <View style={styles.container}>

      <View style={[styles.header,this.border('yellow')]}>
        <View style={[this.border('red'),styles.timerWrapper]}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>

        <View style={[this.border('green'),styles.buttonWrapper]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>

      <View style={[styles.footer,this.border('blue')]}>
        {this.laps()}
      </View>

    </View>
  },
  startStopButton:function(){
    var style = this.state.running ? styles.stopButton : styles.startButton
    return <TouchableHighlight underlayColor="red" onPress={this.handleStartPress} style={[styles.button,style]}>
      <Text>
        {this.state.running ? 'Stop' : 'Start'}
      </Text>
    </TouchableHighlight>
  },
  lapButton:function(){
    return <TouchableHighlight onPress={this.handleLapPress} style={styles.button} underlayColor='gray'>
      <Text>
        Laps
      </Text>
    </TouchableHighlight>
  },
  laps:function(){
    return this.state.laps.map((lap,index)=>{
      return <View style={styles.lap} key={index}>
        <Text style={styles.lapText}>
          #{index+1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(lap)}
        </Text>
      </View>
    })
  },
  handleLapPress:function(){
    var lap = this.state.timeElapsed

    this.setState({
      startTime:new Date(),
      laps:this.state.laps.concat([lap])
    })
  },
  handleStartPress:function(){

    if(this.state.running){
      clearInterval(this.interval);
      this.setState({running:false})
      console.log('dh tak running')
      return
    }

    this.setState({startTime:new Date()})
    this.interval = setInterval(
      ()=>{
        this.setState({
          timeElapsed:new Date() - this.state.startTime,
          running:true
        })
    },1)

  },
  border:function(color){
    return {
      borderColor:color,
      borderWidth:4
    }
  }
})

var styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"stretch"
  },
  header:{
    flex:1
  },
  footer:{
    flex:1
  },
  timerWrapper:{
    flex:5,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonWrapper:{
    flex:3,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  timer:{
    fontSize:60
  },
  button:{
    borderWidth:2,
    height:70,
    width:70,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center'
  },
  startButton:{
    borderColor:'#00CC00'
  },
  stopButton:{
    borderColor:'#CC0000'
  },
  lap:{
    justifyContent:'space-around',
    flexDirection:'row'
  },
  lapText:{
    fontSize:40
  }
})


AppRegistry.registerComponent('stopwatch',()=>StopWatch);
