'use client'
import { signOutUser } from "@/app/actions/authActions"
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
  } from "@nextui-org/react";
  import { Session } from "next-auth";
  import Link from "next/link";

  type Props = {
    user: Session["user"];
  };
  
  export default function UserMenu({
     user,
     }: Props) {
         return (
             <Dropdown placement="bottom-end">
                 <DropdownTrigger>
                     <Avatar
                         isBordered
                         as='button'
                         className="transition-transform"
                         color="secondary"
                         name={user?.name || 'User Avatar'  }
                         size="sm"
                         src={user?.image || '/images/user.png'}
                     />
                 </DropdownTrigger>
                 <DropdownMenu
                    variant="flat"
                    aria-label="User actions menu"
                 >
                     <DropdownSection showDivider>
                         <DropdownItem
                            key='user-info'
                            isReadOnly
                            as='span'
                            className="h-14 flex flex-row"
                            aria-label="username"
                         >
                             Signed in as {user?.name}
                         </DropdownItem>
                     </DropdownSection>
                     <DropdownItem
                        key='edit-profile'
                         as={Link}
                         href={'members/edit'}     
                     >
                        Edit Profile
                     </DropdownItem>
                     <DropdownItem
                        key='log-out'
                         onClick={async () => signOutUser()}
                         color="danger"
                        >
                            Log Out
                         </DropdownItem>
                 </DropdownMenu>
             </Dropdown>
         )
     }