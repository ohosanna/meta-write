import { schemas } from '@metawrite/schema'
import { keymap } from 'prosemirror-keymap'
import { history } from 'prosemirror-history'
import { baseKeymap } from 'prosemirror-commands'
import { collab } from 'prosemirror-collab'
import { editablePlugin } from './editable'
import type { Schema } from 'prosemirror-model'
import type { Plugin } from 'prosemirror-state'

export function getPlugins(
  schemaPreset: schemas.UseSchema,
  schema: Schema,
  stateKey: any,
  version: number,
  startEditable: boolean
): Plugin[] {
  if (schemaPreset === 'comment') {
    return [
      editablePlugin(startEditable),
      // keymap(buildCommentKeymap(stateKey, schema)),
      // ...autocomplete({
      //   triggers: getTriggers(schema, true),
      //   reducer(action) {
      //     return store.dispatch(handleSuggestion(action))
      //   },
      // }),
      // ...inputrules(schema),
      keymap(baseKeymap),
      // dropCursor(),
      // gapCursor(),
      history(),
    ]
  }
  return [
    editablePlugin(startEditable),
    // getPromptPlugin(),
    // ...autocomplete({
    //   triggers: getTriggers(schema, false),
    //   reducer(action) {
    //     return store.dispatch(handleSuggestion(action))
    //   },
    // }),
    // getImagePlaceholderPlugin(),
    // ...inputrules(schema),
    // keymap(buildKeymap(stateKey, schema)),
    keymap(baseKeymap),
    // dropCursor(),
    // gapCursor(),
    collab({ version }),
    // ...tablesPlugins(schema), // put this plugin near the end of the array of plugins, since it handles mouse and arrow key events in tables rather broadly
    history(),
    // keymap(captureTab()),
  ]
}