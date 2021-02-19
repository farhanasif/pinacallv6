import React from 'react';
import { View } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';

class VideoCall extends React.Component {
  constructor(props) {
    super(props);
    this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
    this.onConferenceJoined = this.onConferenceJoined.bind(this);
    this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);
  }

  componentDidMount() {
      const url = 'https://meet.entertechbd.com/mango'; // can also be only room name and will connect to jitsi meet servers
      const userInfo = { displayName: 'Farhan', email: 'farhan@example.com', avatar: 'https:/gravatar.com/avatar/abc123' };
      JitsiMeet.call(url, userInfo);
      /* You can also use JitsiMeet.audioCall(url) for audio only call */
      /* You can programmatically end the call with JitsiMeet.endCall() */
  }

  onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    const {navigation} = this.props;
    navigation.navigate('Home')
  }

  onConferenceJoined(nativeEvent) {
    /* Conference joined event */
  }

  onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
  }

  render() {
    return (
      <View style={{ backgroundColor: 'black',flex: 1 }}>
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