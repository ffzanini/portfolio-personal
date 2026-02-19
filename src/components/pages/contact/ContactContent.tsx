"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  LuFootprints,
  LuCalendarDays,
  LuFileText,
  LuMail,
  LuMessageSquareMore,
  LuSend,
  LuQuote,
  LuHandshake,
} from "react-icons/lu";

import toast from "react-hot-toast";

import { useTranslation } from "@/context";
import { Tooltip } from "@/components/ui";
import { SanitizedText } from "@/components/utils";
import { LazyFooter } from "@/components/utils/LazyFooter";
import { cn } from "@/libs/cn";

export function ContactContent() {
  const { translations } = useTranslation();

  const renderIco = (id: number) => {
    const iconClass = "h-12 w-12 text-primary-500 dark:text-primary-100";

    switch (id) {
      case 1:
        return <LuSend className={iconClass} />;
      case 2:
        return <LuCalendarDays className={iconClass} />;
      case 3:
        return <LuMessageSquareMore className={iconClass} />;
      case 4:
        return <LuFileText className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-200 via-white-theme to-white-theme dark:bg-linear-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%">
      <main className="pt-20 lg:pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent mb-6 p-3">
              {translations.contact.title}
            </h1>
            <SanitizedText
              json={translations.contact.sub_title}
              className="text-xl max-w-5xl mx-auto leading-relaxed"
            />
          </div>

          <ContactForm />
          <div className="flex flex-col mt-8">
            <div className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-8">
              <div className="flex flex-row items-start mb-6">
                <div className="w-12 h-12 min-w-12 bg-linear-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900 rounded-xl flex items-center justify-center mr-4">
                  <LuFootprints className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="text-3xl font-bold">
                    {translations.contact.next.title}
                  </h2>
                  <span className="text-xs">
                    {translations.contact.next.sub_title}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {translations.contact.next.steps.map((step, index) => (
                  <div
                    key={index}
                    className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-primary-600/10 hover:scale-[1.02]"
                  >
                    <div className="flex flex-row justify-center items-center gap-2 pb-2">
                      <div className="w-28 h-28 min-w-28 bg-primary-100 dark:bg-primary-800/70 rounded-full flex items-center justify-center border-[5px] border-primary-600 dark:border-primary-300">
                        {renderIco(step.id)}
                      </div>
                    </div>
                    <span className="text-base text-black dark:text-white">
                      {step.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col my-8">
            <div className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-8">
              <div className="flex flex-row items-start mb-6">
                <div className="w-12 h-12 min-w-12 bg-linear-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900 rounded-xl flex items-center justify-center mr-4">
                  <LuHandshake className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="text-3xl font-bold">
                    {translations.contact.testimonials.title}
                  </h2>
                  <span className="text-xs">
                    {translations.contact.testimonials.sub_title}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {translations.contact.testimonials.testimonials.map(
                  (testimonial, index) => (
                    <div
                      key={index}
                      className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-primary-600/10 hover:scale-[1.02]"
                    >
                      <LuQuote className="w-8 h-8 text-primary-600 mb-4 shrink-0" />
                      <p className="italic mb-6 grow">
                        &quot;{testimonial.quote}&quot;
                      </p>
                      <div className="mt-auto">
                        <p className="font-semibold ">{testimonial.name}</p>
                        <p className="text-sm ">{testimonial.title}</p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col items-start gap-3">
              <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent">
                {translations.contact.footer.title}
              </h2>

              <p className="inline-block">
                <SanitizedText
                  json={translations.contact.footer.message}
                  typeText="span"
                  className="text-lg"
                />
              </p>
            </div>
          </div>
        </div>
      </main>
      <LazyFooter />
    </div>
  );
}

function ContactForm() {
  const { translations } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm<{
    name: string;
    email: string;
    message: string;
  }>({
    reValidateMode: "onChange",
  });

  const enableSubmit = formState.isDirty && formState.isValid;

  const onSubmit = handleSubmit(async ({ name, email, message }) => {
    setIsSubmitting(true);
    toast.promise(
      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro na requisição");
          return res.json();
        })
        .then(() => {
          reset();
        })
        .finally(() => {
          setIsSubmitting(false);
        }),
      {
        loading: translations.contact.loading,
        success: translations.contact.success,
        error: translations.contact.error,
      },
    );
  });

  return (
    <div className="flex flex-col mt-4 lg:mt-8">
      <div className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-8">
        <div className="flex flex-row items-start mb-6">
          <div className="w-12 h-12 min-w-12 bg-linear-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900 rounded-xl flex items-center justify-center mr-4">
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
                "flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background bg-black/5 border-black/20 dark:bg-white/5 dark:border-white/20 focus-visible:outline-none focus:border-primary-600",
              )}
            />
            <input
              {...register("email", {
                required: true,
                pattern: /\S+@\S+\.\S+/,
              })}
              placeholder={translations.contact.form.email}
              className={cn(
                "flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background bg-black/5 border-black/20 dark:bg-white/5 dark:border-white/20 focus-visible:outline-none focus:border-primary-600",
              )}
            />
          </div>
          <textarea
            {...register("message", { required: true })}
            placeholder={translations.contact.form.message}
            className={cn(
              "min-h-32 flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background bg-black/5 border-black/20 dark:bg-white/5 dark:border-white/20 focus-visible:outline-none focus:border-primary-600",
            )}
          />
          <div className="flex flex-col 2xl:flex-row justify-center pb-4 2xl:pb-0 2xl:justify-center">
            <Tooltip text={!enableSubmit && !isSubmitting && translations.contact.tooltip}>
              <button
                disabled={!enableSubmit || isSubmitting}
                type="submit"
                className="disabled:grayscale disabled:cursor-not-allowed cursor-pointer w-full flex flex-row justify-center items-center bg-linear-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-primary-600/25 group"
              >
                {isSubmitting
                  ? (translations.contact as typeof translations.contact & { button_text_sending: string }).button_text_sending
                  : enableSubmit
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
