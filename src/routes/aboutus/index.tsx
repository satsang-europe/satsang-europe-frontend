import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/aboutus/")({
  component: AboutUsPage,
});

function AboutUsPage() {
  const { t } = useTranslation("about");
  return (
    <>
      <div className="flex justify-start mb-4 md:mb-8">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-300 font-bold text-lg"
        >
          ← {t("backToHome")}
        </Link>
      </div>
      <div className="px-2 flex-col justify-center">
        <h1 className="font-bold text-2xl md:text-3xl text-amber-400 text-center mb-8">
          {t("mission.title")}
        </h1>
        <div className="flex flex-col justify-center items-center">
          <img
            src="./ThakurAbout.png"
            alt="Sree Sree Thakur"
            className="md:h-[300px] md:w-[300px] h-[200px] w-[200px] object-cover border-2 border-amber-300 rounded-lg shadow-md"
          />
          <p className="text-sm font-bold text-gray-200 mt-2 mb-4">
            {t("mission.thakurName")}
          </p>
          <p className="text-gray-200 font-semibold text-lg text-justify px-2">
            {t("mission.description")}
          </p>
        </div>
      </div>
      <div className="px-2 flex-col justify-center">
        <h2 className="font-bold text-xl md:text-2xl text-amber-400 text-center mt-8 mb-4">
          {t("tenets.title")}
        </h2>
        <div className="flex flex-col mb-3">
          <h3 className="font-semibold text-l md:text-xl text-amber-400">
            {t("tenets.selflessService.title")}
          </h3>
          <p className="font-bold text-md text-gray-200 text-justify">
            {t("tenets.selflessService.description")}
          </p>
        </div>
        <div className="flex flex-col mb-3">
          <h3 className="font-semibold text-l md:text-xl text-amber-400">
            {t("tenets.societalHarmony.title")}
          </h3>
          <p className="font-bold text-md text-gray-200 text-justify">
            {t("tenets.societalHarmony.description")}
          </p>
        </div>
        <div className="flex flex-col mb-3">
          <h3 className="font-semibold text-l md:text-xl text-amber-400">
            {t("tenets.holisticDevelopment.title")}
          </h3>
          <p className="font-bold text-md text-gray-200 text-justify">
            {t("tenets.holisticDevelopment.description")}
          </p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-l md:text-xl text-amber-400">
            {t("tenets.natureHumanity.title")}
          </h3>
          <p className="font-bold text-md text-gray-200 text-justify">
            {t("tenets.natureHumanity.description")}
          </p>
        </div>
      </div>
      <div className="my-6 h-0.5 px-2 bg-gray-400 w-1/3 mx-auto"></div>
      <div className="flex flex-col justify-center items-center mt-10 md:mt-16">
        <img
          src="./SatsangEurope.PNG"
          alt="Satsang Europe"
          className="md:h-[300px] md:w-[300px] h-[200px] w-[200px] object-cover border-2 border-amber-300 rounded-lg shadow-md"
        />
      </div>
      <div className="px-2 flex-col justify-center">
        <h2 className="font-bold text-xl md:text-2xl text-amber-400 text-center mt-8 mb-4">
          {t("activities.title")}
        </h2>
        <div className="flex flex-col mb-3">
          <h3 className="font-semibold text-l md:text-xl text-amber-400">
            {t("activities.spiritual.title")}
          </h3>
          <p className="font-bold text-md text-gray-200 text-justify">
            {t("activities.spiritual.description")}
          </p>
        </div>
        <div className="flex flex-col mb-3">
          <h3 className="font-semibold text-l md:text-xl text-amber-400">
            {t("activities.philosophical.title")}
          </h3>
          <p className="font-bold text-md text-gray-200 text-justify">
            {t("activities.philosophical.description")}
          </p>
        </div>
        <div className="flex flex-col mb-3">
          <h3 className="font-semibold text-l md:text-xl text-amber-400">
            {t("activities.charitable.title")}
          </h3>
          <p className="font-bold text-md text-gray-200 text-justify">
            {t("activities.charitable.description")}
          </p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-l md:text-xl text-amber-400">
            {t("activities.cultural.title")}
          </h3>
          <p className="font-bold text-md text-gray-200 text-justify">
            {t("activities.cultural.description")}
          </p>
        </div>
      </div>
      <div className="px-2 flex-col justify-center">
        <h2 className="font-bold text-xl md:text-2xl text-amber-400 text-center mt-8 mb-4">
          {t("inspiration.title")}
        </h2>
        <div className="flex flex-col mb-3">
          <p className="font-bold text-md text-gray-200 text-justify">
            "{t("inspiration.quote")}" ~{" "}
            <strong>{t("inspiration.author")}</strong>
            <br />
            {t("inspiration.description")}
          </p>
        </div>
      </div>
      <div className="my-6 h-0.5 px-2 bg-gray-400 w-1/3 mx-auto"></div>
      <div className="px-2 flex-col justify-center mt-8">
        <h1 className="font-bold text-2xl md:text-3xl text-amber-400 text-center mb-8">
          {t("acharyadev.title")}
        </h1>
        <div className="flex flex-col justify-center items-center">
          <img
            src="./SreeSreeAcharyadev.PNG"
            alt="Sree Sree Acharyadev"
            className="md:h-[300px] md:w-[300px] h-[200px] w-[200px] object-cover border-2 border-amber-300 rounded-lg shadow-md"
          />
          <p className="text-sm font-bold text-gray-200 mt-2 mb-4">
            {t("acharyadev.name")}
          </p>
          <p className="text-gray-200 font-semibold text-lg text-justify px-2">
            {t("acharyadev.description")}
          </p>
        </div>
      </div>
    </>
  );
}
