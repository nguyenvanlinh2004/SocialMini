import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Navigate, useNavigate } from "react-router";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { authActions } from "../../../../store/auth/authAction";

export function SignupForm(props: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();

  // ---- Schema viết ngay trong component ----
  const SignupSchema = z.object({
    firstName: z.string().min(1, "Họ không được để trống"),
    lastName: z.string().min(1, "Tên không được để trống"),
    username: z.string().min(3, "Tên đăng nhập tối thiểu 3 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  });

  type SignupFormValues = z.infer<typeof SignupSchema>;
  // -------------------------------------------

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const payload = {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };

      await authActions.signup(payload);
      toast.success("Đăng ký thành công!");
      navigate('/signin')
    } catch (err: any) {
      toast.error(err.message || "Đăng ký thất bại.");
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Tạo tài khoản Mute</CardTitle>
        <CardDescription>Hãy đăng ký để bắt đầu.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Họ + Tên */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <FieldLabel htmlFor="firstName">Họ</FieldLabel>
                <Input
                  id="firstName"
                  placeholder="Họ"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <FieldLabel htmlFor="lastName">Tên</FieldLabel>
                <Input
                  id="lastName"
                  placeholder="Tên"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Username */}
            <div>
              <FieldLabel htmlFor="username">Tên đăng nhập</FieldLabel>
              <Input
                className="mt-1.5"
                id="username"
                placeholder="Tên đăng nhập"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                className="mt-1.5"
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
              <Input
                className="mt-1.5"
                id="password"
                type="password"
                placeholder="**********"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Bạn đã có tài khoản? <a href="/signin">Đăng nhập</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
