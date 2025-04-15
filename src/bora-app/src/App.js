import { View, StyleSheet, Image } from 'react-native'

export default function App(){
  return(
    <View style={styles.container}>
      <Image
        source={require("./assets/idle_screen.png")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#F3F3ff",
    justifyContent: "center",
    alignItems: "center"
  }
})