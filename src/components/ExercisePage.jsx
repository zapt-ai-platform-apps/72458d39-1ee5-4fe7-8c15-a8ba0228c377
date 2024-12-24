import { createSignal, createEffect, For, Show, onMount } from 'solid-js';
import { createEvent, supabase } from '../supabaseClient';
import { SolidMarkdown } from 'solid-markdown';
import * as Sentry from '@sentry/browser';

function ExercisePage(props) {
  const [exercises, setExercises] = createSignal([]);
  const [currentExercise, setCurrentExercise] = createSignal(null);
  const [timer, setTimer] = createSignal(60);
  const [isTimerRunning, setIsTimerRunning] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [markdownText, setMarkdownText] = createSignal('');

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const fetchedExercises = [
        { id: 1, name: 'Basic Kegel', duration: 60 },
        { id: 2, name: 'Quick Contractions', duration: 30 },
        { id: 3, name: 'Long Hold', duration: 90 },
      ];
      setExercises(fetchedExercises);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error fetching exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const startTimer = (duration) => {
    setTimer(duration);
    setIsTimerRunning(true);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const selectExercise = (exercise) => {
    setCurrentExercise(exercise);
    startTimer(exercise.duration);
  };

  const handleMarkdownGeneration = async () => {
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt:
          'Write a short, motivational message for completing a Kegel exercise session in markdown format.',
        response_type: 'text',
      });
      setMarkdownText(result);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error generating markdown:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    props.setUser(null);
    props.setCurrentPage('login');
  };

  createEffect(() => {
    if (props.user()) {
      fetchExercises();
    }
  });

  return (
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold text-red-500">Kegel Exercise App</h1>
        <button
          class="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded cursor-pointer disabled:opacity-50"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>

      <div class="bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-red-400">Available Exercises</h2>
        <For each={exercises()}>
          {(exercise) => (
            <div class="flex justify-between items-center mb-2">
              <span class="text-white">
                {exercise.name} - {exercise.duration}s
              </span>
              <button
                class="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded cursor-pointer disabled:opacity-50"
                onClick={() => selectExercise(exercise)}
                disabled={isTimerRunning()}
              >
                Start
              </button>
            </div>
          )}
        </For>
      </div>

      <Show when={currentExercise()}>
        <div class="mt-8 bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <h3 class="text-xl font-bold mb-4 text-red-300">{currentExercise().name}</h3>
          <p class="text-white text-4xl">{timer()}s</p>
          <Show when={!isTimerRunning()}>
            <button
              class="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded cursor-pointer disabled:opacity-50"
              onClick={() => setCurrentExercise(null)}
            >
              Finish
            </button>
          </Show>
        </div>
      </Show>

      <div class="mt-8">
        <button
          onClick={handleMarkdownGeneration}
          class={`w-full px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
            loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading()}
        >
          Generate Motivation
        </button>
      </div>

      <div class="mt-8">
        <Show when={markdownText()}>
          <div>
            <h3 class="text-xl font-bold mb-2 text-red-400">Motivational Message</h3>
            <div class="bg-gray-800 p-4 rounded-lg shadow-md">
              <SolidMarkdown>{markdownText()}</SolidMarkdown>
            </div>
          </div>
        </Show>
      </div>

      <div class="fixed bottom-4 right-4">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="text-red-400 hover:underline cursor-pointer"
        >
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}

export default ExercisePage;