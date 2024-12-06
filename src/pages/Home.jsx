import React, { useRef, useState } from "react";

// Axios
import axios from "axios";

// Components
import Icon from "../components/Icon";

// Telegram
import useTelegram from "../hooks/useTelegram";

// Utils
import { extractNumbers, formatDate, formatTime } from "../utils";

// Stickers
import Lottie from "lottie-react";
import magicSticker from "../assets/stickers/magic.json";

// Images
import pasteIcon from "../assets/images/icons/paste.svg";
import crossIcon from "../assets/images/icons/cross.svg";
import shareIcon from "../assets/images/icons/share.svg";
import searchIcon from "../assets/images/icons/search.svg";

const Home = () => {
  const inputRef = useRef();
  const { user } = useTelegram();
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(false);
  const dataHeaders = data && Object.keys(data);
  const scriptId = import.meta.env.VITE_SCRIPT_ID;
  const [dataTgShareUrl, setDataTgShareUrl] = useState("");
  const [error, setError] = useState({ status: false, message: null });
  const apiUrl = `https://script.google.com/macros/s/${scriptId}/exec`;

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      setQuery(text);
    });
  };

  const handleClear = () => {
    setQuery("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const id = extractNumbers(query);

    if (!user?.id) {
      return setError({
        status: true,
        message:
          "Kechirasiz, sizda ma'lumotlarni olish uchun huquqingiz yetarli emas!",
      });
    }

    if (!loader && id) {
      setData(null);
      setLoader(true);
      setError({ status: false, message: null });

      // Send a request
      axios
        .get(`${apiUrl}?id=${id}&userId=${user.id}`)
        .then((res) => {
          const { data, success } = res.data;
          if (success) {
            setData(data);
            const date = new Date();
            setDataTgShareUrl(res.data.shareUrl);
            const recentlySearchedData = JSON.parse(
              localStorage.getItem("recently-searched-data")
            );

            // Save data to local storage
            if (recentlySearchedData && recentlySearchedData?.length > 0) {
              localStorage.setItem(
                "recently-searched-data",
                JSON.stringify(
                  [
                    {
                      data: data,
                      date: formatDate(date),
                      time: formatTime(date),
                    },
                    ...recentlySearchedData,
                  ].slice(0, 40)
                )
              );
            } else {
              localStorage.setItem(
                "recently-searched-data",
                JSON.stringify([
                  {
                    data: data,
                    date: formatDate(date),
                    time: formatTime(date),
                  },
                ])
              );
            }
          } else {
            setError({ status: true, message: res.data.message });
          }
        })
        .catch(() => {
          setError({ status: true, message: "Noma'lum xatolik yuz berdi!" });
        })
        .finally(() => setLoader(false));
    } else {
      setData(null);
      setLoader(false);
      setError({ status: true, message: "Muqobil ID raqam kiritilmadi!" });
    }
  };

  return (
    <div className="container pt-6 pb-20">
      <form onSubmit={handleSearch} className="flex gap-4 mb-5 sm:mb-8">
        {/* Input wrapper */}
        <label className="flex items-center gap-3 px-3.5 w-full h-11 bg-white rounded-xl sm:px-4">
          {/* search icon */}
          <Icon
            src={searchIcon}
            alt="Search icon"
            className="size-6 cursor-text"
          />

          {/* input */}
          <input
            type="text"
            value={query}
            ref={inputRef}
            placeholder="Qidirish"
            onChange={(e) => setQuery(e.target.value)}
            className="size-full bg-transparent !outline-none"
          />

          <button
            type="button"
            className="w-max h-full shrink-0"
            onClick={() => {
              if (query?.length > 0) handleClear();
              else handlePaste();
            }}
          >
            <Icon
              alt={query?.length > 0 ? "Cross" : "Paste"}
              src={query?.length > 0 ? crossIcon : pasteIcon}
            />
          </button>
        </label>

        {/* Submit btn */}
        <div className="fixed inset-x-0 bottom-0 w-full p-3.5 bg-white sm:w-auto sm:bg-transparent sm:static sm:p-0">
          <button
            type="submit"
            disabled={loader}
            className="btn-primary w-full h-11 shrink-0 rounded-xl px-4 sm:static"
          >
            Qidirish
          </button>
        </div>
      </form>

      {/* Loader */}
      {!error.status && !data && (
        <div className="flex relative w-full h-6 overflow-hidden">
          <p
            style={{ left: `${loader ? 100 : 0}%` }}
            className="absolute left-0 inset-y-0 text-neutral-400 transition-[left] duration-300"
          >
            Bu yerda qidiruv natijalari chiqadi
          </p>

          <div
            style={{ left: `${loader ? 0 : -100}%` }}
            className="flex items-center gap-3.5 absolute left-0 inset-y-0 transition-[left] duration-300"
          >
            <p className="text-neutral-400">Ma'lumotlar qidirilmoqda</p>
            <Lottie animationData={magicSticker} className="size-6" />
          </div>
        </div>
      )}

      {/* Error message */}
      {error.status && <p className="text-neutral-400">{error.message}</p>}

      {/* Data */}
      {data && dataHeaders?.length > 0 && (
        <div className="space-y-4">
          <strong>Ma'lumotlar</strong>

          {/* data list */}
          <ul className="space-y-2.5">
            {dataHeaders.map((title, index) => {
              return (
                <li key={index} className="">
                  <h3 className="inline-block font-medium">{title}: </h3>
                  <span className="text-neutral-500"> {data[title]}</span>
                </li>
              );
            })}
          </ul>

          {/* share link */}
          <div className="flex justify-center">
            <a
              target="_blank"
              href={dataTgShareUrl}
              referrerPolicy="no-referrer"
              className="btn-stroke h-11 px-5 border-none hover:bg-white/70"
            >
              <span>Ulashish</span>
              <Icon src={shareIcon} className="size-5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
