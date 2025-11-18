import { useForm } from "react-hook-form";
import { z } from "zod";
import { Navigate, useNavigate } from "react-router";
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
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { authActions } from "../../../../store/auth/authAction";
import { use } from "react";

export function LoginForm(props: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();

  // ---- Schema for Login form ----
  const LoginSchema = z.object({
    username: z.string().min(3, "Tên đăng nhập tối thiểu 3 ký tự"),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  });

  type LoginFormValues = z.infer<typeof LoginSchema>;
  // --------------------------------

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const payload = {
        username: data.username,
        password: data.password,
      };

      await authActions.signin(payload); // Assuming you have a login action
      toast.success("Đăng nhập thành công!");
      navigate('/')
    } catch (err: any) {
      toast.error(err.message || "Đăng nhập thất bại.");
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Đăng nhập Mute</CardTitle>
        <CardDescription>Chào mừng bạn quay lại!</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Username (or Email) */}
            <div>
              <FieldLabel htmlFor="username">Tên đăng nhập</FieldLabel>
              <Input
                className="mt-1.5"
                id="username"
                placeholder="Tên đăng nhập"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username.message}</p>
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
                  {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Bạn chưa có tài khoản? <a href="/signup">Đăng ký</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
