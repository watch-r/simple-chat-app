import { Heading, Separator } from "@radix-ui/themes";
import AddFriendButton from "../_components/AddFriend";

const AddFriendPage = () => {
    return (
        <>
            <Heading size={"7"} className="py-4">Add a Friend</Heading>
            <Separator my="3" size="4" />
            <AddFriendButton />
        </>
    );
};

export default AddFriendPage;
