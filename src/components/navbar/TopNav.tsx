
import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
  } from "@nextui-org/react";
  import Link from "next/link";
  import { GiSelfLove } from "react-icons/gi";
  import NavLink from "./NavLink";
import { text } from "stream/consumers";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";
 
  export default async function TopNav() {
    const session = await auth();
   return (
     <Navbar
      maxWidth="full"
      className="bg-gradient-to-r from-pink-400 via-red-400 to-pink-600"
      classNames={{
        item: [
            "text-xl",
            "text-white",
            "uppercase",
            "data-[active=true]:text-yellow-200",
        ],
      }}
     >
        <NavbarBrand as={Link} href="/" >
          <GiSelfLove
            size={40}
            className="text-gray-200"
          />
             <div className="font-bold text-3xl flex">
            <span className="text-gray-200">
              Connecton
            </span>
          </div>
          </NavbarBrand>
          <NavbarContent>
            <NavLink 
                href="/members" 
                label="Matches"
            /> 
            <NavLink 
                href="/messages"  
                label="Messages"
            /> 
          </NavbarContent>
        <NavbarContent justify="end">
          {session?.user ? (
            <UserMenu user={session.user} />
             ) : (
              <> 
            <Button
             as={Link}
             href="/login"
             variant="bordered"         
             className="text-white"       
            >
                Login
            </Button>
            <Button
             as={Link}
             href="/register"
             variant="bordered"         
             className="text-white"       
            >
                Register
            </Button>
            </>
             )}
        </NavbarContent>
     </Navbar>
    );
  }