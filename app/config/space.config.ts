type Translator = (key: string) => string;
export const getFaqConfig = (t: Translator) => ({
  label: t("label"),
  heading: t("heading"),

  items: [
    {
      question: t("q1"),
      answer: t("a1"),
    },
    {
      question: t("q2"),
      answer: t("a2"),
    },
    {
      question: t("q3"),
      answer: t("a3"),
    },
    {
      question: t("q4"),
      answer: t("a4"),
    },
  ],
});