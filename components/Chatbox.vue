<template>
  <div class="chatbox d-flex mr-16 br10">
    <div class="title-bar d-flex">
      <div class="status-container d-flex">
        <div
          class="back-button"
          v-if="windowSize <= 540"
          @click="toggle_activeRoom()"
        >
          <img src="../components/Logo/Back.svg" alt="">
        </div>
        <!-- Profile Picture  -->
        <div class="circle-profile">
          <img class="pc-48" :src="activeRoom.roomProfile" alt="" />
        </div>
        <!-- Status Part -->
        <div class="status" v-if="activeRoom">
          <div class="name-status">{{ activeRoom.roomName }}</div>

          <div class="status-block">Online 5 hours</div>
        </div>

        <div class="status" v-else>
          <div class="name-status">No user</div>
        </div>
      </div>

      <!-- Button part -->
      <div class="button">
        <button @click="toggle_filter()">
            <img src="./Logo/More.svg" alt="">
          <!-- <railbird-icon icon="More"></railbird-icon> -->
        </button>
        <div class="dropdown br10" v-show="selected">
          <div class="dropdown-content d-flex flex-column">
            <div class="dropdown-menu d-flex">
              <img src="../components/Logo/Mute.svg" alt="">

              <li>Mute Chat</li>
            </div>
            <div class="dropdown-menu d-flex">
              <img src="../components/Logo/Report.svg" alt="">

              <li>Report User</li>
            </div>
            <div
              class="dropdown-menu d-flex"
              @click="deleteMessage(activeRoom.id)"
            >
              <img src="../components/Logo/Delete.svg" alt="">

              <li>Delete Chat</li>
            </div>
            <div
              class="dropdown-menu d-flex"
              @click="displayProfile()"
              v-if="windowSize <= 1200"
            >
             <img class="view" src="../components/Logo/More.svg" alt="">

              <li>View Profile</li>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="chatroom" ref="chatArea">
      <div
        class="chatroom-container"
        v-if="activeRoom && activeRoom.mainMessage.length > 0"
      >
        <div
          class="d-flex chatroom-container-wrapper mt-10"
          v-for="(y, index) in activeRoom.mainMessage"
          :key="index"
          :class="{
            start: !isMine(y),
            end: isMine(y),
            space: checkProfile(index),
          }"
        >
          <!-- Check for the same profile picture  -->
          <div class="empty" v-if="!isMine(y) && checkProfile(index)">
            <img id="hinh" src="./Logo/Group.png" alt="" />
          </div>
          <!-- Check user name for user profile  -->
          <div class="chatroom-profile-left" v-else-if="!isMine(y)">
            <img class="pc-36" :src="activeRoom.roomProfile" alt="" />
          </div>
          <div class="chatroom-icon-left d-flex" v-else>
            <img src="../components/Logo/Dots.svg" alt="jfkgj" />
          </div>

          <!-- Dislay Message of the user -->
          <div :class="{ orange: !isMine(y), user: isMine(y) }">
            <span class="message">
              {{ activeRoom.mainMessage[index].message }}</span
            >
          </div>

          <!-- Check for the right side of the chat  -->
          <div class="chatroom-icon-right d-flex" v-if="!isMine(y)">
            <img src="./Logo/Dots.svg" alt="" />
          </div>
          <div class="chatroom-icon-right d-flex" v-else>
            <img class="pc-16" src="./Logo/Checkmark.svg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="messages-bar">
      <div class="messages-bar-wrapper grid">
        <div class="input d-flex">
          <input
            type="text"
            placeholder="Type a mesaage here"
            v-model="newMessage.message"
            @keyup.enter="updateMessage"
          />
        </div>

        <span class="d-flex attach">
          <img class="pc-24" src="./Logo/Clip.svg" alt="" />
        </span>
        <span class="arrow" @click="updateMessage">
          <img src="./Logo/Send.svg" alt="" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Chatbox",

  data() {
    return {
      selected: null,
      newMessage: { name: "Kate Nash", message: "", profile: "" },
    };
  },
  computed: {
    ...mapGetters(["activeRoom", "windowSize", "masterRoom"]),
  },
  methods: {
    scrollToTop() {
      let messageDisplay = this.$refs.chatArea;
      messageDisplay.scrollTop = messageDisplay.scrollHeight;
    },
    ...mapMutations([
      "toggle_activeRoom",
      "toggle_profile",
      "deleteMessage",
      "updatingStore",
    ]),
    ...mapActions(["updateStore"]),

    toggle_filter() {
      return (this.selected = !this.selected);
    },
    displayProfile() {
      this.toggle_profile();
      this.toggle_filter();
    },
    isMine(message) {
      if (this.activeRoom.mainMessage.length > 1) {
        return message.name === "Kate";
      }
    },

    checkProfile(index) {
      const { mainMessage } = this.activeRoom;
      if (index === 0) return false;
      else {
        const previous = mainMessage[index - 1];
        const current = mainMessage[index];
        return previous.name === current.name;
      }

      //// compare index of the element in array and return
    },

    updateMessage: function () {
      const newMessage = Object.assign({}, this.newMessage);
      this.$store.commit("updateMessage", newMessage);
      this.newMessage.message = "";
      let messageDisplay = this.$refs.chatArea;
      messageDisplay.scrollTop = messageDisplay.scrollHeight;
     
    },
    deleteMessage: function (u) {
      if (this.masterRoom.length) {
        this.$store.commit("deleteMessage", u);
        this.$store.commit("updatingStore");
        this.toggle_filter();
      } else {
        alert("Please add someone to chat ");
      }
    },
  },
};
</script>

