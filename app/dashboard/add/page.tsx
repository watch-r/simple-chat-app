import { Heading } from "@radix-ui/themes";
import React from "react";
import AddFriendButton from "./_components/AddFriend";

const AddFriendPage = () => {
    return (
        <>
            <Heading size={'8'}>Add a Friend</Heading>
            <AddFriendButton/>
        </>
    );
};

export default AddFriendPage;
