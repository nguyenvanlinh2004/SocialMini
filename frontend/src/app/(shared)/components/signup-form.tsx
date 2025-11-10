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

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Tạo tài khoản Mute</CardTitle>
        <CardDescription>Hãy đăng ký để bắt đầu.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <FieldLabel htmlFor="name">Họ</FieldLabel>
                <Input id="name" type="text" placeholder="Họ" required />
              </div>
              <div className="space-y-1.5">
                <FieldLabel htmlFor="name">Tên</FieldLabel>
                <Input id="name" type="text" placeholder="Tên" required />
              </div>
            </div>
            <div>
              <FieldLabel htmlFor="username">Tên đăng nhập</FieldLabel>
              <Input
                className="mt-1.5"
                id="username"
                type="text"
                placeholder="Tên đăng nhập"
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                className="mt-1.5"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
              <Input
                className="mt-1.5"
                id="password"
                placeholder="**********"
                type="password"
                required
              />
            </div>
            <FieldGroup>
              <Field>
                <Button type="submit">Đăng ký</Button>
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
