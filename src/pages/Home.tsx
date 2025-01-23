import { Outlet } from "react-router-dom";
import { Header } from "../components/home/Header";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import QueryAPI from "../apis/queries";
import { TABLE_NAMES } from "../models/tables";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "./../components/ui/dialog"
import { Button } from "../components/ui/button";
import { Alert } from "../components/ui/alert";
import { Input } from "@chakra-ui/react";

export default function Home() {

  const [showInputDialog,setShowInputDialog] = useState<boolean>(false);

  const usernameRef : any = useRef(null);


  useEffect(() => {
    (async () => {
      let email = localStorage.getItem("email");
      let user = await QueryAPI.getDataFromSQL(TABLE_NAMES.USERS, "$filter=email eq '" + email + "'")
      if(user?.data && Array.isArray(user?.data) && user?.data.length == 0){
        setShowInputDialog(true);
        usernameRef.current.focus()
      }
    })();
  }, [])


  const onSave = useCallback(async() => {
    let email = localStorage.getItem("email");
    let insertUser = await QueryAPI.insertDataToSQL(TABLE_NAMES.USERS,{
      email,
      username: usernameRef.current,
      role: "admin"
    })
    if(insertUser.success){
      setShowInputDialog(false)
      window.location.reload()
    }
  },[usernameRef]);

  const handleUsernameChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    usernameRef.current = e.target.value
  },[])

  return (
    <div>
      <Header />
      <Outlet />
      <DialogRoot open={showInputDialog} closeOnEscape={false} closeOnInteractOutside={false}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update User</DialogTitle>
          </DialogHeader>
          <DialogBody>
          <Alert status="info" title="Username is mandatory" />
          <Input className="mt-10" placeholder="Enter your username" variant="outline" onChange={handleUsernameChange}/>
          </DialogBody>
          <DialogFooter>
            <Button onClick={onSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </div>
  );
}
