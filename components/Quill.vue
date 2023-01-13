<!-- eslint-disable vue/require-default-prop -->
<template>
  <div>
    <client-only>
      <quill-editor ref="myQuillEditor"
                    v-model="content"
                    :options="editorOption"
                    :value="content"
                    place
                    inner-height="100px"
                    @input="updateContent"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>
    </client-only>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

export default {
  name: 'Quill',
  props: {
    // eslint-disable-next-line vue/require-prop-types, vue/require-default-prop
    placeholder: {String}
  },
  data() {
    return {
      content: '',
      editorOption: {placeholder: this.placeholder}
    }
  },
  methods: {
    onEditorBlur(quill) {
      // eslint-disable-next-line no-console
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      // eslint-disable-next-line no-console
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      // eslint-disable-next-line no-console
      console.log('editor ready!', quill)
    },
    onEditorChange({quill, html, text}) {
      // eslint-disable-next-line no-console
      console.log('editor change!', quill, html, text)
      this.content = html
    },
    updateContent() {
      this.$emit('input', this.content)
    }
  }
}
</script>

<style scoped>

.ql-snow{
  height: 170px !important;
}
</style>