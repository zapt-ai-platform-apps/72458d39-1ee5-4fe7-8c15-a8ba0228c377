import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabaseClient';

function Login() {
  return (
    <div class="flex items-center justify-center min-h-screen">
      <div class="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-red-500 text-center">Sign in with ZAPT</h2>
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="text-red-400 hover:underline mb-6 block text-center cursor-pointer"
        >
          Learn more about ZAPT
        </a>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'facebook', 'apple']}
          magicLink={true}
          view="magic_link"
          showLinks={false}
          authView="magic_link"
        />
      </div>
    </div>
  );
}

export default Login;