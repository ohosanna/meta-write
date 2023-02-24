<template>
  <div ref="editorEl" id="editor" class="editor">
    <h1>Rich Text Editor</h1>
    <p>This is an experimental WYSIWYG editor. The goal is to achieve an immersive and concise editing environment.</p>
    <p>Features:</p>
    <ul>
      <li>
        <p>Shortcut key / to show block menu.</p>
      </li>
      <li>
        <p>Inline format menu when selected text.</p>
      </li>
      <li>
        <p>Markdown-style formatted shortcut.</p>
      </li>
      <li>
        <p>Code highlighting.</p>
      </li>
    </ul>
    <p>This project is developed based on ProseMirror and CodeMirror.</p>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { createEditorState, createEditorView } from '@metawrite/editor'

  const editorEl = ref<HTMLDivElement | null>(null)
  
  onMounted(() => {
    const content = editorEl.value?.innerHTML || ''
    const editorState = createEditorState('full', 'test', content, 1, true)
    const editorView = editorEl.value ? createEditorView(editorEl.value, editorState) : null
    console.log(editorView)
  })
  
</script>
