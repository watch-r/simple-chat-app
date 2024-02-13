import { Icon, Icons } from "@/app/ui/Icon";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

type SideBarOption = {
    id: number;
    name: string;
    href: string;
    Icon: Icon;
};

const sidebarOptions: SideBarOption[] = [
    {
        id: 1,
        name: "Add Friend",
        href: "/dashboard/add",
        Icon: "UserPlus",
    },
];

const SideBarOptionsComponment = () => {
    return (
        <>
            <Text className="font-semibold text-xs text-gray-500">
                Overview
            </Text>
            {sidebarOptions.map((option) => {
                const Icon = Icons[option.Icon];
                return (
                    <Link
                        key={option.id}
                        href={option.href}
                        className="dark:text-gray-200 text-gray-700 hover:dark:text-violet-600 hover:text-violet-600 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                        <Flex direction={"row"} gap={"3"} align={"center"}>
                            <span className="text-gray-400 border-gray-200 group-hover:border-violet-600 group-hover:text-violet-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-inherit ">
                                <Icon className="h-4 w-4" />
                            </span>
                            <span className="truncate">{option.name}</span>
                        </Flex>
                    </Link>
                );
            })}
        </>
    );
};

export default SideBarOptionsComponment;
