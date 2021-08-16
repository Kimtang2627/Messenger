<template>
  <div class="media mt-10 br10 bc-white">
    <!-- Media title part -->

    <div class="media-title d-flex">
      <div
        :class="{ border: fileOn }"
        @click="toggle_filter"
        class="media-title-file"
      >
        FILES
      </div>
      <div
        :class="{ border: mediaOn }"
        @click="toggle_filter"
        class="media-title-media"
      >
        MEDIA
      </div>
    </div>

    <!-- FIle content  -->
    <div class="media-file" v-if="fileOn">
      <div
        class="media-file-tag d-flex"
        v-for="(m, index) in file"
        :key="index"
      >
        <div class="media-tag-pic">
           <img src="./Logo/Folder.svg" alt="">
          
        </div>

        <div class="media-tag-content d-flex">
          <div class="f-14 bold">{{ file[index].content }}</div>
          <div class="f-14 media-content-sub">{{ file[index].subContent }}</div>
        </div>
      </div>
    </div>

    <!-- Media Content  -->
    <div class="media-file" v-else>
      <div
        class="media-file-tag d-flex"
        v-for="(m, index) in file"
        :key="index"
      >
        <div class="media-tag-pic">
         <img src="./Logo/Folder.svg" alt="">

         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Media",
  data() {
    return {
      fileOn: true,
      mediaOn: null,
      file: [
        { content: "Messenger File", subContent: " Messenger" },
        { content: "Messenger File", subContent: " Messenger" },
        { content: "Messenger File", subContent: " Messenger" },
      ],
    };
  },
  methods: {
    toggle_filter() {
      this.fileOn = !this.fileOn;
      this.mediaOn = !this.mediaOn;
    },
  },
};
</script>

<style lang="scss" scoped>
.media {
  height: calc(100% - 16rem) !important;
  .media-title {
    height: 4.6875rem;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;

    .border {
      border-bottom: #6495ed 0.1875rem solid;
      border-radius: 12.5rem 12.5rem 0px 0px;
    }

    .media-title-file {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 5.375rem;
      height: 2.5rem;
    }

    .media-title-media {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 5.375rem;
      height: 2.5rem;
    }
  }

  .media-file {
    min-height: 325px;

    padding-bottom: 3rem;

      img{
        padding-bottom: 8px;
        
      }
  }

  .media-file-tag {
    width: 100%;
    justify-content: center;
    margin-top: 1.25rem;

    .media-tag-content {
      flex-direction: column;
      margin: 0 1.125rem;
      justify-content: center;
      line-height: 1rem;

      .media-content-sub {
        color: #040415;
        opacity: 0.4;
        line-height: 1.5rem;
      }
    }
  }
}
</style>
