import { useEffect } from "react";

export default () => {
  const tg = window.Telegram.WebApp;

  const onClose = () => {
    tg.close();
  };

  useEffect(() => {
    tg.ready();
  }, []);

  const openTelegramLink = (url) => {
    tg.openTelegramLink(`https://t.me/${url}`);
  };

  const user = tg?.initDataUnsafe?.user;

  return { onClose, user, tg, openTelegramLink };
};
