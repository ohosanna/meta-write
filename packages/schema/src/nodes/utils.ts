import type { NodeSpecAttrs, NumberedNode } from './types'

export const getNumberedDefaultAttrs = (): NodeSpecAttrs<NumberedNode> => ({
  id: { default: null },
  label: { default: null },
  numbered: { default: false },
})

export function readBooleanAttr(val?: string | boolean | null): boolean {
  if (val == null) return false
  if (typeof val === 'boolean') return val
  if (val?.toLowerCase() === 'false') return false
  return true
}

export function readBooleanDomAttr(dom: HTMLElement, attr: string): boolean {
  return readBooleanAttr(dom.getAttribute(attr))
}

export function convertToBooleanAttribute(value: boolean) {
  return value ? '' : undefined
}

export function getNumberedAttrs(dom: HTMLElement): NumberedNode {
  return {
    id: dom.getAttribute('id') ?? null,
    numbered: readBooleanDomAttr(dom, 'numbered'),
    label: dom.getAttribute('label') ?? null,
  }
}
export function setNumberedAttrs(
  attrs: Record<string, any>
): Record<keyof NumberedNode, string | undefined> {
  return {
    id: attrs['id'] || undefined,
    numbered: convertToBooleanAttribute(attrs['numbered']),
    label: attrs['label'] || undefined,
  }
}