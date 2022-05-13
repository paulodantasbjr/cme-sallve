import { MdDeleteForever, MdEdit } from 'react-icons/md'

import { EquipamentProps } from '../types/Equipament'
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

interface TableBodyEquipamentProps {
  equipaments: EquipamentProps[]
  role: string
  handleEdit: (equipament: EquipamentProps) => void
  handleDelete: (equipament: EquipamentProps) => void
}

export const TableHead = ({ th, role }: TableHeadProps) => {
  return (
    <tr>
      {th?.map((thItem) => (
        <th key={thItem.id} scope="col" className="px-6 py-3">
          {thItem.name}
        </th>
      ))}
      {role === 'adm' && <th scope="col" className="px-6 py-3" />}
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
          {role === 'adm' && (
            <>
              <td className="flex items-center justify-center gap-1 px-6 py-4 ">
                <MdEdit
                  onClick={() => handleEdit(user)}
                  className="h-5 w-5 cursor-pointer  text-neutral-500 hover:text-neutral-800"
                />
              </td>

              <td>
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

export const TableBodyEquipaments = ({
  equipaments,
  role,
  handleEdit,
  handleDelete,
}: TableBodyEquipamentProps) => {
  return (
    <>
      {equipaments?.map((equipament) => (
        <tr
          key={equipament.ns}
          className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td className="px-6 py-4">{equipament.ns}</td>
          <td className="px-6 py-4">{equipament.type}</td>
          <td className="px-6 py-4">{equipament.model}</td>
          <td className="px-6 py-4">{equipament.brand}</td>
          <td className="px-6 py-4">{equipament.status}</td>
          <td className="px-6 py-4">
            {equipament.obs ? equipament.obs : <span>---</span>}
          </td>
          {role === 'adm' && (
            <>
              <td className="flex items-center justify-center gap-1 px-6 py-4 ">
                <MdEdit
                  onClick={() => handleEdit(equipament)}
                  className="h-5 w-5 cursor-pointer  text-neutral-500 hover:text-neutral-800"
                />
              </td>

              <td>
                <MdDeleteForever
                  onClick={() => handleDelete(equipament)}
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