<template>
  <div class="inbox mt-10 mr-16">
    <!-- Inbox Notification Part  -->
    <div class="inbox-container br10 d-flex">
      <div class="inbox-notification d-flex">
        <span> INBOX {{ masterRoom.length }} </span>
      </div>
      <img @click="toggle_modal" src="./Logo/Add.svg" alt="" />
    </div>
    <!-- Message Box Part  -->

    <!-- Desktop Version , Check For screen size and if there are any chatroom in master room  -->
    <div
      class="message-container"
      v-if="windowSize > 540 && masterRoom.length > 0"
    >
      <div
        class="content-wrapper white br10 d-flex flex-column flex-center"
        :class="{ green: chatroom.selected, opacity: chatroom.unRead }"
        v-for="(chatroom, index) in masterRoom"
        :key="index"
        @click="setActiveRoom(chatroom, chatroom.id)"
      >
        <div class="information-container d-flex">
          <div class="profile-name d-flex">
            <img class="pc-24" :src="chatroom.roomProfile" alt="" />
            <span class="user-name">{{ name(chatroom.mainMessage) }}</span>
          </div>
          <div class="time d-flex flex-center">
            <span> {{ chatroom.time }} pm </span>
          </div>
        </div>
        <div class="message">
          {{ message(chatroom.mainMessage) }}
        </div>
        <div class="unread d-flex flex-center" v-if="chatroom.unRead > 0">
          <span> {{ chatroom.unRead }} </span>
        </div>
        <div :class="{ border: chatroom.selected }"></div>
      </div>
    </div>

    <!-- Mobile Version -->

    <div
      class="message-container"
      v-else-if="windowSize < 540 && masterRoom.length > 0"
    >
      <div
        class="content-wrapper br10 d-flex flex-column flex-center"
        v-for="(chatroom, index) in masterRoom"
        :key="index"
        @click="setActiveRoom(chatroom, chatroom.id)"
      >
        <div class="information-container d-flex">
          <div class="profile-name d-flex">
            <img class="pc-24" :src="chatroom.roomProfile" alt="" />
            <span class="user-name">
              {{ name(chatroom.mainMessage) }}
            </span>
          </div>
          <div class="time d-flex flex-center">
            <span> {{ chatroom.time }}pm </span>
          </div>
        </div>
        <div class="message">
          {{ message(chatroom.mainMessage) }}
        </div>
        <div class="unread d-flex flex-center" v-if="chatroom.unRead > 0">
          <span> {{ chatroom.unRead }} </span>
        </div>
      </div>
    </div>

    <div v-else>There is Nothing to Display</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "inbox",
  data() {
    return {
      chosen: null,
    };
  },
  created() {
    this.sortTime();
    if (this.windowSize > 540) {
      this.setDefaultRoom();
      this.checkSelectedRoom(this.activeRoom.id);
    }
  },

  methods: {
    message: function (text) {
      if (text.length) return text[text.length - 1].message;
    },
    name: function (user) {
      if (user.length) return user[user.length - 1].name;
    },
    ...mapMutations([
      "toggle_mobile",
      "toggle_modal",
      "checkSelectedRoom",
      "setDefaultRoom",
      "sortTime",
      "setRead",

      "filterUnread",
    ]),
    setActiveRoom: function (chatroom, id) {
      this.$store.commit("setActiveRoom", chatroom);
      this.$store.commit("checkSelectedRoom", id);
      this.$store.commit("setRead", id);

     
    },
    isMine: function (message) {
      return message.name == "Kate";
    },
  },

  computed: {
    ...mapState(["masterRoom"]),

    ...mapGetters(["activeRoom", "windowSize"]),
  },

  data() {
    return {};
  },
};
</script>

<style lang='scss' scoped>
@media (max-width: 500px) {
  .inbox {
    background: white !important;
    width: 23.4rem !important;
    height: 100vh !important;
    margin: 0 !important;

    .inbox-container {
      margin-bottom: 0.5rem !important;
      width: 100% !important;
      border-radius: none;

      .inbox-notification {
        margin-left: 1.375rem !important;
      }
      img {
        display: none;
      }
    }

    .content-wrapper:hover {
      border-radius: 0 !important;
      border-right: 3px solid #ed702d !important;
      background: #fff3ec !important;
      box-shadow: 10px 10px 50px rgba(0, 0, 0, 0.07);
    }

    .content-wrapper {
      border-radius: none !important;
      width: 100% !important;
    }

    .message-container {
      width: 100%; // respectively to inbox
      .information-container {
        width: 19.375rem !important;
        margin-left: 0.5625rem !important;
      }
      .message {
        font-size: 15px !important;
        line-height: 18px;

        margin-right: 0.125rem !important;
        width: 18.3125rem !important;
      }
    }

    .unread {
      margin-bottom: 109px !important;
      left: 18rem !important;
      position: sticky !important;
      margin: 0 !important;
    }
  }
}
.inbox {
  width: 18.5rem;
  height: 100%;
  background: #fafafa;

  ////////////////// Inbox Container///////////////////////////
  .inbox-container {
    justify-content: space-between;
    background: white;
    border-radius: 10px;
    align-items: center;
    height: 2.75rem;
    margin-bottom: 0.75rem;

    .inbox-notification {
      font-weight: bold;
      color: #6495ed;
      font-size: 15px;
      line-height: 18px;
      margin-left: 1.5rem;
    }

    img {
      margin-right: 0.5rem;
    }
  }

  ///////////////// Message Container ////////////////
  .message-container {
    width: 100%; ///respectively to inbox of desktop
    height: 84vh;
    overflow: auto; ///to the heigth of the inbox
    position: relative;

    .content-wrapper {
      // background: white;
      height: 7.5rem;
      margin-bottom: 0.75rem;
      width: 100%;

      ///// Name and Avatar Part
      .information-container {
        justify-content: space-between;
        width: 86%; //respectively with content wrapper
        .profile-name {
          justify-content: space-between;
          width: 65%; //respectively with information container
          align-items: center;

          .user-name {
            font-weight: bold;
            font-size: 16px;
            line-height: 24px;
            margin-right: 3rem;
            flex: 5;
            margin-left: 0.5rem;
          }

          img {
            height: 24px;
            width: 24px;
            flex: 1;
          }
        }
        .time {
          margin-right: 0.78rem;
          span {
            font-size: 14px;
            color: rgba($color: #000000, $alpha: 0.4);

            line-height: 18px;
          }
        }
      }

      ///// Message from User
      .message {
        color: rgba($color: #000000, $alpha: 0.4);
        height: 2.25rem;
        overflow: hidden;
        margin-top: 0.5rem;
        margin-right: 3rem;
        width: 70%; //respectively with content-wrapper
        font-size: 14px;
        line-height: 18px;
      }

      ///// For unread Message
      .unread {
        position: fixed;
        width: 20px;
        height: 20px;
        margin-top: 4rem;
        left: 245px;
        background: #6495ed;
        border-radius: 100%;
        font-size: 10px;
        line-height: 140%;
        color: #ffffff;
      }

      .border {
        position: absolute;
        width: 109px;
        border-top: 3px #6495ed solid;
        left: 240px;
        transform: rotate(-90deg);
        border-radius: 10px;
      }
    }
  }
}
</style>