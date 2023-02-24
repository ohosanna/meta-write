import { schemas, fromHTML } from '@metawrite/schema'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import type { Transaction } from 'prosemirror-state'
import { getPlugins } from '../plugins'
import { isEditable } from '../plugins/editable'

export function createEditorState(
  useSchema: schemas.UseSchema,
  stateKey: any,
  content: string,
  version: number,
  startEditable: boolean,
) {
  const schema = schemas.getSchema(useSchema);
  const plugins = getPlugins(useSchema, schema, stateKey, version, startEditable);
  let state: EditorState;
  try {
    const data = JSON.parse(content);
    state = EditorState.fromJSON(
      { schema, plugins },
      { doc: data, selection: { type: 'text', anchor: 0, head: 0 } },
    );
  } catch (error) {
    const doc = fromHTML(content, schema, document, DOMParser);
    state = EditorState.create({ doc, plugins });
  }
  return state;
}

export function createEditorView(
  dom: HTMLDivElement,
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
): EditorView {
  // let shiftKey = false // https://discuss.prosemirror.net/t/change-transformpasted-behaviour-when-shift-key-is-pressed/949/3
  const editorView = new EditorView(
    { mount: dom },
    {
      state,
      dispatchTransaction: dispatch,
      nodeViews: {},
      editable: (s) => isEditable(s),
    }
  )
  return editorView
}
