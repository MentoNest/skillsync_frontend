import LoginForm from '../login-form';
import SplitAuthLayout from '@/components/auth/SplitAuthLayout';

export default function LoginPage() {
  return (
    <SplitAuthLayout>
      <LoginForm />
    </SplitAuthLayout>
  );
}
