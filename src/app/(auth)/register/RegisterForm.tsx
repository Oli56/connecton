'use client'

import { registerUser } from "@/app/actions/authActions";
import { RegisterSchema, registerSchema } from "@/lib/schemas/RegisterSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Input
  } from "@nextui-org/react";
  import { useForm } from "react-hook-form";
// import { useState } from "react";
import { GiPadlock } from "react-icons/gi";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    // resolver: zodResolver(registerSchema),
    mode: "onTouched",    
});

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);
    
    if (result.status === 'success') {
      console.log("User registered successfully");
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((e: any) => {
          const fieldName = e.path.join('.') as // Convert Zod path to form field name
           | 'firstName'
           | 'lastName'
           | 'email'
           | 'password';
         setError(fieldName, {message: e.message,
         });
        });
    } else {
      setError('root.serverError', {message: result.error});
   
  };
  
    return (
        <Card className="w-3/5 mx-auto">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-default">
            <div className="flex flex-row items-center gap-3">
              <GiPadlock size={30} />
              <h1 className="text-3xl font-semibold">
                Register
              </h1>
            </div>
            <p className="text-neutral-500">
              Welcome to Connecton
            </p>
          </div>
        </CardHeader>
        <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
              <Input
                defaultValue=""
                label="First Name"
                variant="bordered"
                {...register("firstName")}
                isInvalid={!!errors.firstName}
                errorMessage={errors.firstName?.message}
            />
            <Input
              defaultValue=""
              label="Last Name"
              variant="bordered"
              {...register("lastName")}
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName?.message}
            />
             <Input
              defaultValue=""
              label="Email"
              variant="bordered"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              defaultValue=""
              label="Password"
              variant="bordered"
              type="password"
              {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            />
                
                  <Button
                    isLoading={isSubmitting}
                    isDisabled={!isValid}
                    fullWidth
                    color="default"
                    type="submit"
                  >
                   Register
                  </Button>
                </div>
            </form>
        </CardBody>
      </Card>
  )
}
  }
}