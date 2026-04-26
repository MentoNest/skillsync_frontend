import RegistrationForm from '../registration-form';
import SplitAuthLayout from '@/components/auth/SplitAuthLayout';

export default function RegisterPage() {
  return (
    <SplitAuthLayout>
      <RegistrationForm />
    </SplitAuthLayout>
  );
}
