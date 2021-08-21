import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase'


export default class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            errorMessage: null
        }
        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp = () => {
        const { email, name } = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    email 
                })

                return userCredentials.user.updateProfile({
                    displayName: this.state.name

                });
            })
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>
                    {'Welcome to VegBook!\nSign Up to get started.'}
                </Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name}
                        >

                        </TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        >

                        </TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize='none'
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        >

                        </TextInput>

                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onSignUp()}
                >
                    <Text style={{ color: "#fff", fontWeight: '500' }}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 32 }} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={{ color: '#414959', fontSize: 13 }}>
                        Already signed up to VegBook?
                        <Text style={{ fontWeight: '500', color: '#3f882c' }}> Login</Text>
                    </Text>
                </TouchableOpacity>

            </View>




        )

    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'

    },

    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },

    error: {
        color: '#E9446A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'

    },

    form: {
        marginBottom: 48,
        marginHorizontal: 30

    },

    inputTitle: {
        color: "#175d03",
        fontSize: 10,
        textTransform: 'uppercase'

    },

    input: {
        borderBottomColor: '#000000',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#000000'
    },

    button: {
        marginHorizontal: 30,
        backgroundColor: '#3f882c',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'

    }





})