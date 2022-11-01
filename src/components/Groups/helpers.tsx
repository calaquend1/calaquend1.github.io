import { Group, CheckedContacts } from './types'

export const sortGroups = (a: Group, b: Group): number => {
  if ((a.archived && b.archived) || (!a.archived && !b.archived)) {
    return Number(a.date) - Number(b.date) > 0 ? 1 : -1
  }
  return a.archived ? 1 : -1
}

export const isEqualGroups = (a: CheckedContacts, b: CheckedContacts): boolean => JSON.stringify(a) === JSON.stringify(b)
