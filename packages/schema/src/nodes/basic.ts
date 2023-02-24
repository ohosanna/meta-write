// import OrderedMap from 'orderedmap'
// import type { GenericNode } from 'mystjs'
import type { NodeSpec } from 'prosemirror-model'
// import { addListNodes } from 'prosemirror-schema-list'
// import type {
//   Blockquote,
//   Break,
//   FlowContent,
//   // List,
//   // ListContent,
//   // ListItem,
//   NoAttrs,
//   Paragraph,
//   PhrasingContent,
//   ThematicBreak
// } from '@/spec'
// import type { MyNodeSpec, Props } from './types'
import { NodeGroups } from '@/types'

export const doc: NodeSpec = {
  content: `(${NodeGroups.block} | ${NodeGroups.heading})+`,
}

export const text: NodeSpec = {
  group: NodeGroups.inline,
}

export const paragraph: NodeSpec = {
  content: 'inline*',
  group: 'block',
  parseDOM: [{ tag: 'p' }],
  toDOM() { return ['p', 0] }
}

export const blockquote: NodeSpec = {
  content: "block+",
  group: "block",
  defining: true,
  parseDOM: [ { tag: "blockquote" } ],
  toDOM() { return ["blockquote", 0] }
}
