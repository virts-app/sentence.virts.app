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
        this.change_time = now + 2
      }
    },
  }

</script>
