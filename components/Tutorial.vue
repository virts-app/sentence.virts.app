<template>
  <!-- <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"> -->
  <div class="relative flex justify-center min-h-screen bg-gray-100 items-center sm:pt-0">
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6 sentence-font" @click="changeSentence">
        <h2 class="text-2xl leading-7 font-semibold" v-html="sentence">
        </h2>
        <p class="mt-4 pt-4 text-gray-800 border-t border-dashed">
          <code class="bg-gray-100 text-sm p-1 rounded border float-right author-font">{{author}}</code>
        </p>
      </div>
      <div class="flex justify-center pt-4 space-x-2">
        <a href="https://github.com/virts-app/sentence.virts.app" target="_blank"><svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" />
          </svg></a>

        <a href="mailto:ufoquinccy@outlook.com" target="_blank"><svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9.06 8.683L5.648 6.238 4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.285 5.439z" />
            </svg></a>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sentence: "正在加载中...",
        author: "请稍等",
        sentence_list: [],
        sentence_number: 0,
        change_time: 0
      }
    },
    beforeMount() {
      const query = new this.$AV.Query('Sentence');
      const _this = this
      query.find().then((sentences) => {
        _this.sentence_list = sentences
        _this.sentence_number = Math.floor((Math.random() * sentences.length))
        _this.sentence = sentences[_this.sentence_number].get('content')
        _this.author = sentences[_this.sentence_number].get('author')
      });
    },
    mounted() {
      var _this = this;
      document.onkeydown = function (e) {
        let key = window.event.keyCode;
        if (key == 32 || key == 13) {
          _this.changeSentence()
        }
      }
    },
    methods: {
      changeSentence() {
        const now = Date.parse(new Date()) / 1000
        if (now < this.change_time) {
          return
        }
        const sentences = this.sentence_list
        var random_number = Math.floor((Math.random() * sentences.length))
        while (this.sentence_number == random_number) {
          random_number = Math.floor((Math.random() * sentences.length))
        }
        this.sentence_number = random_number
        this.sentence = sentences[this.sentence_number].get('content')
        this.author = sentences[this.sentence_number].get('author')
        // this.change_time = now + (this.sentence.length / 10)
        this.change_time = now + 1
      }
    },
  }

</script>
