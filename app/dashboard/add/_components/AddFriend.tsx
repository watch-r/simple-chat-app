"use client";
import { Button, Flex, Heading, TextField } from "@radix-ui/themes";
import React from "react";

const AddFriendButton = () => {
    return (
        <div className="max-w-sm">
            <Heading size={"3"} className="pt-5 pb-2 pl-1">Add Friend By Email</Heading>
            <Flex gap={'2'}>
                <TextField.Root>
                    <TextField.Input placeholder=" you@example.com" />
                </TextField.Root>
                <Button>Add</Button>
            </Flex>
        </div>
    );
};

export default AddFriendButton;
