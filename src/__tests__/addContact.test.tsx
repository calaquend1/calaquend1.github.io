import * as React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import App, { ContactsContext, GroupsContext, defaultGroups, defaultContacts } from '../App'
import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react'
import List from '../components/ContactList';


test('loads and displays greeting', async () => {
  render(<App />)

  // check there are groups & contacts tabs
  expect(screen.getByTestId('ContactsTab')).toBeInTheDocument()
  expect(screen.getByTestId('GroupsTab')).toBeInTheDocument()

  // clicked add contact button
  fireEvent.click(screen.getByText('Add Contact'))

  // all fields are here
  expect(screen.getByTestId('addContact')).toHaveTextContent('Name')
  expect(screen.getByTestId('addContact')).toHaveTextContent('Phone')
  expect(screen.getByTestId('addContact')).toHaveTextContent('Debt')

  // confirm button disabled
  expect(screen.getByTestId('addContactButton')).toBeDisabled()

  // change values of inputs
  const nameInput = screen.getByLabelText('Name')
  fireEvent.change(nameInput, {target: {value: 'Ivan'}})
  expect(screen.getByLabelText('Name')).toHaveValue('Ivan')

  const phoneInput = screen.getByLabelText('Phone')
  fireEvent.change(phoneInput, {target: {value: '79999999999'}})
  expect(screen.getByLabelText('Phone')).toHaveValue('79999999999')

  const debtInput = screen.getByLabelText('Debt')
  fireEvent.change(debtInput, {target: {value: '1000'}})
  expect(screen.getByLabelText('Debt')).toHaveValue('1000')

  expect(screen.getByTestId('addContactButton')).toBeEnabled()

  // create contact
  fireEvent.click(screen.getByTestId('addContactButton'))

  // contact exists in list
  expect(screen.getByTestId('contactIvan')).toHaveTextContent('Name: Ivan')
  expect(screen.getByTestId('contactIvan')).toHaveTextContent('Phone: 79999999999')
  expect(screen.getByTestId('contactIvan')).not.toHaveTextContent('Debt')

  // choose contact
  expect(screen.getByText('Create Group')).toBeDisabled()
  fireEvent.click(screen.getByTestId('contactIvan'))
  expect(screen.getByText('Create Group')).toBeEnabled()

  // create group
  fireEvent.click(screen.getByText('Create Group'))
  expect(screen.getByText('Group Name')).toBeInTheDocument()
  expect(screen.getByText('Group Debt')).toBeInTheDocument()

  const groupNameInput = screen.getByLabelText('Group Name')
  fireEvent.change(groupNameInput, {target: {value: 'First Group'}})
  expect(screen.getByLabelText('Group Name')).toHaveValue('First Group')

  const groupDebtInput = screen.getByLabelText('Group Debt')
  fireEvent.change(groupDebtInput, {target: {value: '4000'}})
  expect(screen.getByLabelText('Group Debt')).toHaveValue('4000')

  fireEvent.click(screen.getByTestId('createGroupButton'))

  // go to groups
  fireEvent.click(screen.getByTestId('GroupsTab'))
  expect(screen.getByTestId('App')).not.toHaveTextContent('Name: Ivan')
  expect(screen.getByTestId('App')).not.toHaveTextContent('Phone: 79999999999')

  // go inside group
  expect(screen.getByTestId('group-First Group')).toHaveClass('listelement__profile')
  fireEvent.click(screen.getByTestId('group-First Group'))
  expect(screen.getByTestId('App')).toHaveTextContent('Name: Ivan')
  expect(screen.getByTestId('App')).toHaveTextContent('Phone: 79999999999')

  // choose contact
  expect(screen.getByTestId('saveChangesInGroup')).toBeDisabled()
  fireEvent.click(screen.getByTestId('contactIvan'))
  expect(screen.getByTestId('saveChangesInGroup')).toBeEnabled()
  
  // confirm that debt is paid
  fireEvent.click(screen.getByTestId('saveChangesInGroup'))

  // gone out from group
  expect(screen.getByTestId('App')).not.toHaveTextContent('Name: Ivan')
  expect(screen.getByTestId('App')).not.toHaveTextContent('Phone: 79999999999')

  // group is archived
  expect(screen.getByTestId('group-First Group')).toHaveClass('listelement__profile archived')
})
