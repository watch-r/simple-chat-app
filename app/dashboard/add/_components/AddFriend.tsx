"use client";
import { Button, Flex, Heading, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { addFriendValidator } from "@/app/lib/validations/addFriendValidator";

type SearchFriendForm = z.infer<typeof addFriendValidator>;

const AddFriendButton = () => {
    const [success, setSuccess] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SearchFriendForm>({
        resolver: zodResolver(addFriendValidator),
    });

    const addFriend = async (email: string) => {
        try {
            const validatedEmail = addFriendValidator.parse({ email });
            await axios.post("/api/friends/add", {
                email: validatedEmail,
            });
            setSuccess(true);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError("email", { message: error.message });
                return;
            }

            if (error instanceof AxiosError) {
                setError("email", { message: error.response?.data });
                return;
            }

            setError("email", { message: "An Unexpected Error Occured." });
        }
    };

    const onSubmit = (data: SearchFriendForm) => {
        addFriend(data.email);
        // console.log(data)
    };

    return (
        <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
            <Heading size={"3"} className="pt-5 pb-2 pl-1">
                Add Friend By Email
            </Heading>
            <Flex gap={"2"}>
                <TextField.Root>
                    <TextField.Input
                        {...register("email")}
                        placeholder=" you@example.com"
                    />
                </TextField.Root>
                <Button>Add</Button>
            </Flex>
            <p className='mt-1 ml-2 text-sm text-red-600'>{errors.email?.message}</p>
            {success && <p className='mt-1 ml-2 text-sm text-green-600'>Friend Request Sent</p> }
        </form>
    );
};

export default AddFriendButton;
