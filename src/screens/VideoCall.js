import React from 'react';
import { View, Text } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import BASE_URL from '../assets/utils/url';

class VideoCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      mobile: ''
    }
    this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
    this.onConferenceJoined = this.onConferenceJoined.bind(this);
    this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);
  }

  _interval

  componentDidMount() {
      const url = 'https://meet.entertechbd.com/C8mvPH'; // can also be only room name and will connect to jitsi meet servers
      const userInfo = { displayName: 'Farhan', email: 'test@example.com', avatar: 'https:/gravatar.com/avatar/abc123' };
      JitsiMeet.call(url, userInfo);

      console.log(this.props.route.params.mobile);
      this.setState({mobile : this.props.route.params.mobile})
      /* You can also use JitsiMeet.audioCall(url) for audio only call */
      /* You can programmatically end the call with JitsiMeet.endCall() */
  }

  onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    clearInterval(this._interval);
    alert('total call time: ', this.state.seconds);
    try {
        let response = fetch(
            BASE_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    seconds: this.state.seconds,
                    mobile: this.state.mobile,
                    action: 'closeUserRequest'
                }),
            }
        );

    }
    catch (error) {
        alert('An error occured during api data fetch: '+error);
    }
    const {navigation} = this.props;
    navigation.navigate('Home')
  }

  onConferenceJoined(nativeEvent) {
    /* Conference joined event */

    this._interval = setInterval(() => {
        console.log('second:', this.state.seconds)
        this.setState({
          seconds: this.state.seconds + 1,
      })
    }, 1000);
  }

  onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
  }

  render() {
    return (
      <View style={{ backgroundColor: 'black',flex: 1 }}>
        <View style={{ position: 'absolute', top: 10, left: 60, zIndex: 11111}}>
          <Text style={{ color: 'white', fontWeight: '700', fontSize: 20 }}>{this.state.seconds} sec.</Text>
        </View>
        <JitsiMeetView
          onConferenceTerminated={this.onConferenceTerminated}
          onConferenceJoined={this.onConferenceJoined}
          onConferenceWillJoin={this.onConferenceWillJoin}
          style={{ flex: 1, height: '100%', width: '100%' }}
        />
      </View>
    );
  }
}

export default VideoCall;