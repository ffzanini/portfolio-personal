"use client";
import { useForm } from "react-hook-form";
import { LuMail } from "react-icons/lu";

import toast from "react-hot-toast";
import axios from "axios";

import { useTranslation } from "@/context";
import { Footer, Navbar, SanitizedText, Tooltip } from "@/components";
import { cn } from "@/libs/cn";

export default function Contact() {
  const { translations } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-200 via-white-theme to-white-theme dark:bg-gradient-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%">
      <div className="relative flex flex-col lg:h-screen">
        <Navbar />
        <main className="pt-20 lg:pt-32 pb-4 lg:pb-18">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-400 via-primary-600 to-primary-800 dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent mb-6 p-3">
                {translations.contact.title}
              </h1>
              <SanitizedText
                json={translations.contact.sub_title}
                className="text-xl max-w-5xl mx-auto leading-relaxed"
              />
            </div>

            <ContactForm />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function ContactForm() {
  const { translations } = useTranslation();

  const { register, handleSubmit, formState, reset } = useForm<{
    name: string;
    email: string;
    message: string;
  }>({
    reValidateMode: "onChange",
  });

  const enableSubmit = formState.isDirty && formState.isValid;

  const onSubmit = handleSubmit(({ name, email, message }) => {
    toast.promise(
      axios
        .post("api/contact", {
          name,
          email,
          message,
        })
        .then(() => {
          reset();
        }),
      {
        loading: translations.contact.loading,
        success: translations.contact.success,
        error: translations.contact.error,
      }
    );
  });

  return (
    <div className="flex flex-col mt-4 lg:mt-8">
      <div className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-8">
        <div className="flex flex-row items-start mb-6">
          <div className="w-12 h-12 min-w-12 bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900 rounded-xl flex items-center justify-center mr-4">
            <LuMail className="h-6 w-6" />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-3xl font-bold">
              {translations.contact.form.title}
            </h2>
            <span className="text-xs">
              {translations.contact.form.sub_title}
            </span>
          </div>
        </div>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="flex flex-col lg:flex-row gap-6">
            <input
              {...register("name", { required: true })}
              placeholder={translations.contact.form.name}
              className={cn(
                "flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background bg-black/5 border-black/20 dark:bg-white/5 dark:border-white/20 focus-visible:outline-none focus:border-primary-600"
              )}
            />
            <input
              {...register("email", {
                required: true,
                pattern: /\S+@\S+\.\S+/,
              })}
              placeholder={translations.contact.form.email}
              className={cn(
                "flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background bg-black/5 border-black/20 dark:bg-white/5 dark:border-white/20 focus-visible:outline-none focus:border-primary-600"
              )}
            />
          </div>
          <textarea
            {...register("message", { required: true })}
            placeholder={translations.contact.form.message}
            className={cn(
              "min-h-32 flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background bg-black/5 border-black/20 dark:bg-white/5 dark:border-white/20 focus-visible:outline-none focus:border-primary-600"
            )}
          />
          <div className="flex flex-col 2xl:flex-row justify-center pb-4 2xl:pb-0 2xl:justify-center">
            <Tooltip text={!enableSubmit && translations.contact.tooltip}>
              <button
                disabled={!enableSubmit}
                type="submit"
                className="disabled:grayscale disabled:cursor-not-allowed cursor-pointer w-full flex flex-row justify-center items-center bg-gradient-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-primary-600/25 group"
              >
                {enableSubmit
                  ? translations.contact.button_text_ready
                  : translations.contact.button_text_not_ready}
              </button>
            </Tooltip>
          </div>
        </form>
      </div>
    </div>
  );
}
