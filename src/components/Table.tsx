import { MdDeleteForever, MdEdit } from 'react-icons/md'

import { InventoryProps } from '../types/Inventory'
import { UserProps } from '../types/User'

interface Th {
  id: number
  name: string
}

interface TableHeadProps {
  th: Th[]
  role: string
}

interface TableBodyUsersProps {
  users: UserProps[]
  role: string
  handleEdit: (user: UserProps) => void
  handleDelete: (user: UserProps) => void
}

interface TableBodyInventoryProps {
  inventory: InventoryProps[]
  role: string
  handleEdit: (inventory: InventoryProps) => void
  handleDelete: (inventory: InventoryProps) => void
}

export const TableHead = ({ th, role }: TableHeadProps) => {
  return (
    <tr>
      {th?.map((thItem) => (
        <th key={thItem.id} scope="col" className="px-6 py-3">
          {thItem.name}
        </th>
      ))}
      {role === 'ADM' && <th scope="col" className="px-6 py-3" />}
    </tr>
  )
}

export const TableBodyUser = ({
  users,
  role,
  handleEdit,
  handleDelete,
}: TableBodyUsersProps) => {
  return (
    <>
      {users?.map((user) => (
        <tr
          key={user._id}
          className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td className="px-6 py-4 uppercase">{user._id}</td>
          <td className="px-6 py-4 uppercase">{user.email}</td>
          <td className="px-6 py-4 uppercase">{user.name}</td>
          <td className="px-6 py-4 uppercase">{user.role}</td>
          {role === 'ADM' && (
            <>
              <td className="px-6 py-4">
                <MdEdit
                  onClick={() => handleEdit(user)}
                  className="h-5 w-5 cursor-pointer  text-neutral-500 hover:text-neutral-800"
                />
              </td>

              <td className="px-6 py-4">
                <MdDeleteForever
                  onClick={() => handleDelete(user)}
                  className="h-5 w-5 cursor-pointer text-rose-500 hover:text-rose-800"
                />
              </td>
            </>
          )}
        </tr>
      ))}
    </>
  )
}

export const TableBodyInventory = ({
  inventory,
  role,
  handleEdit,
  handleDelete,
}: TableBodyInventoryProps) => {
  return (
    <>
      {inventory?.map((inventories) => (
        <tr
          key={inventories.ns}
          className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td className="px-6 py-4">{inventories.ns}</td>
          <td className="px-6 py-4">{inventories.type}</td>
          <td className="px-6 py-4">{inventories.model}</td>
          <td className="px-6 py-4">{inventories.brand}</td>
          <td className="px-6 py-4">{inventories.status}</td>
          <td className="px-6 py-4">{inventories.local}</td>
          <td className="px-6 py-4">
            {inventories.obs ? inventories.obs : <span>---</span>}
          </td>
          {role === 'ADM' && (
            <>
              <td className="px-6 py-4">
                <MdEdit
                  onClick={() => handleEdit(inventories)}
                  className="h-5 w-5 cursor-pointer  text-neutral-500 hover:text-neutral-800"
                />
              </td>

              <td className="px-6 py-4">
                <MdDeleteForever
                  onClick={() => handleDelete(inventories)}
                  className="h-5 w-5 cursor-pointer text-rose-500 hover:text-rose-800"
                />
              </td>
            </>
          )}
        </tr>
      ))}
    </>
  )
}
