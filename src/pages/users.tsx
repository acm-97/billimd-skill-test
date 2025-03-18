import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {ArrowUpDown, ChevronDown, MoreHorizontal, Plus} from 'lucide-react'
import {useDebouncedCallback} from 'use-debounce'

import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Input} from '@/components/ui/input'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {QueryClient, queryOptions, useSuspenseQuery} from '@tanstack/react-query'
import axios from 'axios'
import {Name, Picture, User} from './types'
import {Checkbox} from '@/components/ui/checkbox'
import Loader from '@/components/loader'
import DashboardStats from '@/components/users/dashboard-stats'

const usersQuery = ({page = 1, seed = 'abc'}: {page?: number; seed?: string}) =>
  queryOptions({
    queryKey: ['users', page, seed],
    queryFn: async () => {
      try {
        const users = await axios.get(
          `https://randomuser.me/api/?page=${page}&results=5&seed=${seed}&exc=login,cell`,
        )
        if (!users) {
          // eslint-disable-next-line @typescript-eslint/only-throw-error
          throw new Response('', {
            status: 404,
            statusText: 'Not Found',
          })
        }
        return users.data
      } catch (error) {
        console.log(error)
        return []
      }
    },
  })

export const loader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureQueryData(usersQuery({}))
  return {}
}

const useColumns = (setUserData: React.Dispatch<React.SetStateAction<User[]>>) => {
  const columns: ColumnDef<User>[] = [
    {
      id: 'select',
      header: ({table}) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({row}) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: ({column}) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Full Name
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({row}) => {
        const name: Name = row.getValue('name')
        const picture: Picture = row.original.picture
        return (
          <div className="flex items-center gap-2">
            <img src={picture?.thumbnail} alt="user-picture" className="h-8 w-8 rounded-full" />
            <span>
              {name?.first} {name?.last}
            </span>
          </div>
        )
      },
      // @ts-ignore
      width: 200,
    },
    {
      accessorKey: 'email',
      header: ({column}) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({row}) => <div className="lowercase">{row.getValue('email')}</div>,
      // @ts-ignore
      width: 300,
    },
    {
      accessorKey: 'phone',
      header: ({column}) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Phone
            <ArrowUpDown />
          </Button>
        )
      },
      // @ts-ignore
      width: 200,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({row}) => {
        const remove = () => {
          setUserData(prev => {
            const array = [...prev]
            array.splice(row.index, 1)
            return array
          })
        }
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>View User</DropdownMenuItem>
              <DropdownMenuItem onClick={remove}>Remove User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return {columns}
}

export default function Users() {
  const [userData, setUserData] = React.useState<User[]>([])
  const [page, setPage] = React.useState(1)
  const {data, isLoading} = useSuspenseQuery(usersQuery({page}))
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  React.useEffect(() => {
    if (data?.results) setUserData(data.results)
  }, [data])
  const {columns} = useColumns(setUserData)

  const table = useReactTable({
    data: userData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      // pagination: {
      //   pageSize: 5,
      //   pageIndex: 1,
      // },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const debounceFilterValue = useDebouncedCallback((value: string) => {
    table.getColumn('email')?.setFilterValue(value)
  }, 500)

  return (
    <div className="w-full p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6">User Management</h2>
        <DashboardStats />
      </div>
      <div className="shadow-md border rounded-md p-6 bg-card">
        <div className="flex items-center justify-between gap-2 py-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Filter emails..."
              onChange={event => debounceFilterValue(event.target.value)}
              className="md:min-w-md max-w-md"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter(column => column.getCanHide())
                  .map(column => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={value => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button>
            <Plus /> <span className="hidden md:inline">Add User</span>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <div className="w-full flex items-center justify-center">
                      <Loader />
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="h-[4.5rem]"
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        style={{
                          // @ts-ignore
                          width: cell.column.columnDef.width,
                          // @ts-ignore
                          minWidth: cell.column.columnDef.width,
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between space-x-2 py-4 border-t">
          <div className="text-muted-foreground text-sm">
            Showing page <span className="font-extrabold">{page}</span>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage(page + 1)}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
