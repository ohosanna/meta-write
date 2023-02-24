import { Schema, NodeSpec } from 'prosemirror-model'
import * as basic from './nodes/basic'
import * as Nodes from '@/nodes'

export const nodes = {
  doc: basic.doc,
  text: basic.text,
  paragraph: basic.paragraph,
  blockquote: basic.blockquote,
  heading: Nodes.Heading.default,

  horizontal_rule: {
    group: "block",
    parseDOM: [ { tag: "hr" } ],
    toDOM() { return ["hr"] }
  } as NodeSpec,

  code_block: {
    attrs: {
      lang: { default: null }
    },
    content: "text*",
    marks: "",
    group: "block",
    code: true,
    defining: true,
    parseDOM: [ {
      tag: "pre",
      preserveWhitespace: "full",
      getAttrs(dom: HTMLElement) {
        const code = dom.querySelector('code')
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lang = (code && code.className && code.className.match(/language-(\w+)/)![1]) || null
        return { lang }
      }
    } ],
    toDOM(node) {
      return [ "pre", { class: node.attrs['lang'] ? `language-${node.attrs['lang']}` : null }, [ "code", 0 ] ]
    }
  } as NodeSpec,
  image: {
    inline: true,
    attrs: {
      src: { default: null },
      alt: { default: null },
      title: { default: null }
    },
    group: "inline",
    draggable: true,
    parseDOM: [{
      tag: "img[src]", getAttrs(dom: HTMLElement) {
        return {
          src: dom.getAttribute("src"),
          title: dom.getAttribute("title"),
          alt: dom.getAttribute("alt")
        }
      }
    }],
    toDOM(node) { const {src, alt, title} = node.attrs; return ["img", {src, alt, title}] }
  } as NodeSpec,
  figure: {
    content: "text*",
    group: "block",
    attrs: {
      image: { default: null }
    },
    isolating: true,
    parseDOM: [{
      tag: "figure",
      contentElement: 'figcaption',
      getAttrs(dom: HTMLElement) {
        const image = dom.querySelector('img')
        return { image: (image ? { src: image.src } : null) }
      }
    }],
    toDOM(node) {
      return ["figure", ["img", node.attrs['image']], ["figcaption", 0]]
    }
  } as NodeSpec,

  hard_break: {
    inline: true,
    group: "inline",
    selectable: false,
    parseDOM: [ { tag: "br" } ],
    toDOM() { return ["br"] }
  } as NodeSpec,

  ordered_list: {
    content: "list_item+",
    group: "block",
    attrs: { order: { default: 1 } },
    parseDOM: [{
      tag: "ol", getAttrs(dom: HTMLElement) {
        return {
          order: dom.hasAttribute("start") ? Number(dom.getAttribute("start")) : 1 }
      }
    }],
    toDOM(node) {
      return node.attrs['order'] == 1 ? ["ol", 0] : ["ol", { start: node.attrs['order'] }, 0]
    }
  } as NodeSpec,

  bullet_list: {
    content: "list_item+",
    group: "block",
    parseDOM: [ {tag: "ul"} ],
    toDOM() { return ["ul", 0] }
  } as NodeSpec,

  list_item: {
    content: "paragraph (ordered_list | bullet_list){0,1}",
    // content: "paragraph block*",
    parseDOM: [{tag: "li"}],
    toDOM() { return ["li", 0] },
    defining: true
  } as NodeSpec

}

export const marks = {
}

export const presets = {
  full: {
    nodes,
    marks,
  },
  paragraph: {
    nodes: {},
    marks,
  },
  comment: {
    nodes: {},
    marks,
  },
}

export type PresetSchemas = keyof typeof presets
export type UseSchema = PresetSchemas | Schema

export function getSchema(useSchema: UseSchema) {
  console.log('use', useSchema)
  if (typeof useSchema === 'string') {
    switch (useSchema) {
      case 'full':
        console.log(presets.full)
        return new Schema(presets.full)
      case 'paragraph':
        return new Schema(presets.paragraph)
      case 'comment':
        return new Schema(presets.comment)
      default:
        throw new Error(`Schema '${useSchema}' is not defined.`)
    }
  }
  if ('spec' in useSchema) return useSchema
  return new Schema(useSchema)
}