<style lang="scss" scoped >
@media (max-width: 540px) {
  .chatbox {
    margin: 0 !important;
    width: 100%;
    height: 105% !important;

    border: 0px !important;
  }
  ////////////  Titile Bar ////////////////
  .title-bar {
    width: 100% !important;
    height: 6rem !important;
    .button {
      margin-right: 1rem !important;
      width: 2rem !important;

      button {
        transform: rotate(180deg) !important;
        box-shadow: none !important;
      }

      .dropdown {
        position: fixed !important;

        left: 65vw;
      }
    }

    .status-container {
      width: 13.5rem !important;
      justify-content: end !important;
      margin-left: 1.25rem !important;

      .circle-profile {
        margin-left: 50px;
        margin-right: 1rem;
        svg {
          width: 40px;
          height: 40px;
        }
      }

      .status {
        margin-top: 4px;
        .name-status {
          font-size: 18px;
          font-weight: bold;
        }
        .status-block {
          font-size: 12px !important;
        }
      }
      .back-button {
        svg {
          height: 18px;
          widows: 10.8px;
        }
      }
    }
  }

  /////////// ChatRoom ///////////////
  .chatroom {
    height: 65vh !important;
    background: white !important;
    .chatroom-container-wrapper {
      .orange {
        margin-left: 10px !important;
        max-width: 15rem !important;
      }
      .user {
        margin-right: 10px !important;
      }
      .empty {
        width: 45px;
      }
      .chatroom-profile-left {
        margin-left: 10px !important;
        img {
          width: 25.32px;
          height: 23.13px;
        }
      }
      .chatroom-icon-left {
        display: none;
      }

      .chatroom-icon-right {
        margin-right: 15px !important;
      }
    }
  }
  ///////////// messages Wrapper /////////////
  .messages-bar {
    background: white !important;

    min-height: 3.7rem !important;
    .messages-bar-wrapper {
      grid-template-columns: 10fr 2fr 2fr !important;
      input {
        background: white !important;
      }

      justify-content: space-around !important;
    }
  }
}
.chatbox {
  border: 1px solid rgba(170, 170, 170, 0.2);
  margin-top: 1rem;
  flex-direction: column;

  height: 95%;

  .title-bar {
    border-top-left-radius: 0.625rem;
    border-top-right-radius: 0.625rem;
    width: 100%;
    height: 8rem;
    background-color: white;
    align-items: center;
    justify-content: space-between;

    .status-container {
      margin-left: 1.25rem;
      width: 12.5rem;
      align-items: center;
      justify-content: space-evenly;

      .status {
        .name-status {
          width: 6rem;
          font-size: 1.125rem;
          line-height: 1.3125rem;
        }

        .status-block {
          font-size: 0.9375rem;
          line-height: 1.125rem;
        }
      }
    }

    .button {
      position: relative;
      margin-right: 1rem;
      button {
        transform: rotate(90deg);
        margin-right: 2.6875rem;
        background: white;
        border: none;
        border-radius: 100%;
        width: 2.25rem;
        height: 2.25rem;
        box-shadow: 0px 0.625rem 0.9375rem rgba(0, 0, 0, 0.03),
          0px 0.54rem 1.5625rem rgba(42, 139, 242, 0.03),
          0px 0.3125rem 1.5625rem rgba(42, 139, 242, 0.07);

          
      }
       

      .dropdown {
        flex-direction: column;
        align-items: flex-start;
        box-shadow: 0px 0.4375rem 1.25rem rgba(0, 0, 0, 0.07);
        position: absolute;
        list-style: none;
        width: 8.5rem;

        background: white;

        .dropdown-content {
          height: 80%;
          width: 80%;
          margin-left: 1rem;
          margin-top: 1rem;

            svg{
              width: 1em;
              height: 1em;
            }

          .dropdown-menu {
            margin-bottom: 1rem;

            li {
              margin-left: 0.5rem;
              color: #5a5a5a;
              font-size: 0.8125rem;
              line-height: 1.125rem;
            }
          }
        }
      }
    }
  }

  .chatroom {
    overflow: auto;
    height: 72vh;
    width: 100%;
    background: #fafafa;
    padding-bottom: 60px;
    .chatroom-container {
      overflow: auto;
      .message {
        line-break: anywhere;
        overflow: hidden;
        max-width: 96%;
        margin: 1rem;
      }

      .chatroom-icon-right {
        flex-direction: column;
        justify-content: center;
        margin-right: 2rem;
      }

      .chatroom-icon-left {
        flex-direction: column;
        justify-content: center;
      }
      #hinh {
        flex-direction: column;
        justify-content: center;
        height: 100%;
        margin-left: 1.5rem;
        padding: 4px 0px 0px 10px;
        width: 36px;
        height: 36px;
        opacity: 0;
      }

      .chatroom-profile-left {
        flex-direction: column;
        justify-content: center;
        height: 100%;
        margin-left: 1.5rem;
        padding: 4px 0px 0px 10px;
        width: 36px;
        height: 36px;
      }
    }
    .display {
      display: none;
    }
    .space {
      margin-top: 0 !important;
    }

    .end {
      justify-content: flex-end;
    }

    .start {
      text-align: start;
    }

    .orange {
      margin-left: 1.5rem;
      margin-right: 0.8rem;
      max-width: 30rem;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background:#6495ed ;
      border-radius: 10px 10px 10px 0px;
      color: white;
      font-size: 15px;
      line-height: 20px;
      margin-bottom: 0.3rem;
    }
    .user {
      margin-right: 0.8rem;
      margin-left: 0.8rem;
      max-width: 30rem;
      min-width: 6rem;
      margin-bottom: 0.3rem;
      border: 1px solid rgba(112, 124, 151, 0.25);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: white;
      border-radius: 10px 10px 10px 0px;
      color: #3a3a3a;
      overflow: hidden;
      font-size: 15px;
      line-height: 20px;
    }
  }
  /* Message Bar  */
  .messages-bar {
    border-bottom-right-radius: 0.625rem;
    border-bottom-left-radius: 0.625rem;
    min-height: 8rem;
    width: 100%;

    background: #fafafa;
    border-top: 2px solid rgba(112, 124, 151, 0.15);
    .messages-bar-wrapper {
      margin-top: 1rem;
      grid-template-columns: 15fr 1fr 1fr;
    }
    .input {
      input::placeholder {
        color: rgba($color: #000000, $alpha: 1);
      }
      input {
        line-height: 20px !important;
        background: #fafafa;
        flex-basis: 96%;
        border: none;
        outline: none;
      }
      flex-basis: 80%;
      border: none;
      justify-content: flex-end;
    }
    .attach {
      justify-content: center;
      flex-basis: 7%;
    }
    .arrow {
      flex-basis: 7%;
      cursor: pointer;
    }
  }
}
</style>
