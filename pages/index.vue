<template>
  <div class="wrapper">
    <Popup v-if="modal" />

    <div class="mobile" v-if="windowSize && windowSize <= 540">
      <!--  Check default condition when user refresh page -->
      <div class="mobile-chatbox d-flex flex-center" v-if="activeRoom">
        <Chatbox v-if="!profile" />
        <div v-else class="mobile-profile-wrapper">
          <Profile-side />
          <Media />
        </div>
      </div>

      <div class="mobile-box d-flex flex-center" v-else>
        <Inbox />
      </div>
    </div>

    <div class="side-wrapper" v-else-if="windowSize && windowSize > 1200">
      <div class="side-container d-flex">
        <div><Inbox /></div>
        <div class="chat-box" v-if="masterRoom.length && activeRoom">
          <Chatbox />
        </div>
        <div v-else-if="masterRoom.length == 0 && activeRoom == null">You have no one to chat , Please create a chat room</div>

        <div class="profile-wrapper" v-show="activeRoom && activeRoom.roomName">
          <Profileside />
          <Media />
        </div>
      </div>
    </div>

    <div class="side-wrapper" v-else-if="windowSize">
      <div class="side-container d-flex">
        <div>
          <Inbox />
        </div>

        <div class="chat-box" v-if="masterRoom.length && activeRoom">
          <Chatbox />
        </div>

        <div v-else-if="masterRoom.length == 0 && activeRoom == null">You have no one to chat , Please create a chat room</div>

        <div class="profile-wrapper" v-show="profile && activeRoom.roomName">
          <Profileside />
          <Media />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";


export default {
  
  computed: {
    ...mapGetters([
      "windowHeight",
      "windowSize",
      "mobile",
      "profile",
      "activeRoom",
      "masterRoom",
      "modal",
    ]),
  },
  methods: {
    ...mapMutations([
      "toggle_profile",
      "updateRoom ",
      "setDefaultRoom",
      "updateScreen",
    ]),
  },
};
</script>

<style lang="scss" scoped >
.wrapper {
  width: 100vw;

  height: 100vh !important;

  overflow: hidden;
  background: #fafafa;

  .modal {
    position: fixed;
  }
}

/////////////Mobile Part ////////////
.mobile {
  height: 100%;
  background: white;
  .mobile-chatbox {
    height: 100%;
    margin-top: 1rem;
    @media (max-height: 568px) {
      margin-top: 0 !important;
    }

    .mobile-profile-wrapper {
      .back {
        position: sticky;
        top: 3vh;
        left: 45vw;
      }
    }
  }
}

.side-wrapper {
  margin-left: 1rem;
  margin-right: 1rem;
  background-color: white;
  height: 100%;

  .side-container {
    background: #faf5f57a;
    display: flex;

    height: 100%;
    .chat-box {
      width: 75vw;
    }

    .profile-wrapper {
      height: 95%;
      width: 20rem;
    }
  }
}


</style>