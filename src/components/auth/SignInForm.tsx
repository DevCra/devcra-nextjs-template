"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

interface SignInFormProps {
  error?: string;
  callbackUrl?: string;
}

export function SignInForm({ error, callbackUrl = "/" }: SignInFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      console.log(result);

      if (result?.error) {
        // 에러 발생 시 현재 URL에 에러 파라미터 추가
        router.push(`/signin?error=${result.error}&callbackUrl=${callbackUrl}`);
      } else if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch (err) {
      console.error(err);
      router.push(`/signin?error=UnknownError&callbackUrl=${callbackUrl}`);
    } finally {
      setLoading(false);
    }
  };

  // 에러 메시지 매핑 함수
  const getErrorMessage = (error: string | undefined) => {
    if (!error) return null;

    const errorMessages: Record<string, string> = {
      CredentialsSignin: "이메일 또는 비밀번호가 일치하지 않습니다",
      Configuration: "로그인 처리 중 오류가 발생했습니다",
    };

    return errorMessages[error] || "알 수 없는 오류가 발생했습니다";
  };

  const errorMessage = getErrorMessage(error);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          이메일 주소
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          비밀번호
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline  -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="flex h-6 shrink-0 items-center">
            <div className="group grid size-4 grid-cols-1">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
              />
              <svg
                fill="none"
                viewBox="0 0 14 14"
                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-[:checked]:opacity-100"
                />
                <path
                  d="M3 7H11"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                />
              </svg>
            </div>
          </div>
          <label
            htmlFor="remember-me"
            className="block text-sm/6 text-gray-900"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm/6">
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            비밀번호를 잊으셨나요?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loading ? (
            <Spinner className="w-6 h-6 dark:text-gray-600 text-gray-300 fill-indigo-600" />
          ) : (
            "로그인"
          )}
        </button>
      </div>
    </form>
  );
}
