// import type { Heading, PhrasingContent } from '../spec'
import type { Node } from 'prosemirror-model'
// import type { MdFormatSerialize } from '@/types'
import type { MyNodeSpec, NumberedNode } from './types'
import { NodeGroups } from './types'
import {
  getNumberedAttrs,
  getNumberedDefaultAttrs,
  setNumberedAttrs
} from './utils'

const getAttrs = (level: number) => (dom: HTMLElement) => ({
  ...getNumberedAttrs(dom),
  level,
})

export type Attrs = NumberedNode & {
  level: number;
};

// const heading: MyNodeSpec<Attrs, Heading> = {
const heading: MyNodeSpec<Attrs> = {
  attrs: {
    ...getNumberedDefaultAttrs(),
    level: { default: 1 },
  },
  content: `${NodeGroups.inline}*`,
  group: NodeGroups.heading,
  defining: true,
  parseDOM: [
    { tag: 'h1', getAttrs: getAttrs(1) },
    { tag: 'h2', getAttrs: getAttrs(2) },
    { tag: 'h3', getAttrs: getAttrs(3) },
    { tag: 'h4', getAttrs: getAttrs(4) },
    { tag: 'h5', getAttrs: getAttrs(5) },
    { tag: 'h6', getAttrs: getAttrs(6) },
  ],
  toDOM(node) {
    return [`h${node.attrs['level']}`, setNumberedAttrs(node.attrs), 0]
  },
  // attrsFromMyst: (token) => ({
  //   id: null,
  //   label: null,
  //   numbered: token.enumerated ?? false,
  //   level: token.depth,
  // }),
  // toMyst: (props) => ({
  //   type: 'heading',
  //   depth: parseInt(props.tag.slice(1), 10),
  //   enumerated: readBooleanAttr(props.numbered),
  //   children: (props.children || []) as PhrasingContent[],
  // }),
}

// export const toMarkdown: MdFormatSerialize = (state, node: Node) => {
//   // TODO: Put the id in:
//   state.write(`${state.repeat('#', node.attrs['level'])} `)
//   state.renderInline(node)
//   state.closeBlock(node)
// }

export default heading
