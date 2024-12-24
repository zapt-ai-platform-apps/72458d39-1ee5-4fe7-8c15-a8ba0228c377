import { createSignal, onMount, createEffect, Show } from 'solid-js';
import { supabase } from './supabaseClient';
import Login from './components/Login';
import ExercisePage from './components/ExercisePage';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');

  const checkUserSignedIn = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  });

  return (
    <div class="min-h-screen bg-black text-red-500 p-4">
      <Show
        when={currentPage() === 'homePage'}
        fallback={<Login />}
      >
        <ExercisePage user={user} setUser={setUser} setCurrentPage={setCurrentPage} />
      </Show>
    </div>
  );
}

export default App;