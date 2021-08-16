
export const state = () => ({
    masterRoom: [
        {
            id: 1,
            unRead: null,
            roomProfile: require("../components/Logo/Ethel.svg"),
            time: 7.25,
            selected: null,
            roomName: "Kate",
            mainMessage: [
                {
                    profile: require("../components/Logo/Ethel.svg"),
                    name: "Kate Nash",
                    isRead: true,
                    message: "This example of when you run into the thing that the text line means that you willl lose jgkfgjogkfgjoirklf poorigjoirjgl peorgror progpro protir pprpretierp peroteprit pero tipergpi perotipert porkgoiug lkgjorg popg ofgjpgpfgj pgerogofg prpgr pritr pogfp p"
                },
                {
                    profile: require("../components/Logo/Ethel.svg"),
                    name: "Kate Nash",
                    isRead: null,
                    message: "This example of when you run into the thing that the text line means that you willl lose jgkfgjogkfgjoirklf poorigjoirjgl peorgror progpro protir pprpretierp peroteprit pero tipergpi perotipert porkgoiug lkgjorg popg ofgjpgpfgj pgerogofg prpgr pritr pogfp p"
                },
                {
                    profile: require("../components/Logo/Profile.svg"),
                    name: "Kate",
                    isRead: null,
                    message: ' kfgjfk g '
                },
                {
                    profile: require("../components/Logo/Ethel.svg"),
                    name: "Kate Nash",
                    isRead: null,
                    message: "This example of when you run into the thing that the text line means that you willl lose jgkfgjogkfgjoirklf poorigjoirjgl peorgror progpro protir pprpretierp peroteprit pero tipergpi perotipert porkgoiug lkgjorg popg ofgjpgpfgj pgerogofg prpgr pritr pogfp p"
                },
                {
                    profile: require("../components/Logo/Ethel.svg"),
                    name: "Kate Nash",
                    isRead: null,
                    message: ' kfgjfk g jbkfjklgfjlkgfgfg or itopritpfl  tro  protiprot [ert er[pto otrpro'
                },

            ]
        },
        {
            id: 2,
            roomName: "Kate Nash",
            roomProfile: require("../components/Logo/Alan.png"),
            unRead: null,
            time: 6.45,
            selected: null,
            mainMessage: [
                {
                    name: "Kate Nash",
                    profile: require("../components/Logo/Alan.png"),
                    isRead: true,
                    message: "This example of when you run into the thing that the text line means that you willl lose"
                },
                {
                    name: "Kate",
                    profile: require("../components/Logo/Ethel.svg"),
                    isRead: true,
                    message: ' olalelolels'
                },
                {
                    name: "Kate Nash",
                    profile: require("../components/Logo/Alan.png"),
                    isRead: true,
                    message: "This example of when you run into the thing that the text line means that you willl lose"
                },
            ]
        },
        {
            id: 3,
            roomName: "Kate",
            roomProfile: require("../components/Logo/Profile.svg"),
            unRead: null,
            time: 5.54,
            selected: null,
            mainMessage: [
                {
                    name: "Kate Nash",
                    profile: require("../components/Logo/Profile.svg"),
                    isRead: null,
                    message: "This example of when you run into the thing that the text line means that you willl lose"
                },
                {
                    name: "Kate",
                    isRead: null,
                    message: ' jfkrfj'
                },
                {
                    name: "Kate Nash",
                    profile: require("../components/Logo/Profile.svg"),
                    isRead: null,
                    message: "This example of when you run into the thing that the text line means that you willl lose"
                },
            ]
        },


    ],
    windowHeight: null,
    activeRoom: null,
    windowSize: null,
    mobile: true,
    profile: null,
    index: null,
    modal: null
});

export const mutations = {

    sortTime(state) {
        state.masterRoom.sort((a, b) => b.time - a.time)
    },
    toggle_activeRoom(state) {
        state.activeRoom = null
    },
    toggle_modal(state) {
        state.modal = !state.modal
    },
    toggle_mobile(state) {
        
        state.mobile = !state.mobile
    },
    toggle_profile(state) {
      

        state.profile = !state.profile
    },

    setDefaultRoom(state) {

        state.activeRoom = state.masterRoom.find(room => room.unRead == 0)


    },
    setActiveRoom(state, value) {
        // mutate state
        state.activeRoom = value;
    },
    deleteMessage(state, deletion) {
        state.masterRoom = state.masterRoom.filter((room) => room.id !== deletion);
    },
    updateMessage(state, message) {

        state.activeRoom.mainMessage = state.activeRoom.mainMessage.concat(message);
    },
    filterUnread(state) {
        state.masterRoom.forEach(room => {
            room.unRead = room.mainMessage.filter(message => message.isRead == null).length;
            
        })

    },

    setRead(state, activeroom) {
        state.masterRoom.forEach((room) => {
            if (room.id == activeroom) {
                room.unRead = 0;
            }
        })
    },


    checkSelectedRoom(state, activeroom) {
        if (state.windowSize > 540) {
            state.masterRoom.forEach((room) => {
                if (room.id == activeroom) {
                    room.selected = true;
                    
                } else {
                    room.selected = null
                }
            })
        }

    },
    updateRoom(state, room) {
        state.masterRoom = state.masterRoom.concat(room);
    },

    updateHeight(state, height) {
        state.windowHeight = height;
        
    },

    updateScreen(state, size) {
        state.windowSize = size;
        console.log(state.windowSize)

        

    },
    updatingStore(state) {

        state.activeRoom = state.masterRoom[0]

    }

}


export const getters = {

    activeRoom: state => state.activeRoom,
    windowSize: state => state.windowSize,
    mobile: state => state.mobile,
    profile: state => state.profile,
    masterRoom: state => state.masterRoom,
    modal: state => state.modal,
    unRead: state => state.unread,
    windowHeight: state => state.windowHeight
}


