<template>
  <div class="pop-up">
        Please Add Someone To Chat  
          <div>
        <input type="text" v-model="room.roomName">
        
      </div>
      <div @click="updateR">
          Add 
      </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
   
name: "popUp" , 
computed:{
    ...mapGetters["activeRoom"]
},
methods: {
     updateR() {
      if(this.room.roomName == ""){
        alert("PLease enter a chat name ")
      }else{
      const newRoom = Object.assign({}, this.room);
      this.$store.commit("updateRoom", newRoom);
      this.$store.commit("toggle_modal")
      }
      
     }

},
data(){
  return {
     room: {
        id: 10,
        roomProfile: require("./Logo/Profile.svg"),
        selected: null,
        roomName: "",
        mainMessage: [],
      },
  }
}
}
</script>

<style lang="scss" scoped>
.pop-up{
z-index: 10;
background: white;
  position: fixed;
  top: 11rem;
  left: 4rem;
}

</style>