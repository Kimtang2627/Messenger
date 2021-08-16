<template>
  <div class="profile mt-10 br10 bc-white d-flex" :class="{width : windowSize >540}">
     
    <div class="profile-avatar">

      <div class="profile-avatar-picture">
         <img class="pc-48" :src="activeRoom.roomProfile" alt="" />
       
      </div>

      <div class="profile-avatar-name" v-if="activeRoom">{{activeRoom.roomName}}</div>
      <div class="profile-avatar-name" v-else>No Profile</div>
      <div class="profile-avatar-status">
        last active 5 hours ago
      </div>
    </div>
    <div class="view-button d-flex">
      <button @click="toggle_profile" v-if="windowHeight < 900 ">
        Back
      </button>
      <button v-else>
        View Profile
      </button>

    </div>
    
  </div>
</template>

<script>
import {mapGetters ,mapMutations} from "vuex"
export default {
  name: "Profile-side",
  computed: {
    ...mapGetters(['activeRoom',"windowSize","windowHeight"])
  },
  methods:{
    ...mapMutations(["toggle_profile"])
  }


};
</script>

<style lang="scss" scoped>
.profile {
  
 
  height: 15rem;
  
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .profile-avatar {
      .profile-avatar-picture{
          text-align: center;
          margin-bottom: 0.3125rem;
      }
    .profile-avatar-name {
        text-align: center;
      line-height: 1.375rem;
      font-size: 1.125rem;
      
    }
    .profile-avatar-status {
      color: #d3d3d3;
      font-size: 1rem;
      line-height: 1.125rem;
    }
  }

  .view-button{
      button{
          font-weight: 500;
font-size: 13px;
line-height: 18px;
          border: none;
          background: #FFF3EC;
          color: #6495ed;
      }
      margin-top: 1rem;
        justify-content: center;
      width: 6.25rem;
      height: 2.5rem ;
      background:#FFF3EC ;
      border-radius: 0.375rem;
  }

.width{
  width: 20rem;
}}
</style>
