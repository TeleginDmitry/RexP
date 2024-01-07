import { useState, useEffect } from "react";

import { useLocalStorage } from "@mantine/hooks";
import clsx from "clsx";
import { useRouter } from "next/router";

import Basket from "@/public/images/icons/basket.svg";
import Favourites from "@/public/images/icons/favourites.svg";
import Home from "@/public/images/icons/home.svg";
import Profile from "@/public/images/icons/profile.svg";
import DefaultLink from "@/src/components/ui/links/DefaultLink";
import RootText from "@/src/components/ui/RootText";
import { MAX_FAVOURITES_LS_KEY } from "@/src/constants";

import type { MenuItemType } from "./types";

import s from "./Footer.module.scss";

const MENU_ITEMS: MenuItemType[] = [
  { text: "Главная", href: "/", icon: <Home /> },
  { text: "Корзина", href: "/basket", icon: <Basket /> },
  { text: "Избранное", href: "/favourites", icon: <Favourites /> },
  { text: "Профиль", href: "/profile", icon: <Profile /> },
];

const Footer = () => {
  const router = useRouter();
  const [favouritesValue] = useLocalStorage({ key: MAX_FAVOURITES_LS_KEY, defaultValue: "" });
  const [pathname, setPathname] = useState(router.asPath);
  const [favoritesCount, setFavoritesCount] = useState("");

  useEffect(() => {
    setPathname(router.asPath);
  }, [router]);

  useEffect(() => {
    if (!favouritesValue) {
      setFavoritesCount("");
      return;
    }

    setFavoritesCount(favouritesValue.split(".").length.toString());
  }, [favouritesValue]);

  return (
    <footer className={s.footer}>
      <ul className={s.menu}>
        {MENU_ITEMS.map(({ text, href, icon }) => (
          <li key={text} className={clsx(s.item, pathname === href && s.active)}>
            <DefaultLink href={href} className={s.link}>
              {text === "Избранное" && favoritesCount && <span className={s.count}>{favoritesCount}</span>}
              {icon}
              <RootText variant="11px" color="grey" className={s.text}>
                {text}
              </RootText>
            </DefaultLink>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
