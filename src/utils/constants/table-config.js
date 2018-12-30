/**
 * To further parametrize this whole thing,
 * one can fetch these details from a server
 * through an API so that any change in these,
 * does not trigger a build process.
 */
const TABLE_HEADERS = [
  { id: 1, value: 'Name' },
  { id: 2, value: 'Date of Birth' },
  { id: 3, value: 'Age' },
  { id: 4, value: 'Email' },
  { id: 5, value: 'Mobile' },
  { id: 6, value: 'Active' },
  { id: 7, value: 'Actions' },
]

const USER_ACTIONS = [
  { actionId: 1, actionName: 'View', color: 'primary' },
  { actionId: 2, actionName: 'Edit', color: 'primary' },
  { actionId: 3, actionName: 'Activate', color: 'primary' },
  { actionId: 4, actionName: 'Deactivate', color: 'secondary' },
]

export { TABLE_HEADERS, USER_ACTIONS }
