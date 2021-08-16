<template>
  <div>
    
    <div class="nuxt" v-if="windowHeight > 350 && windowSize > 280">
      
      <Nuxt/>
    </div>
    <div class="error" v-else-if="windowHeight && windowSize "> Am I a joke to you . Who read at this screen size ?  </div>
  </div>
</template>

<script>
import {mapMutations , mapGetters} from "vuex"
  export default {
    created: function() {
    if (process.client) {
  this.$store.commit('updateScreen', window.innerWidth),
  this.$store.commit('updateHeight', window.innerHeight)
   window.addEventListener("resize" , (event) => {  this.$store.commit('updateScreen', event.currentTarget.innerWidth ) } ),
   window.addEventListener("resize" , (event) => {  this.$store.commit('updateHeight', event.currentTarget.innerHeight ) } )
    
  
} ;
this.filterUnread()

     
      },
    methods:{
        ...mapMutations(["filterUnread"])
    },
    computed: {
      ...mapGetters(["windowHeight","windowSize"])
    }
  }
</script>

<style lang="scss" >
*{
    box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.nuxt{
 
}
.error{
  padding-top: 90px;
}
</style>