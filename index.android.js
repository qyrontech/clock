
import React, { Component } from 'react';
import {AppRegistry, Button, Text, TextInput, View, TouchableOpacity, Animated, StyleSheet, ScrollView} from 'react-native';

class Index extends Component {
   constructor(props) {
      super(props);
      this.state = {
                    isStart: true,
                    isCount: true,
                    ms:0,
                    timer:0,
                    comments:[],
                    subMs:0,
                    timerTemp:0,
      }
    }

    start　(props) {
      if (this.state.isStart) {
        this.state.timer = setInterval(
          this.msCount.bind(this)
        ,100)
        this.state.timerTemp = setInterval(
            this.subMsCount.bind(this)
          ,100)
        this.setState({
          timer:this.state.timer,
          timerTemp:this.state.timerTemp
        })
      }
      else {
        clearInterval(this.state.timer)
        clearInterval(this.state.timerTemp)
      }
      this.setState({
        isStart:props.flg,
      })
      if (!this.state.isStart && (this.state.ms> 0)) {
        this.setState({
          isCount:false,
        }) 
      } else {
          this.setState({
          isCount:true,
        })
      }
    }

    //计数计时器
    subMsCount() {
        this.setState({
          subMs:this.state.subMs + 100,
        })
    }

    //大计时器
    msCount() {
       this.setState({
          ms:this.state.ms + 100,
        })
    }

    count () {
      //复位
      if (!this.state.isCount) {
        this.setState({
          ms:0,
          subMs:0,
          comments:[],
          isCount:true,
        })
      } else {
        //计次
          if (this.state.ms > 0) {
            
            //计时器暂停
            this.state.comments.unshift(this.state)
            this.setState({
              comments: this.state.comments,
              subMs:0,
            })
          }
       }
    }

  render() {
    const length = this.state.comments.length;
    return (
      <View style={{flex:1}}>
         <View style={{alignItems: 'center'}}>
            <Text style={{fontSize:20}}>秒表</Text>
         </View>
        <View style={styles.container}>

            <Clock ms={this.state.ms} subMs={this.state.subMs}/>

            <View style={styles.button}>
              <BtnStart onClick={this.start.bind(this)} isStart={this.state.isStart}/>
              <BtnCount onClick={this.count.bind(this)} isCount={this.state.isCount}/>
            </View>

            <ScrollView>
              {this.state.comments.map((countL, i) =>
               <CountList commentList = {countL} key={i} index={length - i}/>
               )}
            </ScrollView>
        </View>
      </View>
    );
  } 
}
///
class Clock extends Component {
  render() {
    const minute = parseInt(this.props.ms/60000);
    const second = parseInt((this.props.ms - minute*60000)/1000);
    const xSecond = parseInt((this.props.ms - second * 1000 - minute * 60000)/10);

    const minuteSub = parseInt(this.props.subMs/60000);
    const secondSub = parseInt((this.props.subMs - minuteSub*60000)/1000);
    const xSecondSub = parseInt((this.props.subMs - secondSub * 1000 - minuteSub * 60000)/10);
    return (
      <View>
        <Text style={{marginLeft:100}}>
          {minuteSub}:{secondSub}:{xSecondSub}
        </Text>
        <Text style={{fontSize:60}}>
          {minute}:{second}:{xSecond}
        </Text>
      </View>
    )
  }
}
///
class BtnStart extends Component {
  butonClick() {
    if (this.props.onClick) {
      this.props.onClick({
        flg:!this.props.isStart,
      })
   }
  }

  render() {
    return (
      <TouchableOpacity style={styles.startBtn} onPress={this.butonClick.bind(this)}>
          <View>
            <Text style={{fontSize:14, color:'#000000'}}>{this.props.isStart ? '启动' : '停止'}</Text>
          </View>
       </TouchableOpacity>
    )
  }
}
////

class BtnCount extends Component {

  render() {
    return (
      <TouchableOpacity style={styles.countBtn} onPress = {this.props.onClick}>
          <View>
            <Text style={{fontSize:14, color:'#000000'}}>{this.props.isCount ? '计次' : '复位'}</Text>
          </View>
       </TouchableOpacity>
    )
  }
}

///
class CountList extends Component {

  render() {
    const minute = parseInt(this.props.commentList.subMs/60000);
    const second = parseInt((this.props.commentList.subMs - minute * 60000)/1000);
    const xSecond = parseInt((this.props.commentList.subMs - second * 1000 - minute * 60000)/10);

      return (

      <View style={{flexDirection:'row', marginTop:10}}>
        <Text></Text>
        <Text style={{marginRight:60}}>计数： {this.props.index}</Text>
 
        <Text style={{marginLeft:10}}>
          {minute}:{second}:{xSecond}
        </Text>
      </View>
      )

  }
}
///
const styles = StyleSheet.create({
  container: {
    flex:2,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
  startBtn: {
    marginRight:60,
    width:60,
    height:60,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
  },
  countBtn: {
    marginLeft:40,
    width:60,
    height:60,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
  },
});


AppRegistry.registerComponent('AwesomeProject', () => Index);
