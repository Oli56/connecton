"use client";

import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

export default function UserDetailsForm() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-4">
      <Input
              defaultValue=""
              label="First Name"
              variant="bordered"
              {...register("firstName")}
              isInvalid={!!errors.firstName}
              errorMessage={errors.firstName?.message as string}
            />
            <Input
              defaultValue=""
              label="Last Name"
              variant="bordered"
              {...register("lastName")}
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName?.message as string}
            />
            <Input
              defaultValue=""
              label="Email"
              variant="bordered"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
            />
            <Input
              defaultValue=""
              label="Password"
              variant="bordered"
              type="password"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message as string}
            />
    </div>
  );
}