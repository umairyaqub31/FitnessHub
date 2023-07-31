import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Dimensions,
  TextInput,
  Platform,
  UIManager,
  Button,
  FlatList,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import {Divider, Avatar} from 'react-native-paper';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {colors} from '@config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

class TrainerDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.modalizeRef = React.createRef();
  }

  modalizeOpen = () => {
    this.modalizeRef.current?.open();
  };

  render() {
    return (
      <Portal>
        <Modalize
          ref={this.modalizeRef}
          modalStyle={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
          snapPoint={310}
          adjustToContentHeight={true}
          // alwaysOpen={windowHeight}
        >
          <View style={{flex: 1, borderWidth: 1}}>
            <View style={styles.popUpHead}>
              {/* <Text style={styles.heading}>Select Privacy</Text> */}
              <TouchableOpacity
                style={styles.touchOpacity}
                onPress={() => this.modalizeRef.current?.close()}>
                {/* <Text style={styles.textPrimary}>Done</Text> */}
                <Entypo name="cross" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.spacingXL} />

            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              style={[
                styles.scrolledview,
                {borderWidth: 1, marginHorizontal: 50},
              ]}>
              {/* <TouchableWithoutFeedback> */}
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>dsakhdkashkdhaskhdksahkdhas</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>
              <Text>Hello</Text>

              <Text>Hello</Text>
              {/* </TouchableWithoutFeedback> */}
            </ScrollView>
          </View>
        </Modalize>
      </Portal>
    );
  }
}

export default TrainerDetailModal;
