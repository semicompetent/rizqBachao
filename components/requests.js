import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { YellowBox } from 'react-native';

let comp=(new Date().getDate()) + '/' + (new Date().getMonth()+1) +'/' + new Date().getFullYear()

YellowBox.ignoreWarnings(['Setting a timer']);
export default class requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      todos:[],
    //   comp: (new Date().getDate()) + '/' + (new Date().getMonth()+1) +'/' + new Date().getFullYear()


    };
    this.ref=firebase.firestore().collection('DonationReqs').where("Date", "==" ,comp);
    this.unsubscribe=null;

  }
  renderItem = ({item}) => {
      return (
            <View style={styles.view2}>
                <Text style={styles.fortext}>Address: {item.Address}</Text>
                <Text style={styles.fortext}>Donor: {item.Donor}</Text>
                <Text style={styles.fortext}>Items: {item.Item}</Text>
                <Text style={styles.fortext}>Quantity: {item.Quantity}</Text>
                <View style={styles.container}>
                <TouchableOpacity style={styles.button} 
                onPress={()=> this.props.navigation.navigate('workk',{
                  donEmail: item.D_Email 
               })}
                >
                <Text>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2}>
                <Text style={styles.btext}>Reject</Text>
                </TouchableOpacity>
                </View>
              <View
                  style={{
                      marginTop: 10,
                      borderBottomColor: '#59cbbd',
                      borderBottomWidth: 1,
                  }}
              />
                
            </View>
             
          
      )

  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onCollectionUpdate = (querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
      const { Address, D_Email, Date, Donor, Item, Quantity, Status } = doc.data();
      
      todos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        Address,
        D_Email,
        Date,
        Donor,
        Item,
        Quantity,
        Status,
      });
    });
  
    this.setState({ 
      todos,
      loading: false,
   });
  }
  render() {
    return (
        <View style={styles.view2}> 
        <FlatList
          data={this.state.todos}
          renderItem={this.renderItem}
        />
        {/* {
            // this.state.todos.map((y) => {
            //     return (<Text style={styles.input}>{y.Address}</Text>);
            // })
        } */}
        {/* <Text>{this.state.comp}</Text> */}
        </View>
    );
  }
}


const styles = StyleSheet.create({
  view1: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 3,
  
  },
  view2: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 45,
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 20
  },
  fortext:{
      fontSize: 16,
      alignSelf: 'stretch',
      height: 30,
      justifyContent: 'center',
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    width: '40%',
    height: 10,
    marginTop: 10,
    justifyContent: 'center'
  
  },
  button2: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F08080',
    width: '40%',
    height: 20,
    marginTop: 10,
    justifyContent: 'center'
  
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  
  },
  btext: {
    textAlign: 'center', 
  
  },
  });
