// form to handle the create update or delete user modal

import React from "react";
import { Button } from "../../../components/ui/button";
import {
    DialogActionTrigger,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from "../../../components/ui/dialog";
import { IUserObject } from "../Users";
import { HStack, Input } from "@chakra-ui/react";
import { Radio, RadioGroup } from "../../../components/ui/radio";
interface CUDUsersInterface {
    mode: "add" | "edit" | "delete" | null
    data: IUserObject | null
    onSubmit: () => void;
    onCancel: () => void;
    visible: boolean
}


const CUDUsers = (props: CUDUsersInterface) => {
    console.log("CUDUsers", props)
    return (
        <DialogRoot open={props.visible} >
            <DialogContent>

                {
                    props.mode == "add" && (
                        <>

                            <DialogHeader>
                                <DialogTitle>{props.mode == "add" ? "Add User" : "Edit User"}</DialogTitle>
                            </DialogHeader>
                            <DialogBody>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <Input placeholder="Enter Username"/>
                                    <Input placeholder="Enter Email"/>
                                    <Input placeholder="Enter Password"/>
                                    <RadioGroup defaultValue="1" style={{marginTop:'10px'}}>
                                        <label>User Role</label>
                                        <HStack gap="6" style={{marginTop:'15px'}}>
                                            <Radio value="admin">Admin</Radio>
                                            <Radio value="user">User</Radio>
                                        </HStack>
                                    </RadioGroup>
                                </div>
                            </DialogBody>
                            <DialogFooter>
                                <DialogActionTrigger asChild>
                                    <Button variant="outline" onClick={props.onCancel}>Cancel</Button>
                                </DialogActionTrigger>
                                <Button>Submit</Button>
                            </DialogFooter>

                        </>
                    )
                }
                {
                    props.mode == "delete" && (
                        <>
                            <DialogHeader>
                                <DialogTitle>Delete User</DialogTitle>
                            </DialogHeader>
                            <DialogBody>
                                Are you sure you want to delete this user?
                            </DialogBody>
                            <DialogFooter>
                                <DialogActionTrigger asChild>
                                    <Button variant="outline" onClick={props.onCancel}>Cancel</Button>
                                </DialogActionTrigger>
                                <Button onClick={props.onSubmit}>Yes, I'm Sure</Button>
                            </DialogFooter>
                        </>
                    )
                }

            </DialogContent>
        </DialogRoot>
    )
}
export default React.memo(CUDUsers)