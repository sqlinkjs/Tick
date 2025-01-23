import { HStack, Input, Text } from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { CiSearch } from "react-icons/ci";
import QueryAPI from "../../apis/queries";
import { InputGroup } from "../../components/ui/input-group";
import { Button } from "../../components/ui/button";
import moment from "moment";
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "../../components/ui/pagination";
import { useCallback, useMemo, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CUDUsers from "./components/CUDUsers";
import { TABLE_NAMES } from "../../models/tables";

export interface IUserObject {
  userId: number,
  email: string
  username: string
  password: string
  role: string;
  created_at: string
  updated_at: string
}

export const DATE_FORMAT = "DD MMM YYYY hh:mm A"

function Users() {
  const [filter, setFilter] = useState("");
  const { isLoading, error, data: userData, refetch } = useQuery(
    ["users", filter],
    () => QueryAPI.getDataFromSQL(TABLE_NAMES.USERS, filter).then((res) => res),
    {
      enabled: true,
    }
  );

  const [openDialog,setOpenDialog] = useState<boolean>(false);

  const modalState = useRef<"add"|"edit"|"delete"|null>("add");
  const selectedUser = useRef<IUserObject | null>(null);


  const onDeleteClick = useCallback((data:IUserObject) => {
    modalState.current = "delete";
    selectedUser.current = data
    setOpenDialog(true)
  },[selectedUser,modalState,openDialog])

  const onEditUser = useCallback((data:IUserObject) => {
    modalState.current = "edit";
    selectedUser.current = data
    setOpenDialog(true)
  },[selectedUser,modalState,openDialog])

  const onAdduser = useCallback(() => {
    modalState.current = "add";
    setOpenDialog(true)
  },[selectedUser,modalState,openDialog])


  const renderActions =  useCallback((data:IUserObject) => {
    return (
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'row', alignItems: 'center' }}>
          <MdEdit size={24} style={{cursor:'pointer'}} onClick={() => onEditUser(data)}/>
          <MdDelete size={24} style={{cursor:'pointer'}} onClick={() => onDeleteClick(data)}/>
      </div>
    )
  }, []);


  const handleSubmit = useCallback(async() => {
    console.log("SelectedItem",selectedUser.current)
    if(modalState.current == "delete" && selectedUser.current){
      let response1 = await QueryAPI.deleteDataToSQL(TABLE_NAMES.USERS,'id',selectedUser.current?.userId)
      let response2 = await QueryAPI.deleteDataToSQL(TABLE_NAMES.USERS_CREATED_BY_SQLINK,'email',selectedUser?.current?.email)
    }
  },[selectedUser,modalState])
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex align-center">
        <div>
          <Text className="text-2xl font-semibold">Manage users</Text>
        </div>
        <div className="ml-auto">
          <div className="flex align-center gap-2">
            <InputGroup flex="1" startElement={<CiSearch />}>
              <Input placeholder="Search user" style={{ border: '1px solid lightgray' }} />
            </InputGroup>
            <Button onClick={onAdduser}>Add User</Button>
          </div>
        </div>
      </div>
      <div>
        <Table.Root size="sm" variant="outline" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>User ID</Table.ColumnHeader>
              <Table.ColumnHeader>Username</Table.ColumnHeader>
              <Table.ColumnHeader>User Email</Table.ColumnHeader>
              <Table.ColumnHeader>User Role</Table.ColumnHeader>
              <Table.ColumnHeader>Created At</Table.ColumnHeader>
              <Table.ColumnHeader>Updated At</Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {userData && Array.isArray(userData?.data) && userData.data.map((item: IUserObject) => (
              <Table.Row key={item.userId}>
                <Table.Cell>{item.userId}</Table.Cell>
                <Table.Cell>{item.username}</Table.Cell>
                <Table.Cell >{item.email}</Table.Cell>
                <Table.Cell>{item.role}</Table.Cell>
                <Table.Cell>{moment(item.created_at).format(DATE_FORMAT)}</Table.Cell>
                <Table.Cell>{moment(item.updated_at).format(DATE_FORMAT)}</Table.Cell>
                <Table.Cell>{renderActions(item)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <div>
          <PaginationRoot onPageChange={(newValue) => {
            console.log("newvclaue", newValue)
          }} count={userData?.data?.length} pageSize={10} page={1}>
            <HStack wrap="wrap">
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </div>
      </div>
      <CUDUsers data={selectedUser.current} mode={modalState.current} onCancel={() => setOpenDialog(false)} onSubmit={handleSubmit} visible={openDialog}/>
    </div>
  );
}
export default Users;
