"use client";

import Link from "next/link";
import { Card, CardHeader, CardContent as CardBody, Input, Button, Label, Form } from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import Logo from "@/components/Logo";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { uploadImage } from "@/utils/uploadImage";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  // console.log("Validation Errors:", errors);






  const onSubmit = async (data) => {
    // console.log("Submitted Data:", data);
    const imageFile = data.image[0];
    const imageUrl = await uploadImage(imageFile);
    // console.log(imageUrl, "imageUrl");
    
    

    //   const imageData = new FormData();
    //   imageData.append("image", imageFile);

    //   const imageRes = await fetch(
    //     `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    //     {
    //       method: "POST",
    //       body: imageData,
    //     }
    //   );

    // const imageResult = await imageRes.json();
    

    //   if (!imageResult.success) {
    //      toast.error("Image upload failed");
    // }

      // const imageUrl = imageResult.data.url;


    const { data: signUpData, error: signUpError} = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      image: imageUrl,
      role: data.role
    })

    // console.log(signUpData,signUpError );

    if (signUpError) {
      toast.error("Registration not Succeed...")
    }

    else {
      router.push("/");
    }
    

  };

  return (
    <div>
      <Card className="w-full max-w-lg mx-auto border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4">
        <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
          <Logo />
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-red-500 bg-clip-text text-transparent">
            Create an Account
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Join Ticketo to book premium events or host your own organization.
          </p>
        </CardHeader>
        
        <CardBody className="gap-4">
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            
            {/* Full Name */}
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="name">Full Name</Label>
              
              <Input
                id="name"
                placeholder="John Doe"
                labelPlacement="outside"
                startContent={<FaUser className="text-slate-400 text-sm" />}
                className="w-full bg-slate-900/50 border-white/10 hover:border-red-500/50 focus-within:!border-red-500"
                {...register("name", { required: 'Name is Required' })}
              />
              {errors.name && <p className="text-red-500 text-xs pl-1">{errors.name.message}</p>}
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="john@example.com"
                type="email"
                labelPlacement="outside"
                startContent={<FaEnvelope className="text-slate-400 text-sm" />}
                className="w-full bg-slate-900/50 border-white/10 hover:border-red-500/50 focus-within:!border-red-500"
                {...register("email", { required: 'Email is Required' })}
              />
              {errors.email && <p className="text-red-500 text-xs pl-1">{errors.email.message}</p>}
            </div>

            {/* Profile Image URL */}
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="image">Profile Image URL</Label>
              
              <Input
                type="file"
                accept="image/*"
                // onChange={handleImageUpload}
                id="image"
                placeholder="https://example.com/avatar.jpg"
                labelPlacement="outside"
                startContent={<FaImage className="text-slate-400 text-sm" />}
                className="w-full bg-slate-900/50 border-white/10 hover:border-red-500/50 focus-within:!border-red-500"
                {...register("image", { required: 'Image is Required' })}
              />
              {errors.image && <p className="text-red-500 text-xs pl-1">{errors.image.message}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                labelPlacement="outside"
                startContent={<FaLock className="text-slate-400 text-sm" />}
                className="w-full bg-slate-900/50 border-white/10 hover:border-red-500/50 focus-within:!border-red-500"
                {...register("password", { 
                  required: 'Password is Required', 
                  maxLength: { value: 12, message: 'Password cannot exceed 12 characters' },
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
              />
              {errors.password && <p className="text-red-500 text-xs pl-1">{errors.password.message}</p>}
            </div>

            {/* Select Role (HTML Native Select) */}
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="role" className="text-sm font-semibold text-slate-300">Select Role</Label>
              <select
                id="role"
                className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl p-3 outline-none hover:border-red-500/50 focus:border-red-500 text-sm"
                {...register("role", { required: "Role is required" })}
              >
                <option value="attendee" className="bg-slate-950 text-white">Attendee (Browse & Book Tickets)</option>
                <option value="organizer" className="bg-slate-950 text-white">Organizer (Create & Host Events)</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs pl-1">{errors.role.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-indigo-600 text-white font-bold h-12 shadow-lg shadow-red-500/10 hover:shadow-red-500/20"
              radius="lg"
            >
              Create Account
            </Button>
          </Form>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-white/5" />
            <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">Or Sign Up With</span>
            <div className="flex-grow border-t border-white/5" />
          </div>

          <Button
            variant="bordered"
            className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold h-11"
            radius="lg"
            startContent={<FaGoogle className="text-red-500" />}
          >
            Google OAuth
          </Button>

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-red-500 hover:text-red-400 font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}