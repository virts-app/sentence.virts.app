<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    <div class="max-w-4xl w-full sm:px-6 lg:px-8">
      <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
        <textarea class="border-2 rounded w-full h-full p-2 border-gray-400" v-model="sentence"
          placeholder="添加句子，换行需使用两个换行符"></textarea>
        <h2 class="text-2xl leading-7 sentence-font" v-html='marked_sentence'>
        </h2>
        <p class="mt-8 pt-4 text-gray-800 border-t border-dashed">
          <input class="border-2 p-1 rounded border-gray-400" v-model="author" placeholder="添加作者">
        </p>
      </div>
      <div class="flex justify-center pt-4 space-x-2">
        <button
          class="bg-gray-600 rounded w-24 min-w-full h-12 min-h-full text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gary-600 focus:ring-opacity-50"
          @click="addSentence" :disabled="btn_disable">
          {{btn_content}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  const marked = require("marked")
  export default {
    data() {
      return {
        sentence: "",
        author: "",
        btn_disable: false,
        btn_content : "确定"
      }
    },
    methods: {
      addSentence() {
        const _this = this
        this.btn_disable = true
        this.btn_content = "正在添加数据"
        const Sentence = this.$AV.Object.extend('Sentence')
        const sentence = new Sentence()
        sentence.set('content', marked(this.sentence))
        this.author && sentence.set('author', this.author)
        this.sentence && sentence.save().then((item) => {
            setTimeout(function(){
                _this.btn_disable = false
                _this.btn_content = "确定"
            },1000)
            this.btn_content = "保存成功"
            this.sentence = ""
            this.author = ""
            
          console.log(`保存成功。objectId：${item.id}`)
        }, (error) => {
            this.btn_content = "保存失败，请打开控制台查看错误信息"
        })
      }
    },
    computed: {
      marked_sentence: function () {
        return marked(this.sentence)
      }
    }
  }

</script>
